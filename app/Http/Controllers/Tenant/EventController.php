<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Payment;
use App\Models\Registration;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        $now = now();
        $events = Event::where('status', 'PUBLISHED')
            ->where(function ($query) use ($now) {
                $query->where(function ($q) use ($now) {
                    $q->whereNull('published_start_date')
                      ->whereNull('published_end_date');
                })
                ->orWhere(function ($q) use ($now) {
                    $q->where('published_start_date', '<=', $now)
                      ->where('published_end_date', '>=', $now);
                });
            })
            ->get();
        return response()->json($events);
    }

    public function show($id)
    {
        $now = now();
        $event = Event::where('id', $id)
            ->where('status', 'PUBLISHED')
            ->where(function ($query) use ($now) {
                $query->where(function ($q) use ($now) {
                    $q->whereNull('published_start_date')
                      ->whereNull('published_end_date');
                })
                ->orWhere(function ($q) use ($now) {
                    $q->where('published_start_date', '<=', $now)
                      ->where('published_end_date', '>=', $now);
                });
            })
            ->with('rules')
            ->first();

        if (!$event) {
            return ApiResponse::error('Event not found', 404);
        }

        return ApiResponse::success($event, 'Event retrieved successfully');
    }

    public function register($id)
    {
        $event = Event::findOrFail($id);
        
        // Check if event is published
        if ($event->status !== 'PUBLISHED') {
            return ApiResponse::error('Event is not published yet', 403);
        }

        // Check if current date is within published date range
        $now = now();
        if ($event->published_start_date && $event->published_end_date) {
            if ($now < $event->published_start_date || $now > $event->published_end_date) {
                return ApiResponse::error('Event is not available for registration at this time', 403);
            }
        }

        // Check if registration period has ended (published_end_date)
        if ($event->published_end_date && $now > $event->published_end_date) {
            return ApiResponse::error('Registration period has ended', 403);
        }

        $userId = auth()->user()->id;

        $existing = Registration::where('tenant_id', $userId)
            ->where('event_id', $id)
            ->first();

        if ($existing) {
            return ApiResponse::error('Already registered to this event', 400);
        }

        $platformFee = 5000;
        $insuranceFee = $event->insurance_active ? 10000 : 0;
        $boothPrice = 0;
        $daysBooked = null;
        $selectedStart = null;
        $selectedEnd = null;

        if ($event->payment_method === 'per_day') {
            // Validate required date range from request
            $validated = request()->validate([
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
            ]);

            $selectedStart = date('Y-m-d', strtotime($validated['start_date']));
            $selectedEnd = date('Y-m-d', strtotime($validated['end_date']));

            // Ensure selected dates are within event window
            if ($selectedStart < date('Y-m-d', strtotime($event->start_date)) || $selectedEnd > date('Y-m-d', strtotime($event->end_date))) {
                return ApiResponse::error('Selected dates must be within the event date range', 422);
            }

            // Conflict check: overlap with any existing per-day booking dates for the same event
            $hasConflict = Registration::where('tenant_id', $userId)
                ->where('event_id', $event->id)
                ->where(function ($q) use ($selectedStart, $selectedEnd) {
                    $q->where(function ($ov) use ($selectedStart, $selectedEnd) {
                        $ov->whereNotNull('start_date')
                            ->whereNotNull('end_date')
                            ->where('start_date', '<=', $selectedEnd)
                            ->where('end_date', '>=', $selectedStart);
                    });
                })
                ->exists();

            if ($hasConflict) {
                return ApiResponse::error('You already booked overlapping dates for this event', 400);
            }

            // Count days inclusive
            $start = new \DateTime($selectedStart);
            $end = new \DateTime($selectedEnd);
            $interval = $start->diff($end);
            $daysBooked = $interval->days + 1;

            // booth_price is treated as per-day price for per_day method
            $unitPrice = $event->booth_price ?? 0;
            $boothPrice = $unitPrice * $daysBooked;
        } else {
            // Flat price for per_event, and registration spans whole event for conflict checks
            $boothPrice = $event->booth_price ?? 0;
            $selectedStart = date('Y-m-d', strtotime($event->start_date));
            $selectedEnd = date('Y-m-d', strtotime($event->end_date));
        }

        // Global conflict: tenant cannot join two events on the same dates
        $candidateStart = $selectedStart;
        $candidateEnd = $selectedEnd;
        if ($candidateStart && $candidateEnd) {
            $existingRegs = Registration::where('tenant_id', $userId)
                ->with('event')
                ->get();

            foreach ($existingRegs as $r) {
                $rStart = $r->start_date ? date('Y-m-d', strtotime($r->start_date)) : date('Y-m-d', strtotime($r->event->start_date));
                $rEnd = $r->end_date ? date('Y-m-d', strtotime($r->end_date)) : date('Y-m-d', strtotime($r->event->end_date));
                $overlap = ($rStart <= $candidateEnd) && ($rEnd >= $candidateStart);
                if ($overlap) {
                    return ApiResponse::error('You already have an event in the selected date range', 400);
                }
            }
        }

        $totalAmount = $boothPrice + $platformFee + $insuranceFee;

        $registration = Registration::create([
            'tenant_id' => $userId,
            'event_id' => $event->id,
            'start_date' => $selectedStart,
            'end_date' => $selectedEnd,
            'days_booked' => $daysBooked,
            'status' => 'REGISTERED'
        ]);

        $payment = Payment::create([
            'registration_id' => $registration->id,
            'amount' => $totalAmount,
            'status' => 'PENDING'
        ]);

        return ApiResponse::success([
            'registration' => $registration,
            'payment' => [
                'id' => $payment->id,
                'booth_price' => $boothPrice,
                'platform_fee' => $platformFee,
                'insurance_fee' => $insuranceFee,
                'total' => $totalAmount,
                'status' => $payment->status
            ]
        ], 'Registered successfully. Please complete payment.', 201);
    }

    public function activeEvents()
    {
        $user = auth()->user();
        if (!$user) {
            return ApiResponse::error('Unauthorized', 401);
        }

        $events = Event::whereIn('status', ['ACTIVATED', 'PUBLISHED'])
            ->whereHas('registrations', function ($query) use ($user) {
                $query->where('tenant_id', $user->id);
            })
            ->with(['registrations' => function ($query) use ($user) {
                $query->where('tenant_id', $user->id)
                    ->with('payment');
            }])
            ->get();

        // attach payment summary for UI: booth + platform + insurance
        foreach ($events as $ev) {
            $registration = $ev->registrations->first();
            $platformFee = 5000;
            $insuranceFee = $ev->insurance_active ? 10000 : 0;

            if ($ev->payment_method === 'per_day') {
                $days = $registration?->days_booked;
                if (!$days) {
                    $start = $registration?->start_date ? new \DateTime($registration->start_date) : new \DateTime($ev->start_date);
                    $end = $registration?->end_date ? new \DateTime($registration->end_date) : new \DateTime($ev->end_date);
                    $interval = $start->diff($end);
                    $days = $interval->days + 1;
                }
                $booth = ($ev->booth_price ?? 0) * max(1, (int)$days);
            } else {
                $booth = $ev->booth_price ?? 0;
            }

            $payment = $registration?->payment;

            $ev->setAttribute('payment_summary', [
                'booth_price' => $booth,
                'platform_fee' => $platformFee,
                'insurance_fee' => $insuranceFee,
                'total' => $booth + $platformFee + $insuranceFee,
            ]);

            $ev->setAttribute('payment_status', strtoupper($payment->status ?? 'PENDING'));
            if ($payment) {
                $ev->setAttribute('payment_latest_amount', $payment->amount);
                $ev->setAttribute('payment_last_updated_at', $payment->updated_at);
            }
        }

        return ApiResponse::success($events, "Your active events retrieved successfully");
    }
}
