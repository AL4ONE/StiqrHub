<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Claim;
use App\Models\Event;
use App\Models\InsurancePolicy;
use App\Models\Registration;
use App\Models\Payment;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    /**
     * Submit new claim for an event
     */
    public function submit(Request $request, $eventId)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'incident_date' => 'required|date',
                'description' => 'required|string|min:10',
                'claim_amount' => 'nullable|numeric|min:0',
                'document' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048', // Max 2MB
            ]);

            $userId = auth()->user()->id;

            $registration = Registration::where('tenant_id', $userId)
                ->where('event_id', $eventId)
                ->first();

            if (!$registration) {
                return ApiResponse::error('You are not registered to this event', 403);
            }

            $policy = InsurancePolicy::where('event_id', $eventId)->first();

            if (!$policy) {
                return ApiResponse::error('This event does not have insurance coverage', 400);
            }

            $event = Event::findOrFail($eventId);
            $incidentDate = date('Y-m-d', strtotime($validated['incident_date']));
            $eventStart = date('Y-m-d', strtotime($event->start_date));
            $eventEnd = date('Y-m-d', strtotime($event->end_date));
            $maxIncidentDate = date('Y-m-d', strtotime($event->end_date . ' +7 days'));

            if ($incidentDate < $eventStart || $incidentDate > $maxIncidentDate) {
                return ApiResponse::error('Incident date must be within event date to 7 days after event ends', 422);
            }

            $existingClaim = Claim::where('tenant_id', $userId)
                ->where('insurance_policy_id', $policy->id)
                ->first();

            if ($existingClaim) {
                return ApiResponse::error('You have already submitted a claim for this event', 400);
            }

            // Require successful payment before allowing claim
            $paymentSuccess = Payment::where('registration_id', $registration->id)
                ->where('status', 'SUCCESS')
                ->exists();

            if (!$paymentSuccess) {
                return ApiResponse::error('You can submit a claim only after your event payment is successful', 403);
            }

            // Use default disk (can be 'public' or 's3' based on FILESYSTEM_DISK env)
            $disk = config('filesystems.default', 'public');
            $documentPath = $request->file('document')->store('claims', $disk);

            // Compute booth-only claim amount based on payment method
            $boothAmount = 0;
            if ($event->payment_method === 'per_day') {
                $days = $registration->days_booked;
                if (!$days) {
                    $start = $registration->start_date ? new \DateTime($registration->start_date) : new \DateTime($event->start_date);
                    $end = $registration->end_date ? new \DateTime($registration->end_date) : new \DateTime($event->end_date);
                    $interval = $start->diff($end);
                    $days = $interval->days + 1;
                }
                $unit = $event->booth_price ?? 0;
                $boothAmount = $unit * max(1, $days);
            } else {
                $boothAmount = $event->booth_price ?? 0;
            }

            $claim = Claim::create([
                'tenant_id' => $userId,
                'insurance_policy_id' => $policy->id,
                'incident_date' => $incidentDate,
                'description' => $validated['description'],
                'claim_amount' => $boothAmount,
                'document_path' => $documentPath,
                'status' => 'REQUEST_CLAIM'
            ]);

            $claim->load(['tenant', 'insurancePolicy.event']);

            return ApiResponse::success($claim, 'Claim submitted successfully. Waiting for insurer review.', 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Validation failed', 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to submit claim', 500, $e->getMessage());
        }
    }

    public function index()
    {
        try {
            $claims = Claim::where('tenant_id', auth()->user()->id)
                ->with(['insurancePolicy.event', 'insurancePolicy.insurer'])
                ->orderBy('created_at', 'desc')
                ->get();

            return ApiResponse::success($claims, 'Claims retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve claims', 500, $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $claim = Claim::where('id', $id)
                ->where('tenant_id', auth()->user()->id)
                ->with(['insurancePolicy.event', 'insurancePolicy.insurer'])
                ->first();

            if (!$claim) {
                return ApiResponse::error('Claim not found or unauthorized', 404);
            }

            return ApiResponse::success($claim, 'Claim detail retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve claim', 500, $e->getMessage());
        }
    }

    public function byEvent($eventId)
    {
        try {
            $userId = auth()->user()->id;

            $registration = Registration::where('tenant_id', $userId)
                ->where('event_id', $eventId)
                ->first();

            if (!$registration) {
                return ApiResponse::error('You are not registered to this event', 403);
            }

            $policy = InsurancePolicy::where('event_id', $eventId)->first();

            if (!$policy) {
                return ApiResponse::error('This event does not have insurance coverage', 400);
            }

            $claim = Claim::where('tenant_id', $userId)
                ->where('insurance_policy_id', $policy->id)
                ->with(['insurancePolicy.event', 'insurancePolicy.insurer'])
                ->first();

            if (!$claim) {
                return ApiResponse::success(null, 'No claim found for this event');
            }

            return ApiResponse::success($claim, 'Claim retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve claim', 500, $e->getMessage());
        }
    }
}
