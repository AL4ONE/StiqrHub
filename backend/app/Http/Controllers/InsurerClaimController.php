<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use Illuminate\Http\Request;

class InsurerClaimController extends Controller
{
    public function index()
    {
        $claims = Claim::whereHas('insurancePolicy', function ($q) {
            $q->where('insurer_id', auth()->user()->id);
        })->with(['tenant', 'insurancePolicy.event'])->get();

        return response()->json($claims);
    }

    public function show($id)
    {
        $claim = Claim::whereHas('insurancePolicy', function ($q) {
            $q->where('insurer_id', auth()->user()->id);
        })->with(['tenant', 'insurancePolicy.event'])->findOrFail($id);

        return response()->json($claim);
    }

    public function approve(Request $request, $id)
    {
        $validated = $request->validate([
            'approved_amount' => 'required|numeric',
            'case_reference' => 'nullable|string'
        ]);

        $claim = Claim::whereHas('insurancePolicy', function ($q) {
            $q->where('insurer_id', auth()->user()->id);
        })->findOrFail($id);

        $claim->update([
            'status' => 'APPROVED',
            'claim_amount' => $validated['approved_amount'],
            'reason' => $validated['case_reference'] ?? 'Approved by insurer'
        ]);

        // TODO: Send notification to tenant

        return response()->json([
            'message' => 'Claim approved',
            'data' => $claim
        ]);
    }

    public function reject(Request $request, $id)
    {
        $validated = $request->validate([
            'reason' => 'required|string'
        ]);

        $claim = Claim::whereHas('insurancePolicy', function ($q) {
            $q->where('insurer_id', auth()->user()->id);
        })->findOrFail($id);

        $claim->update([
            'status' => 'REJECTED',
            'reason' => $validated['reason']
        ]);

        // TODO: Send notification to tenant

        return response()->json([
            'message' => 'Claim rejected',
            'data' => $claim
        ]);
    }
}
