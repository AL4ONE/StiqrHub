<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
        try {
            $user = Auth::user();
            
            // Only allow EO role
            if ($user->role !== 'EO') {
                return ApiResponse::error("Unauthorized", 403);
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
            
            // Only allow EO role
            if ($user->role !== 'EO') {
                return ApiResponse::error("Unauthorized", 403);
            }

            // Get name directly from request - try multiple ways
            $name = $request->input('name') 
                ?? $request->get('name') 
                ?? ($request->all()['name'] ?? null);
            
            // Validate name separately
            if (empty($name) || trim($name) === '') {
                return ApiResponse::error("Validation failed", 422, ['name' => ['The name field is required.']]);
            }

            // Validate other fields
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

            // Handle logo upload
            if ($request->hasFile('eo_logo')) {
                $disk = config('filesystems.default', 'public');
                $path = $request->file('eo_logo')->store('eo_logos', $disk);
                $validated['eo_logo'] = $path;
            }

            // Build update data - process all fields from request
            $updateData = [];
            
            // Always update name (required field) - use trimmed value
            $updateData['name'] = trim($name);
            
            // Handle nullable fields - get directly from request to ensure all fields are processed
            $nullableFields = [
                'eo_description', 'eo_category', 'eo_founded_year', 'eo_city',
                'eo_website', 'eo_instagram', 'eo_tiktok', 'eo_whatsapp',
                'eo_official_email', 'eo_address'
            ];
            
            foreach ($nullableFields as $field) {
                // Get value directly from request (FormData always sends fields, even if empty)
                if ($request->has($field)) {
                    $value = $request->input($field);
                    // Convert empty string to null for nullable fields
                    $updateData[$field] = ($value === '' || $value === null) ? null : $value;
                }
            }
            
            // Handle logo separately - only if file was uploaded
            if (isset($validated['eo_logo'])) {
                $updateData['eo_logo'] = $validated['eo_logo'];
            }

            // Update user with all provided data
            $user->update($updateData);
            
            // Always refresh to get latest data
            $user->refresh();

            // Return fresh user data with all fields (explicitly select all columns)
            $user->refresh();
            return ApiResponse::success($user, "Profile updated successfully");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error("Validation failed", 422, $e->errors());
        } catch (\Throwable $e) {
            return ApiResponse::error("Failed to update profile", 500, $e->getMessage());
        }
    }
}


