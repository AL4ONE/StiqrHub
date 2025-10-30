<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Models\Event;
use App\Models\Registration;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        try {
            $eoId = Auth::user()->id;
            
            // Total events
            $totalEvents = Event::where('eo_id', $eoId)->count();
            
            // Total tenants registered across all events
            $totalTenants = Registration::whereHas('event', function($query) use ($eoId) {
                $query->where('eo_id', $eoId);
            })->distinct('tenant_id')->count();
            
            // Total revenue from successful payments
            $totalRevenue = Payment::whereHas('registration.event', function($query) use ($eoId) {
                $query->where('eo_id', $eoId);
            })->where('status', 'SUCCESS')->sum('amount');
            
            // Active events (published)
            $activeEvents = Event::where('eo_id', $eoId)
                ->where('status', 'PUBLISHED')
                ->count();
            
            // Recent events (last 30 days)
            $recentEvents = Event::where('eo_id', $eoId)
                ->where('created_at', '>=', now()->subDays(30))
                ->count();
            
            // Pending payments
            $pendingPayments = Payment::whereHas('registration.event', function($query) use ($eoId) {
                $query->where('eo_id', $eoId);
            })->where('status', 'PENDING')->count();
            
            // Recent registrations (last 7 days)
            $recentRegistrations = Registration::whereHas('event', function($query) use ($eoId) {
                $query->where('eo_id', $eoId);
            })->where('created_at', '>=', now()->subDays(7))->count();
            
            $stats = [
                'total_events' => $totalEvents,
                'total_tenants' => $totalTenants,
                'total_revenue' => $totalRevenue,
                'active_events' => $activeEvents,
                'recent_events' => $recentEvents,
                'pending_payments' => $pendingPayments,
                'recent_registrations' => $recentRegistrations,
            ];
            
            return ApiResponse::success($stats, "Dashboard statistics retrieved successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to load dashboard statistics", 500, $e->getMessage());
        }
    }
}
