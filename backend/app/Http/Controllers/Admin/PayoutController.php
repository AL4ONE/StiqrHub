<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Payment;
use App\Models\Payout;
use Illuminate\Support\Facades\DB;

class PayoutController extends Controller
{
    // H+1 Settlement Tracking: Shows events with successful payments that are ready for settlement
    // Settlement date = payment date + 1 day (H+1)
    public function settlementTracking()
    {
        try {
            // Get all successful payments grouped by event
            $payments = Payment::where('status', 'SUCCESS')
                ->with(['registration.event', 'registration.tenant'])
                ->orderBy('updated_at', 'desc')
                ->get();

            // Group by event and calculate settlement info
            $eventGroups = $payments->groupBy(function ($payment) {
                return optional(optional($payment->registration)->event)->id;
            })->filter(function ($group, $eventId) {
                return $eventId !== null; // Filter out null event IDs
            });

            $rows = $eventGroups->map(function ($group, $eventId) {
                $event = optional($group->first()->registration)->event;
                if (!$event) {
                    return null;
                }

                // Calculate totals
                $totalAmount = $group->sum('amount');
                $paymentsCount = $group->count();
                
                // Get the latest payment date for this event
                $latestPaymentDate = $group->max(function ($p) {
                    return $p->updated_at ? $p->updated_at->format('Y-m-d') : null;
                });
                
                // Settlement date is H+1 (payment date + 1 day)
                $settlementDate = $latestPaymentDate ? date('Y-m-d', strtotime($latestPaymentDate . ' +1 day')) : null;
                
                // Check if there's already a payout record for this event
                $existingPayout = Payout::where('event_id', $eventId)
                    ->where('payout_date', $settlementDate)
                    ->first();
                
                // Determine status: if settlement date is today or past, it's ready for settlement
                $today = date('Y-m-d');
                $status = 'PENDING';
                if ($existingPayout) {
                    $status = $existingPayout->status === 'COMPLETED' ? 'COMPLETED' : 'PENDING';
                } else if ($settlementDate && $settlementDate <= $today) {
                    $status = 'READY';
                }

                return [
                    'event_id' => $eventId,
                    'event_name' => $event->name,
                    'total_amount' => (float) $totalAmount,
                    'payments_count' => $paymentsCount,
                    'success_count' => $paymentsCount, // Alias for frontend compatibility
                    'settlement_date' => $settlementDate,
                    'date' => $settlementDate, // Alias for frontend compatibility
                    'latest_payment_date' => $latestPaymentDate,
                    'status' => $status,
                    'payout_id' => $existingPayout ? $existingPayout->id : null,
                ];
            })
            ->filter() // Remove null entries
            ->values()
            ->sortByDesc('settlement_date'); // Sort by settlement date, newest first

            return ApiResponse::success($rows, 'Settlement tracking data retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to build payout tracking', 500, $e->getMessage());
        }
    }
}


