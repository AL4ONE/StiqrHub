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

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'location' => 'required|string',
                'map_link' => 'nullable|url',
                'start_date' => 'required|date|after:now',
                'end_date' => 'required|date|after_or_equal:start_date',
                'category' => 'required|in:F&B,Fashion,Automotive,Art & Craft,Snack & Beverage,Wellness,Others',
                'booth_capacity' => 'required|integer|min:1',
                'booth_size' => 'nullable|string',
                'booth_price' => 'required|numeric|min:0',
                'estimated_visitors' => 'nullable|integer|min:0',
                'payment_method' => 'required|in:per_day,per_event',
                'insurance_active' => 'boolean',
                'status' => 'nullable|in:DRAFT,ACTIVE,PUBLISHED',
                'banner' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
            ]);

            $payload = array_merge($validated, [
                'eo_id' => Auth::user()->id,
                'status' => $validated['status'] ?? 'DRAFT',
            ]));

            if ($request->hasFile('banner')) {
                $path = $request->file('banner')->store('events', 'public');
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
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'location' => 'sometimes|string',
                'map_link' => 'nullable|url',
                'start_date' => 'sometimes|date',
                'end_date' => 'sometimes|date|after_or_equal:start_date',
                'category' => 'sometimes|in:F&B,Fashion,Automotive,Art & Craft,Snack & Beverage,Wellness,Others',
                'booth_capacity' => 'sometimes|integer|min:1',
                'booth_size' => 'nullable|string',
                'booth_price' => 'sometimes|numeric|min:0',
                'estimated_visitors' => 'nullable|integer|min:0',
                'payment_method' => 'sometimes|in:per_day,per_event',
                'insurance_active' => 'boolean',
                'status' => 'sometimes|in:DRAFT,ACTIVE,PUBLISHED',
                'banner' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
            ]);

            $update = $validated;
            if ($request->hasFile('banner')) {
                $path = $request->file('banner')->store('events', 'public');
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
