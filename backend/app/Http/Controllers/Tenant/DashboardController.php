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

            // Count of available events (PUBLISHED only, visible to tenants)
            $now = now();
            $availableEvents = Event::where('status', 'PUBLISHED')
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
                ->count();

            // Total registrations for this tenant
            $totalRegistrations = Registration::where('tenant_id', $tenantId)->count();

            // Active events for this tenant (has registration on ACTIVATED or PUBLISHED event)
            $activeEvents = Event::whereIn('status', ['ACTIVATED', 'PUBLISHED'])
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

    public function activeEventsDetail()
    {
        try {
            $tenantId = Auth::user()->id;
            
            // Get active events with payment status SUCCESS
            $events = Event::whereIn('status', ['ACTIVATED', 'PUBLISHED'])
                ->whereHas('registrations', function ($q) use ($tenantId) {
                    $q->where('tenant_id', $tenantId)
                      ->whereHas('payment', function ($p) {
                          $p->where('status', 'SUCCESS');
                      });
                })
                ->with(['registrations' => function ($q) use ($tenantId) {
                    $q->where('tenant_id', $tenantId)
                      ->with('payment');
                }])
                ->get();

            return ApiResponse::success($events, 'Active events with paid status retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to load active events', 500, $e->getMessage());
        }
    }

    public function pendingClaimsDetail()
    {
        try {
            $tenantId = Auth::user()->id;
            
            $claims = Claim::where('tenant_id', $tenantId)
                ->where('status', 'REQUEST_CLAIM')
                ->with(['insurancePolicy.event'])
                ->get();

            return ApiResponse::success($claims, 'Pending claims retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to load pending claims', 500, $e->getMessage());
        }
    }

    public function totalRegistrationsDetail()
    {
        try {
            $tenantId = Auth::user()->id;
            
            $registrations = Registration::where('tenant_id', $tenantId)
                ->with(['event'])
                ->get();

            return ApiResponse::success($registrations, 'Total registrations retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to load registrations', 500, $e->getMessage());
        }
    }

    public function pendingPaymentsDetail()
    {
        try {
            $tenantId = Auth::user()->id;
            
            $payments = Payment::whereHas('registration', function ($q) use ($tenantId) {
                $q->where('tenant_id', $tenantId);
            })
            ->where('status', 'PENDING')
            ->with(['registration.event'])
            ->get();

            return ApiResponse::success($payments, 'Pending payments retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to load pending payments', 500, $e->getMessage());
        }
    }
}
