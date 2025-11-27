<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Payment;
use App\Models\Claim;

class AnalyticsController extends Controller
{
    public function summary()
    {
        try {
            $data = [
                'total_events' => Event::count(),
                'active_events' => Event::whereIn('status', ['ACTIVATED', 'PUBLISHED'])->count(),
                'total_transactions' => Payment::count(),
                'qris_volume' => Payment::where('status', 'SUCCESS')->sum('amount'),
                'active_claims' => Claim::where('status', 'REQUEST_CLAIM')->count(),
                'approved_claims' => Claim::where('status', 'APPROVED')->count(),
                'rejected_claims' => Claim::where('status', 'REJECTED')->count(),
            ];
            return ApiResponse::success($data, 'Analytics summary');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to get analytics summary', 500, $e->getMessage());
        }
    }
}


