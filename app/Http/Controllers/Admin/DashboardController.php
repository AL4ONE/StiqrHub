<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Payment;
use App\Models\User;
use App\Models\Claim;

class DashboardController extends Controller
{
    public function stats()
    {
        try {
            $pendingPayments = Payment::where('status', 'PENDING')->count();
            $eosToVerify = User::where('role', 'EO')->where('is_active', false)->count();
            $activeEvents = Event::where('status', 'ACTIVE')->count();
            $qrisVolume = Payment::where('status', 'SUCCESS')->sum('amount');
            $activeClaims = Claim::where('status', 'REQUEST_CLAIM')->count();

            return ApiResponse::success([
                'pending_payments' => $pendingPayments,
                'eos_to_verify' => $eosToVerify,
                'active_events' => $activeEvents,
                'qris_volume' => $qrisVolume,
                'active_claims' => $activeClaims,
            ], 'Admin dashboard stats');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to get admin dashboard stats', 500, $e->getMessage());
        }
    }
}
