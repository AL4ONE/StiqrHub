<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;

class EventAuditController extends Controller
{
    public function active()
    {
        try {
            $events = Event::where('status', 'ACTIVE')
                ->withCount('registrations')
                ->with(['eo'])
                ->orderBy('start_date', 'asc')
                ->get();
            return ApiResponse::success($events, 'Active events retrieved');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve active events', 500, $e->getMessage());
        }
    }
}


