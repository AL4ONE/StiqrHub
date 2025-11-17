<?php

namespace App\Http\Controllers\Public;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class PublicEventController extends Controller
{
    /**
     * List published events visible to unauthenticated users.
     */
    public function index(Request $request)
    {
        try {
            $now = now();
            $events = Event::where('status', 'PUBLISHED')
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
                ->orderBy('start_date', 'asc')
                ->get([
                    'id',
                    'name',
                    'location',
                    'start_date',
                    'end_date',
                    'banner',
                    'booth_price',
                    'category',
                    'created_at'
                ]);

            // Ensure accessor banner_url is appended
            $events->each(function ($ev) {
                $ev->append('banner_url');
            });

            return ApiResponse::success($events, 'Published events retrieved');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to load published events', 500, $e->getMessage());
        }
    }
}


