<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Claim;
use App\Models\InsurancePolicy;
use App\Models\Payment;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function submit(Request $request, $eventId)
    {
        $validated = $request->validate([
            'incident_date' => 'required|date',
            'description' => 'required|string|min:10',
            'document' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048'
        ], [
            'incident_date.required' => 'Tanggal kejadian wajib diisi',
            'incident_date.date' => 'Format tanggal tidak valid',
            'description.required' => 'Deskripsi klaim wajib diisi',
            'description.min' => 'Deskripsi minimal 10 karakter',
            'document.required' => 'Dokumen bukti wajib diupload',
            'document.mimes' => 'File harus berformat JPG, PNG, atau PDF',
            'document.max' => 'Ukuran file maksimal 2MB'
        ]);

        // Cek apakah ada insurance policy untuk event ini
        $policy = InsurancePolicy::where('event_id', $eventId)->first();
        if (!$policy) {
            return response()->json([
                'status' => 'error',
                'message' => 'No insurance policy for this event'
            ], 400);
        }

        // Cek SEMUA payment untuk tenant di event ini
        $payments = \DB::table('payments')
            ->join('registrations', 'payments.registration_id', '=', 'registrations.id')
            ->where('registrations.tenant_id', auth()->user()->id)
            ->where('registrations.event_id', $eventId)
            ->select('payments.id', 'payments.status', 'payments.amount')
            ->get();

        if ($payments->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No payment found for this event. Please register and pay first.'
            ], 400);
        }

        // Cek apakah ada payment yang masih PENDING atau FAILED
        $hasPending = $payments->contains('status', 'PENDING');
        $hasFailed = $payments->contains('status', 'FAILED');
        $hasSuccess = $payments->contains('status', 'SUCCESS');

        if ($hasPending) {
            return response()->json([
                'status' => 'error',
                'message' => 'Your payment is still PENDING. Please complete your payment first before submitting a claim.'
            ], 400);
        }

        if ($hasFailed && !$hasSuccess) {
            return response()->json([
                'status' => 'error',
                'message' => 'Your payment has FAILED. Please make a new payment before submitting a claim.'
            ], 400);
        }

        if (!$hasSuccess) {
            return response()->json([
                'status' => 'error',
                'message' => 'No successful payment found for this event. Please complete your payment first.'
            ], 400);
        }

        // Ambil total payment SUCCESS untuk event ini
        $totalPayment = \DB::table('payments')
            ->join('registrations', 'payments.registration_id', '=', 'registrations.id')
            ->where('registrations.tenant_id', auth()->user()->id)
            ->where('registrations.event_id', $eventId)
            ->where('payments.status', 'SUCCESS')
            ->sum('payments.amount');

        \Log::info('Claim submission debug', [
            'tenant_id' => auth()->user()->id,
            'event_id' => $eventId,
            'payments' => $payments->toArray(),
            'has_pending' => $hasPending,
            'has_success' => $hasSuccess,
            'total_payment_success' => $totalPayment,
            'policy_id' => $policy->id
        ]);

        if ($totalPayment <= 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'No successful payment found for this event.'
            ], 400);
        }

        // Upload dokumen - Use default disk (can be 'public' or 's3' based on FILESYSTEM_DISK env)
        $disk = config('filesystems.default', 'public');
        $path = $request->file('document')->store('claims', $disk);

        // Buat claim dengan claim_amount otomatis dari total payment
        $claim = Claim::create([
            'tenant_id' => auth()->user()->id,
            'insurance_policy_id' => $policy->id,
            'incident_date' => $validated['incident_date'], // dari input user
            'description' => $validated['description'],
            'claim_amount' => $totalPayment, // otomatis dari total payment
            'document_path' => $path,
            'status' => 'REQUEST_CLAIM'
        ]);

        return response()->json([
            'message' => 'Claim submitted successfully',
            'data' => $claim->load('insurancePolicy.event')
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

    public function byEvent($eventId)
    {
        $claims = Claim::where('tenant_id', auth()->user()->id)
            ->whereHas('insurancePolicy', function ($q) use ($eventId) {
                $q->where('event_id', $eventId);
            })
            ->with('insurancePolicy.event')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($claims);
    }
}
