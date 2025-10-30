<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Payment;
use App\Models\Payout;
use App\Models\Registration;
use Illuminate\Http\Request;

class PayoutController extends Controller
{
    public function dashboardStats()
    {
        $eoId = auth()->user()->id;

        $stats = [
            'total_events' => Event::where('eo_id', $eoId)->count(),
            'active_events' => Event::where('eo_id', $eoId)->where('status', 'ACTIVE')->count(),
            'total_tenants' => Registration::whereHas('event', function ($q) use ($eoId) {
                $q->where('eo_id', $eoId);
            })->count(),
            'total_revenue' => Payment::whereHas('registration.event', function ($q) use ($eoId) {
                $q->where('eo_id', $eoId);
            })->where('status', 'SUCCESS')->sum('amount'),
            'pending_payouts' => Payout::whereHas('event', function ($q) use ($eoId) {
                $q->where('eo_id', $eoId);
            })->where('status', 'PENDING')->sum('total_amount'),
        ];

        return response()->json($stats);
    }
}
