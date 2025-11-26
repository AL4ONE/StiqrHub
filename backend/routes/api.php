<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EO\EventController as EOEventController;
use App\Http\Controllers\EO\EventRuleController;
use App\Http\Controllers\EO\DashboardController as EODashboardController;
use App\Http\Controllers\EO\PayoutController as EOPayoutController;
use App\Http\Controllers\EO\ProfileController as EOProfileController;
use App\Http\Controllers\EO\EventHistoryController;
use App\Http\Controllers\EO\ClaimController as EOClaimController;
use App\Http\Controllers\Insurer\ClaimController as InsurerClaimController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\Tenant\EventController as TenantEventController;
use App\Http\Controllers\Tenant\ClaimController as TenantClaimController;
use App\Http\Controllers\Tenant\DashboardController as TenantDashboardController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\EoController as AdminEoController;
use App\Http\Controllers\Admin\EventAuditController as AdminEventAuditController;
use App\Http\Controllers\Admin\PayoutController as AdminPayoutController;
use App\Http\Controllers\Admin\FraudController as AdminFraudController;
use App\Http\Controllers\Admin\AnalyticsController as AdminAnalyticsController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

// ================== AUTH ==================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public endpoints (no auth)
Route::get('/public/events', [\App\Http\Controllers\Public\PublicEventController::class, 'index']);

Route::middleware('jwt.verify')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);

    // ================== EO ==================
    Route::prefix('eo')->middleware('role:EO')->group(function () {
        Route::get('/profile', [EOProfileController::class, 'show']);
        Route::post('/profile', [EOProfileController::class, 'update']);
        Route::put('/profile', [EOProfileController::class, 'update']);
        
        Route::get('/dashboard/stats', [EODashboardController::class, 'stats']);
        Route::get('/payouts', [EOPayoutController::class, 'index']);
        Route::post('/payouts/request', [EOPayoutController::class, 'requestPayout']);
        Route::get('/events/history', [EventHistoryController::class, 'index']);
        Route::get('/claims', [EOClaimController::class, 'index']);

        Route::get('/events', [EOEventController::class, 'index']);
        Route::post('/events', [EOEventController::class, 'store']);
        Route::get('/events/{id}', [EOEventController::class, 'show']);
        Route::put('/events/{id}', [EOEventController::class, 'update']);
        Route::delete('/events/{id}', [EOEventController::class, 'destroy']);

        Route::get('/events/{eventId}/rules', [EventRuleController::class, 'index']);
        Route::post('/events/{eventId}/rules', [EventRuleController::class, 'store']);
        Route::post('/events/{eventId}/rules/bulk', [EventRuleController::class, 'bulkStore']);
        Route::put('/events/{eventId}/rules/{ruleId}', [EventRuleController::class, 'update']);
        Route::delete('/events/{eventId}/rules/{ruleId}', [EventRuleController::class, 'destroy']);
    });

    // ================== TENANT ==================
    Route::prefix('tenant')->middleware('role:TENANT')->group(function () {
        Route::get('/dashboard/stats', [TenantDashboardController::class, 'stats']);
        Route::get('/dashboard/active-events', [TenantDashboardController::class, 'activeEventsDetail']);
        Route::get('/dashboard/pending-claims', [TenantDashboardController::class, 'pendingClaimsDetail']);
        Route::get('/dashboard/total-registrations', [TenantDashboardController::class, 'totalRegistrationsDetail']);
        Route::get('/dashboard/pending-payments', [TenantDashboardController::class, 'pendingPaymentsDetail']);
        Route::get('/events/active', [TenantEventController::class, 'activeEvents']);
        Route::get('/events/{id}', [TenantEventController::class, 'show']);
        Route::get('/events', [TenantEventController::class, 'index']);
        Route::post('/events/{id}/register', [TenantEventController::class, 'register']);

        Route::get('/claims', [TenantClaimController::class, 'index']);
        Route::get('/claims/{id}', [TenantClaimController::class, 'show']);
        Route::post('/events/{eventId}/claims', [TenantClaimController::class, 'submit']);
        Route::get('/events/{eventId}/claims', [TenantClaimController::class, 'byEvent']);
        
        Route::post('/payments/{id}/proof', [\App\Http\Controllers\Tenant\PaymentController::class, 'uploadProof']);
    });

    // ================== INSURER ==================
    Route::prefix('insurer')->middleware('role:INSURER')->group(function () {
        Route::get('/claims', [InsurerClaimController::class, 'index']);
        Route::get('/claims/stats', [InsurerClaimController::class, 'stats']);
        Route::get('/claims/{id}', [InsurerClaimController::class, 'show']);
        Route::post('/claims/{id}/approve', [InsurerClaimController::class, 'approve']);
        Route::post('/claims/{id}/reject', [InsurerClaimController::class, 'reject']);
    });

    // ================== ADMIN ==================
    Route::prefix('admin')->middleware('role:ADMIN')->group(function () {
        Route::get('/dashboard/stats', [AdminDashboardController::class, 'stats']);
        Route::get('/payments', [AdminPaymentController::class, 'index']);
        Route::post('/payments/{id}/mark-paid', [AdminPaymentController::class, 'markPaid']);
        Route::post('/payments/{id}/mark-failed', [AdminPaymentController::class, 'markFailed']);
        Route::get('/eos', [AdminEoController::class, 'index']);
        Route::post('/eos/{id}/verify', [AdminEoController::class, 'verify']);
        Route::get('/events/active', [AdminEventAuditController::class, 'active']);
        Route::get('/events/pending', [AdminEventAuditController::class, 'pending']);
        Route::post('/events/{id}/activate', [AdminEventAuditController::class, 'activate']);
        Route::get('/payouts/settlement-tracking', [AdminPayoutController::class, 'settlementTracking']);
        Route::get('/fraud/duplicate-registrations', [AdminFraudController::class, 'duplicateRegistrations']);
        Route::get('/analytics/summary', [AdminAnalyticsController::class, 'summary']);
    });
});
