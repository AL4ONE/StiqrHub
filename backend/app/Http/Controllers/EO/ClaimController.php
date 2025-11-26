<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Models\Claim;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;

class ClaimController extends Controller
{
    public function index()
    {
        try {
            $eoId = Auth::user()->id;
            
            // Get all claims from events owned by this EO
            $claims = Claim::whereHas('insurancePolicy.event', function($query) use ($eoId) {
                $query->where('eo_id', $eoId);
            })
            ->with([
                'tenant',
                'insurancePolicy.event'
            ])
            ->orderBy('created_at', 'desc')
            ->get();
            
            $claimsWithDetails = $claims->map(function($claim) {
                $event = $claim->insurancePolicy->event ?? null;
                return [
                    'id' => $claim->id,
                    'tenant_name' => $claim->tenant->name ?? 'N/A',
                    'tenant_email' => $claim->tenant->email ?? 'N/A',
                    'event_id' => $event->id ?? null,
                    'event_name' => $event->name ?? 'N/A',
                    'event_banner' => $event->banner ?? null,
                    'event_banner_url' => $event->banner_url ?? null,
                    'event_start_date' => $event->start_date ?? null,
                    'event_end_date' => $event->end_date ?? null,
                    'incident_date' => $claim->incident_date,
                    'description' => $claim->description,
                    'document_path' => $claim->document_path ?? null,
                    'claim_amount' => (float) ($claim->claim_amount ?? 0),
                    'status' => $claim->status,
                    'reason' => $claim->reason,
                    'created_at' => $claim->created_at,
                    'policy_number' => $claim->insurancePolicy->policy_number ?? 'N/A',
                ];
            });
            
            return ApiResponse::success($claimsWithDetails, "Claims retrieved successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to load claims", 500, $e->getMessage());
        }
    }
}

