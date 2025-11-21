<?php

namespace App\Http\Controllers\EO;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    protected function bankAccountsEnabled(): bool
    {
        static $cache = null;

        if ($cache !== null) {
            return $cache;
        }

        try {
            $cache = Schema::hasTable('eo_bank_accounts');
        } catch (\Throwable $e) {
            $cache = false;
        }

        return $cache;
    }

    public function show()
    {
        try {
            $user = Auth::user();

            if ($user->role !== 'EO') {
                return ApiResponse::error("Unauthorized", 403);
            }

            if ($this->bankAccountsEnabled()) {
                $user->load('bankAccounts');
            } else {
                $user->setRelation('bankAccounts', collect());
            }

            return ApiResponse::success($user, "EO profile retrieved successfully");
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to load profile", 500, $e->getMessage());
        }
    }

    public function update(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user->role !== 'EO') {
                return ApiResponse::error("Unauthorized", 403);
            }

            $name = $request->input('name') ?? $request->get('name') ?? ($request->all()['name'] ?? null);

            if (empty($name) || trim($name) === '') {
                return ApiResponse::error("Validation failed", 422, ['name' => ['The name field is required.']]);
            }

            $validated = $request->validate([
                'eo_logo' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
                'eo_description' => 'nullable|string|max:1000',
                'eo_category' => 'nullable|in:F&B,Umum,Fashion,Craft,Mixed Event Organizer',
                'eo_founded_year' => 'nullable|integer|min:1900|max:' . date('Y'),
                'eo_city' => 'nullable|string|max:255',
                'eo_website' => 'nullable|url|max:255',
                'eo_instagram' => 'nullable|string|max:255',
                'eo_tiktok' => 'nullable|string|max:255',
                'eo_whatsapp' => 'nullable|string|max:20',
                'eo_official_email' => 'nullable|email|max:255',
                'eo_address' => 'nullable|string|max:500',
            ]);

            if ($request->hasFile('eo_logo')) {
                $disk = config('filesystems.default', 'public');
                $path = $request->file('eo_logo')->store('eo_logos', $disk);
                $validated['eo_logo'] = $path;
            }

            $updateData = [
                'name' => trim($name),
            ];

            $nullableFields = [
                'eo_description', 'eo_category', 'eo_founded_year', 'eo_city',
                'eo_website', 'eo_instagram', 'eo_tiktok', 'eo_whatsapp',
                'eo_official_email', 'eo_address',
            ];

            foreach ($nullableFields as $field) {
                if ($request->has($field)) {
                    $value = $request->input($field);
                    $updateData[$field] = ($value === '' || $value === null) ? null : $value;
                }
            }

            if (isset($validated['eo_logo'])) {
                $updateData['eo_logo'] = $validated['eo_logo'];
            }

            $bankAccountsPayload = null;
            if ($request->has('bank_accounts')) {
                if (!$this->bankAccountsEnabled()) {
                    return ApiResponse::error("Bank account feature is not available yet. Please run the latest migrations.", 503);
                }

                $bankAccountsPayload = $request->input('bank_accounts');
                if (is_string($bankAccountsPayload)) {
                    $decoded = json_decode($bankAccountsPayload, true);
                    $bankAccountsPayload = $decoded;
                }

                if (!is_array($bankAccountsPayload)) {
                    return ApiResponse::error("Validation failed", 422, ['bank_accounts' => ['Invalid bank account data provided.']]);
                }

                $processedAccounts = [];
                $defaultAssigned = false;

                foreach ($bankAccountsPayload as $index => $account) {
                    if (!is_array($account)) {
                        return ApiResponse::error("Validation failed", 422, ['bank_accounts' => ["Invalid bank account entry at index {$index}."]]);
                    }

                    $validator = Validator::make($account, [
                        'bank_name' => 'required|string|max:255',
                        'account_name' => 'required|string|max:255',
                        'account_number' => 'required|string|max:255',
                        'is_default' => 'nullable|boolean',
                    ]);

                    if ($validator->fails()) {
                        return ApiResponse::error("Validation failed", 422, $validator->errors());
                    }

                    $isDefault = filter_var($account['is_default'] ?? false, FILTER_VALIDATE_BOOLEAN);
                    if ($isDefault && $defaultAssigned) {
                        $isDefault = false;
                    }
                    if ($isDefault) {
                        $defaultAssigned = true;
                    }

                    $processedAccounts[] = [
                        'bank_name' => $account['bank_name'],
                        'account_name' => $account['account_name'],
                        'account_number' => $account['account_number'],
                        'is_default' => $isDefault,
                    ];
                }

                if (!$defaultAssigned && count($processedAccounts) > 0) {
                    $processedAccounts[0]['is_default'] = true;
                }

                $bankAccountsPayload = $processedAccounts;
            }

            $user->update($updateData);

            if ($this->bankAccountsEnabled() && !is_null($bankAccountsPayload)) {
                $user->bankAccounts()->delete();
                foreach ($bankAccountsPayload as $accountData) {
                    $user->bankAccounts()->create($accountData);
                }
            }

            if ($this->bankAccountsEnabled()) {
                $user->load('bankAccounts');
            }

            return ApiResponse::success($user, "Profile updated successfully");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to update profile", 500, $e->getMessage());
        }
    }
}
