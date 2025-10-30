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
    // Simple H+1 tracking report: total successful payments per event with last payment date = yesterday
    public function settlementTracking()
    {
        try {
            $yesterday = date('Y-m-d', strtotime('-1 day'));

            $rows = Payment::where('status', 'SUCCESS')
                ->whereDate('updated_at', $yesterday)
                ->select(DB::raw('registration_id'))
                ->with(['registration.event'])
                ->get()
                ->groupBy(fn($p) => optional($p->registration->event)->id)
                ->map(function ($group, $eventId) {
                    $total = 0;
                    foreach ($group as $p) {
                        $total += $p->amount;
                    }
                    return [
                        'event_id' => $eventId,
                        'event_name' => optional(optional($group->first()->registration)->event)->name,
                        'total_amount' => $total,
                        'payments_count' => $group->count(),
                        'settlement_date' => date('Y-m-d', strtotime('+1 day', strtotime($group->first()->updated_at)))
                    ];
                })
                ->values();

            return ApiResponse::success($rows, 'Settlement H+1 tracking generated');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to build payout tracking', 500, $e->getMessage());
        }
    }
}


