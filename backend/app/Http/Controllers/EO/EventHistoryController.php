<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Models\Event;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;

class EventHistoryController extends Controller
{
    public function index()
    {
        try {
            $eoId = Auth::user()->id;
            
            // Get completed/past events
            $events = Event::where('eo_id', $eoId)
                ->where('end_date', '<', now())
                ->with(['registrations.tenant', 'registrations.payment'])
                ->withCount('registrations')
                ->orderBy('end_date', 'desc')
                ->get();
            
            $eventsWithRevenue = $events->map(function($event) {
                // Calculate revenue from successful payments
                $successPayments = Payment::whereHas('registration', function($query) use ($event) {
                    $query->where('event_id', $event->id);
                })
                ->where('status', 'SUCCESS')
                ->get();
                
                $totalRevenue = $successPayments->sum('amount');
                $platformFee = $successPayments->count() * 5000;
                $netRevenue = $totalRevenue - $platformFee;
                
                // Get tenant details with payment info
                $tenantDetails = $event->registrations->map(function($registration) {
                    $payment = $registration->payment;
                    return [
                        'tenant_id' => $registration->tenant_id,
                        'tenant_name' => $registration->tenant->name ?? 'N/A',
                        'tenant_email' => $registration->tenant->email ?? 'N/A',
                        'registration_status' => $registration->status,
                        'payment_status' => $payment ? $payment->status : 'N/A',
                        'payment_amount' => $payment ? (float) $payment->amount : 0,
                        'payment_date' => $payment ? $payment->created_at : null,
                    ];
                });
                
                return [
                    'id' => $event->id,
                    'name' => $event->name,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'location' => $event->location,
                    'category' => $event->category,
                    'total_registrations' => $event->registrations_count,
                    'total_revenue' => (float) $totalRevenue,
                    'platform_fee' => (float) $platformFee,
                    'net_revenue' => (float) $netRevenue,
                    'tenant_details' => $tenantDetails,
                ];
            });
            
            return ApiResponse::success($eventsWithRevenue, "Event history retrieved successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to load event history", 500, $e->getMessage());
        }
    }
}

