<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Helpers\ApiResponse;
use App\Models\InsurancePolicy;
use App\Models\EventBankAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        try {
            // Only show events that haven't ended yet (end_date >= today)
            $events = Event::where('eo_id', Auth::user()->id)
                ->where('end_date', '>=', now()->format('Y-m-d'))
                ->withCount('registrations')
                ->orderBy('start_date', 'asc')
                ->get();
            return ApiResponse::success($events, "Event list retrieved successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to load events", 500, $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            // Block unverified EO from creating events
            if (!Auth::user()->is_active) {
                return ApiResponse::error('EO is not verified yet. Please contact admin.', 403);
            }

            // Normalize boolean flags from multipart form
            if ($request->has('insurance_active')) {
                $request->merge([
                    'insurance_active' => filter_var($request->input('insurance_active'), FILTER_VALIDATE_BOOLEAN),
                ]);
            }

            // Normalize bank_accounts is_default boolean values
            if ($request->has('bank_accounts') && is_array($request->input('bank_accounts'))) {
                $bankAccountsInput = $request->input('bank_accounts');
                foreach ($bankAccountsInput as $index => $account) {
                    if (isset($account['is_default'])) {
                        $bankAccountsInput[$index]['is_default'] = filter_var($account['is_default'], FILTER_VALIDATE_BOOLEAN);
                    }
                }
                $request->merge(['bank_accounts' => $bankAccountsInput]);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'location' => 'required|string',
                'map_link' => 'nullable|url',
                'details' => 'nullable|string|max:2000',
                'start_date' => 'required|date|after:now',
                'end_date' => 'required|date|after_or_equal:start_date',
                'published_start_date' => 'nullable|date',
                'published_end_date' => 'nullable|date|after_or_equal:published_start_date',
                'category' => 'required|in:F&B,Fashion,Automotive,Art & Craft,Snack & Beverage,Wellness,Others',
                'booth_capacity' => 'required|integer|min:1',
                'tenant_capacity' => 'nullable|integer|min:1',
                'booth_size' => 'nullable|string',
                'booth_price' => 'required|numeric|min:0',
                'estimated_visitors' => 'nullable|integer|min:0',
                'payment_method' => 'required|in:per_day,per_event',
                'insurance_active' => 'boolean',
                'status' => 'nullable|in:DRAFT,ACTIVATED,PUBLISHED',
                'banner' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
                'bank_accounts' => 'required|array|min:1|max:3',
                'bank_accounts.*.account_number' => 'required|string|max:255',
                'bank_accounts.*.account_name' => 'required|string|max:255',
                'bank_accounts.*.bank_name' => 'required|string|max:255',
                'bank_accounts.*.is_default' => 'required|boolean',
            ]);

            // Validate that published_end_date cannot be later than event end_date
            if (isset($validated['published_end_date']) && isset($validated['end_date'])) {
                if (strtotime($validated['published_end_date']) > strtotime($validated['end_date'])) {
                    return ApiResponse::error("Published end date cannot be later than event end date", 422);
                }
            }

            // Validate bank accounts
            $bankAccounts = $validated['bank_accounts'] ?? [];
            if (count($bankAccounts) === 0) {
                return ApiResponse::error("Minimal harus ada 1 nomor rekening", 422);
            }
            if (count($bankAccounts) > 3) {
                return ApiResponse::error("Maksimal 3 nomor rekening", 422);
            }
            $defaultCount = 0;
            foreach ($bankAccounts as $account) {
                if (isset($account['is_default']) && filter_var($account['is_default'], FILTER_VALIDATE_BOOLEAN)) {
                    $defaultCount++;
                }
            }
            if ($defaultCount === 0) {
                return ApiResponse::error("Harus ada minimal 1 rekening yang ditandai sebagai default", 422);
            }
            if ($defaultCount > 1) {
                return ApiResponse::error("Hanya boleh ada 1 rekening default", 422);
            }

            // Remove bank_accounts from validated as it's not a field in events table
            unset($validated['bank_accounts']);

            $payload = array_merge($validated, [
                'eo_id' => Auth::user()->id,
                'status' => $validated['status'] ?? 'DRAFT',
            ]);

            if ($request->hasFile('banner')) {
                // Use default disk (can be 'public' or 's3' based on FILESYSTEM_DISK env)
                $disk = config('filesystems.default', 'public');
                $path = $request->file('banner')->store('events', $disk);
                $payload['banner'] = $path;
            }

            $event = Event::create($payload);

            // Create bank accounts
            foreach ($bankAccounts as $account) {
                EventBankAccount::create([
                    'event_id' => $event->id,
                    'account_number' => $account['account_number'],
                    'account_name' => $account['account_name'],
                    'bank_name' => $account['bank_name'],
                    'is_default' => filter_var($account['is_default'], FILTER_VALIDATE_BOOLEAN),
                ]);
            }

            // ✅ Auto-create insurance policy kalau insurance_active = true
            if ($event->insurance_active) {
                // Ambil insurer default (bisa dikonfigurasi nanti)
                $insurer = User::where('role', 'INSURER')->first();

                if ($insurer) {
                    InsurancePolicy::create([
                        'event_id' => $event->id,
                        'insurer_id' => $insurer->id,
                        'policy_number' => 'POL-' . $event->id . '-' . date('Ymd'),
                        'premium_amount' => 10000 // Default premium
                    ]);
                }
            }

            return ApiResponse::success($event->load(['insurancePolicies', 'bankAccounts']), "Event created successfully", 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            // Log the error for debugging
            \Log::error('Error creating event: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'user_id' => Auth::id(),
            ]);
            return ApiResponse::error("Gagal membuat event: " . $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        $event = Event::where('id', $id)
            ->where('eo_id', Auth::user()->id)
            ->with(['rules', 'registrations.tenant', 'registrations.payment', 'bankAccounts'])
            ->withCount('registrations')
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        return ApiResponse::success($event, "Event retrieved successfully");
    }

    public function update(Request $request, $id)
    {
        $event = Event::where('id', $id)
            ->where('eo_id', Auth::user()->id)
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        try {
            if ($request->has('insurance_active')) {
                $request->merge([
                    'insurance_active' => filter_var($request->input('insurance_active'), FILTER_VALIDATE_BOOLEAN),
                ]);
            }

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'location' => 'sometimes|string',
                'map_link' => 'nullable|url',
                'details' => 'sometimes|nullable|string|max:2000',
                'start_date' => 'sometimes|date',
                'end_date' => 'sometimes|date|after_or_equal:start_date',
                'published_start_date' => 'nullable|date',
                'published_end_date' => 'nullable|date|after_or_equal:published_start_date',
                'category' => 'sometimes|in:F&B,Fashion,Automotive,Art & Craft,Snack & Beverage,Wellness,Others',
                'booth_capacity' => 'sometimes|integer|min:1',
                'booth_size' => 'nullable|string',
                'booth_price' => 'sometimes|numeric|min:0',
                'estimated_visitors' => 'nullable|integer|min:0',
                'payment_method' => 'sometimes|in:per_day,per_event',
                'insurance_active' => 'boolean',
                'status' => 'sometimes|in:DRAFT,ACTIVATED,PUBLISHED',
                'banner' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
            ]);

            // Validate that published_end_date cannot be later than event end_date
            $eventEndDate = $validated['end_date'] ?? $event->end_date;
            if (isset($validated['published_end_date'])) {
                if (strtotime($validated['published_end_date']) > strtotime($eventEndDate)) {
                    return ApiResponse::error("Published end date cannot be later than event end date", 422);
                }
            }

            // Enforce status transition rules for EO
            if (isset($validated['status'])) {
                // EO is not allowed to set ACTIVATED
                if ($validated['status'] === 'ACTIVATED') {
                    return ApiResponse::error('Only admin can activate events', 403);
                }

                // Publishing is only allowed if event is already ACTIVATED
                if ($validated['status'] === 'PUBLISHED' && $event->status !== 'ACTIVATED') {
                    return ApiResponse::error('Event must be ACTIVATED by admin before publishing', 422);
                }
            }

            $update = $validated;
            if ($request->hasFile('banner')) {
                // Use default disk (can be 'public' or 's3' based on FILESYSTEM_DISK env)
                $disk = config('filesystems.default', 'public');
                $path = $request->file('banner')->store('events', $disk);
                $update['banner'] = $path;
            }

            $event->update($update);
            return ApiResponse::success($event->fresh(), "Event updated successfully");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to update event", 500, $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $event = Event::where('id', $id)
            ->where('eo_id', Auth::user()->id)
            ->first();

        if (!$event) {
            return ApiResponse::error("Event not found or unauthorized", 404);
        }

        try {
            $event->delete();
            return ApiResponse::success(null, "Event deleted successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to delete event", 500, $e->getMessage());
        }
    }
}
