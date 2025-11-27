<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class EoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = User::where('role', 'EO');
            if ($request->has('is_active')) {
                $val = filter_var($request->query('is_active'), FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE);
                if (!is_null($val)) {
                    $query->where('is_active', $val);
                }
            }
            $eos = $query->orderBy('created_at', 'desc')->get();
            return ApiResponse::success($eos, 'EO list retrieved successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to load EO list', 500, $e->getMessage());
        }
    }

    public function verify($id)
    {
        try {
            $eo = User::where('role', 'EO')->findOrFail($id);
            if ($eo->is_active) {
                return ApiResponse::success($eo, 'EO already verified');
            }

            $eo->update(['is_active' => true]);
            return ApiResponse::success($eo, 'EO verified successfully');
        } catch (\Throwable $e) {
            return ApiResponse::error('Failed to verify EO', 500, $e->getMessage());
        }
    }
}
