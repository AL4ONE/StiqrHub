<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Models\Payment;
use App\Models\Payout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PayoutController extends Controller
{
    public function index()
    {
        try {
            $eoId = Auth::user()->id;
            
            // Get all payments (not just SUCCESS) for this EO's events
            $payments = Payment::whereHas('registration.event', function($query) use ($eoId) {
                $query->where('eo_id', $eoId);
            })
            ->with(['registration.event', 'registration.tenant'])
            ->orderBy('created_at', 'desc')
            ->get();
            
            // Group by event and calculate totals
            $grouped = $payments->groupBy('registration.event_id');

            // Fetch existing payout records for these events
            $eventIds = $grouped->keys();
            $payoutRecords = Payout::whereIn('event_id', $eventIds)->get()->keyBy('event_id');

            $payouts = $grouped->map(function($eventPayments, $eventId) use ($payoutRecords) {
                $event = $eventPayments->first()->registration->event;
                
                // Filter only SUCCESS payments for calculation
                $successPayments = $eventPayments->where('status', 'SUCCESS');
                $totalAmount = $successPayments->sum('amount');
                $platformFee = $successPayments->count() * 5000; // Rp 5,000 per registration
                $netAmount = $totalAmount - $platformFee;

                $payout = $payoutRecords->get($eventId);
                $status = $payout ? $payout->status : 'PENDING';
                $payoutDate = $payout ? $payout->payout_date : null;

                // Get payment details with tenant info
                $paymentDetails = $eventPayments->map(function($payment) {
                    return [
                        'id' => $payment->id,
                        'tenant_name' => $payment->registration->tenant->name ?? 'N/A',
                        'tenant_email' => $payment->registration->tenant->email ?? 'N/A',
                        'amount' => (float) $payment->amount,
                        'status' => $payment->status,
                        'payment_date' => $payment->created_at,
                        'updated_at' => $payment->updated_at,
                    ];
                })->values();

                return [
                    'event_id' => $event->id,
                    'event_name' => $event->name,
                    'event_date' => $event->start_date,
                    'total_registrations' => $eventPayments->count(),
                    'success_payments_count' => $successPayments->count(),
                    'total_amount' => (float) $totalAmount,
                    'platform_fee' => (float) $platformFee,
                    'net_amount' => (float) $netAmount,
                    'status' => $status,
                    'payout_date' => $payoutDate,
                    'payment_details' => $paymentDetails,
                ];
            })->values();
            
            return ApiResponse::success($payouts, "Payouts retrieved successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to load payouts", 500, $e->getMessage());
        }
    }
    
    public function requestPayout(Request $request)
    {
        try {
            $validated = $request->validate([
                'event_id' => 'required|exists:events,id',
                'amount' => 'required|numeric|min:0',
            ]);
            
            $eoId = Auth::user()->id;
            
            // Verify the event belongs to this EO
            $event = \App\Models\Event::where('id', $validated['event_id'])
                ->where('eo_id', $eoId)
                ->first();
                
            if (!$event) {
                return ApiResponse::error("Event not found or unauthorized", 404);
            }
            
            // Create payout request
            $payout = Payout::create([
                'eo_id' => $eoId,
                'event_id' => $validated['event_id'],
                'amount' => $validated['amount'],
                'status' => 'PENDING',
                'requested_at' => now(),
            ]);
            
            return ApiResponse::success($payout, "Payout request submitted successfully", 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to request payout", 500, $e->getMessage());
        }
    }
}
