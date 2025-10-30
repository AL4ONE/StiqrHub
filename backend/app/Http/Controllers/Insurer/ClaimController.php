<?php

namespace App\Http\Controllers\Insurer;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Claim;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    /**
     * Get all claims for current insurer
     */
    public function index(Request $request)
    {
        try {
            $query = Claim::whereHas('insurancePolicy', function ($q) {
                $q->where('insurer_id', auth()->user()->id);
            })->with(['tenant', 'insurancePolicy.event']);

            // Filter by status (optional)
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Filter by event (optional)
            if ($request->has('event_id')) {
                $query->whereHas('insurancePolicy', function ($q) use ($request) {
                    $q->where('event_id', $request->event_id);
                });
            }

            $claims = $query->orderBy('created_at', 'desc')->get();

            return ApiResponse::success($claims, 'Claims retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve claims', 500, $e->getMessage());
        }
    }

    /**
     * Get claim detail
     */
    public function show($id)
    {
        try {
            $claim = Claim::whereHas('insurancePolicy', function ($q) {
                $q->where('insurer_id', auth()->user()->id);
            })->with(['tenant', 'insurancePolicy.event'])->findOrFail($id);

            return ApiResponse::success($claim, 'Claim detail retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Claim not found or unauthorized', 404);
        }
    }

    /**
     * Approve claim
     */
    public function approve(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'approved_amount' => 'required|numeric|min:0',
                'case_reference' => 'nullable|string|max:255'
            ]);

            // Cek ownership
            $claim = Claim::whereHas('insurancePolicy', function ($q) {
                $q->where('insurer_id', auth()->user()->id);
            })->findOrFail($id);

            // Validasi: hanya bisa approve kalau status REQUEST_CLAIM
            if ($claim->status !== 'REQUEST_CLAIM') {
                return ApiResponse::error('Claim already processed', 400);
            }

            // Update claim
            $claim->update([
                'status' => 'APPROVED',
                'claim_amount' => $validated['approved_amount'],
                'reason' => $validated['case_reference'] ?? 'Approved by insurer: ' . auth()->user()->name
            ]);

            // TODO: Send notification to tenant (WA/Email)
            // $this->notifyTenant($claim, 'approved');

            $claim->load(['tenant', 'insurancePolicy.event']);

            return ApiResponse::success($claim, 'Claim approved successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Validation failed', 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to approve claim', 500, $e->getMessage());
        }
    }

    /**
     * Reject claim
     */
    public function reject(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'reason' => 'required|string|min:10' // PRD: alasan penolakan mandatory
            ]);

            // Cek ownership
            $claim = Claim::whereHas('insurancePolicy', function ($q) {
                $q->where('insurer_id', auth()->user()->id);
            })->findOrFail($id);

            // Validasi: hanya bisa reject kalau status REQUEST_CLAIM
            if ($claim->status !== 'REQUEST_CLAIM') {
                return ApiResponse::error('Claim already processed', 400);
            }

            // Update claim
            $claim->update([
                'status' => 'REJECTED',
                'reason' => $validated['reason']
            ]);

            // TODO: Send notification to tenant (WA/Email)
            // $this->notifyTenant($claim, 'rejected');

            $claim->load(['tenant', 'insurancePolicy.event']);

            return ApiResponse::success($claim, 'Claim rejected');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Validation failed', 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to reject claim', 500, $e->getMessage());
        }
    }

    /**
     * Get claims statistics
     */
    public function stats()
    {
        try {
            $insurerId = auth()->user()->id;

            $stats = [
                'total_claims' => Claim::whereHas('insurancePolicy', function ($q) use ($insurerId) {
                    $q->where('insurer_id', $insurerId);
                })->count(),

                'pending_claims' => Claim::whereHas('insurancePolicy', function ($q) use ($insurerId) {
                    $q->where('insurer_id', $insurerId);
                })->where('status', 'REQUEST_CLAIM')->count(),

                'approved_claims' => Claim::whereHas('insurancePolicy', function ($q) use ($insurerId) {
                    $q->where('insurer_id', $insurerId);
                })->where('status', 'APPROVED')->count(),

                'rejected_claims' => Claim::whereHas('insurancePolicy', function ($q) use ($insurerId) {
                    $q->where('insurer_id', $insurerId);
                })->where('status', 'REJECTED')->count(),

                'total_approved_amount' => Claim::whereHas('insurancePolicy', function ($q) use ($insurerId) {
                    $q->where('insurer_id', $insurerId);
                })->where('status', 'APPROVED')->sum('claim_amount') ?? 0,
            ];

            return ApiResponse::success($stats, 'Statistics retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve statistics', 500, $e->getMessage());
        }
    }
}
