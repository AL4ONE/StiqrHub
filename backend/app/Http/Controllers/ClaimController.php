<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Claim;
use App\Models\InsurancePolicy;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function submit(Request $request, $eventId)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'claim_amount' => 'nullable|numeric',
            'document' => 'required|file|mimes:jpg,png,pdf|max:2048'
        ]);

        $policy = InsurancePolicy::where('event_id', $eventId)->first();
        if (!$policy) {
            return response()->json(['message' => 'No insurance policy for this event'], 400);
        }

        $path = $request->file('document')->store('claims', 'public');

        $claim = Claim::create([
            'tenant_id' => auth()->user()->id,
            'insurance_policy_id' => $policy->id,
            'description' => $validated['description'],
            'claim_amount' => $validated['claim_amount'] ?? null,
            'document_path' => $path,
            'status' => 'REQUEST_CLAIM'
        ]);

        return response()->json([
            'message' => 'Claim submitted successfully',
            'data' => $claim
        ], 201);
    }

    public function index()
    {
        $claims = Claim::where('tenant_id', auth()->user()->id)
            ->with('insurancePolicy.event')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($claims);
    }

    public function show($id)
    {
        $claim = Claim::where('tenant_id', auth()->user()->id)
            ->with('insurancePolicy.event')
            ->findOrFail($id);

        return response()->json($claim);
    }
}
