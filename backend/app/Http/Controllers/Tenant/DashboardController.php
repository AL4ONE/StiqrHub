<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Registration;
use App\Models\Claim;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function stats()
    {
        try {
            $tenantId = Auth::user()->id;

            // Count of available events (ACTIVE or PUBLISHED)
            $availableEvents = Event::whereIn('status', ['ACTIVE', 'PUBLISHED'])->count();

            // Total registrations for this tenant
            $totalRegistrations = Registration::where('tenant_id', $tenantId)->count();

            // Active events for this tenant (has registration on ACTIVE event)
            $activeEvents = Event::where('status', 'ACTIVE')
                ->whereHas('registrations', function ($q) use ($tenantId) {
                    $q->where('tenant_id', $tenantId);
                })
                ->count();

            // Pending claims for this tenant
            $pendingClaims = Claim::where('tenant_id', $tenantId)
                ->where('status', 'REQUEST_CLAIM')
                ->count();

            // Pending payments for this tenant
            $pendingPayments = Payment::whereHas('registration', function ($q) use ($tenantId) {
                $q->where('tenant_id', $tenantId);
            })->where('status', 'PENDING')->count();

            return ApiResponse::success([
                'available_events' => $availableEvents,
                'active_events' => $activeEvents,
                'total_registrations' => $totalRegistrations,
                'pending_claims' => $pendingClaims,
                'pending_payments' => $pendingPayments,
            ], 'Dashboard stats retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to load dashboard stats', 500, $e->getMessage());
        }
    }
}
