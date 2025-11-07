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
            $events = Event::whereIn('status', ['ACTIVATED', 'PUBLISHED'])
                ->withCount('registrations')
                ->with(['eo'])
                ->orderBy('start_date', 'asc')
                ->get();
            return ApiResponse::success($events, 'Active events retrieved');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve active events', 500, $e->getMessage());
        }
    }

    public function pending()
    {
        try {
            $events = Event::where('status', 'DRAFT')
                ->withCount('registrations')
                ->with(['eo'])
                ->orderBy('created_at', 'desc')
                ->get();
            return ApiResponse::success($events, 'Pending events retrieved');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve pending events', 500, $e->getMessage());
        }
    }

    public function activate($id)
    {
        try {
            $event = Event::find($id);
            if (!$event) {
                return ApiResponse::error('Event not found', 404);
            }
            if ($event->status !== 'DRAFT') {
                return ApiResponse::error('Only DRAFT events can be activated', 422);
            }
            $event->status = 'ACTIVATED';
            $event->save();
            return ApiResponse::success($event->fresh(), 'Event activated');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to activate event', 500, $e->getMessage());
        }
    }
}


