<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Helpers\ApiResponse;
use App\Models\InsurancePolicy;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        try {
            $events = Event::where('eo_id', Auth::user()->id)
                ->withCount('registrations')
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

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'location' => 'required|string',
                'map_link' => 'nullable|url',
                'start_date' => 'required|date|after:now',
                'end_date' => 'required|date|after_or_equal:start_date',
                'published_start_date' => 'nullable|date',
                'published_end_date' => 'nullable|date|after_or_equal:published_start_date',
                'category' => 'required|in:F&B,Fashion,Automotive,Art & Craft,Snack & Beverage,Wellness,Others',
                'booth_capacity' => 'required|integer|min:1',
                'booth_size' => 'nullable|string',
                'booth_price' => 'required|numeric|min:0',
                'estimated_visitors' => 'nullable|integer|min:0',
                'payment_method' => 'required|in:per_day,per_event',
                'insurance_active' => 'boolean',
                'status' => 'nullable|in:DRAFT,ACTIVATED,PUBLISHED',
                'banner' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
            ]);

            // Validate that published_end_date cannot be later than event end_date
            if (isset($validated['published_end_date']) && isset($validated['end_date'])) {
                if (strtotime($validated['published_end_date']) > strtotime($validated['end_date'])) {
                    return ApiResponse::error("Published end date cannot be later than event end date", 422);
                }
            }

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

            return ApiResponse::success($event->load('insurancePolicies'), "Event created successfully", 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to create event", 500, $e->getMessage());
        }
    }

    public function show($id)
    {
        $event = Event::where('id', $id)
            ->where('eo_id', Auth::user()->id)
            ->with(['rules', 'registrations.tenant'])
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
