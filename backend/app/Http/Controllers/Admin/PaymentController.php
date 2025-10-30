<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Registration;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Payment::with(['registration.tenant', 'registration.event'])
                ->orderBy('created_at', 'desc');

            if ($request->has('status')) {
                $query->where('status', $request->query('status'));
            }

            return ApiResponse::success($query->get(), 'Payments retrieved');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to retrieve payments', 500, $e->getMessage());
        }
    }

    public function markPaid($id, Request $request)
    {
        try {
            $payment = Payment::with('registration')->findOrFail($id);

            if ($payment->status === 'SUCCESS') {
                return ApiResponse::success($payment, 'Payment already marked as SUCCESS');
            }

            $payment->update([
                'status' => 'SUCCESS',
                'qris_reference' => $request->input('qris_reference', $payment->qris_reference),
            ]);

            if ($payment->registration && $payment->registration->status !== 'PAID') {
                $payment->registration->update(['status' => 'PAID']);
            }

            return ApiResponse::success($payment->fresh('registration'), 'Payment marked as SUCCESS and registration updated');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to mark payment as paid', 500, $e->getMessage());
        }
    }

    public function markFailed($id, Request $request)
    {
        try {
            $payment = Payment::with('registration')->findOrFail($id);

            if ($payment->status === 'FAILED') {
                return ApiResponse::success($payment, 'Payment already marked as FAILED');
            }

            $payment->update([
                'status' => 'FAILED',
                'qris_reference' => $request->input('qris_reference', $payment->qris_reference),
            ]);

            // Keep registration at REGISTERED when payment failed
            if ($payment->registration && $payment->registration->status === 'PAID') {
                $payment->registration->update(['status' => 'REGISTERED']);
            }

            return ApiResponse::success($payment->fresh('registration'), 'Payment marked as FAILED');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to mark payment as failed', 500, $e->getMessage());
        }
    }
}
