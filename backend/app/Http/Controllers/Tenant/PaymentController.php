<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    public function uploadProof(Request $request, $id)
    {
        try {
            $payment = Payment::with('registration')->findOrFail($id);

            // Verify that the payment belongs to the authenticated tenant
            if ($payment->registration->tenant_id !== Auth::user()->id) {
                return ApiResponse::error('Unauthorized: This payment does not belong to you', 403);
            }

            // Validate file upload
            $request->validate([
                'payment_proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            ], [
                'payment_proof.required' => 'Bukti pembayaran wajib diupload',
                'payment_proof.file' => 'File tidak valid',
                'payment_proof.mimes' => 'File harus berformat JPG, PNG, atau PDF',
                'payment_proof.max' => 'Ukuran file maksimal 2MB',
            ]);

            // Delete old proof if exists
            if ($payment->payment_proof_path) {
                Storage::disk(config('filesystems.default', 'public'))->delete($payment->payment_proof_path);
            }

            // Upload new proof
            $disk = config('filesystems.default', 'public');
            $path = $request->file('payment_proof')->store('payment_proofs', $disk);

            // Update payment with proof path
            $payment->update([
                'payment_proof_path' => $path,
            ]);

            return ApiResponse::success($payment->fresh('registration'), 'Bukti pembayaran berhasil diupload');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Validation failed', 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to upload payment proof', 500, $e->getMessage());
        }
    }
}
