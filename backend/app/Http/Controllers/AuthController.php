<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Helpers\JwtHelper;
use App\Models\EoCategory;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Convert email to lowercase before validation
        $request->merge(['email' => strtolower($request->email)]);
        
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:EO,TENANT,ADMIN,INSURER',
            'categories' => 'required_if:role,EO|array|min:1|max:3',
            'categories.*' => 'in:F&B,Fashion,Automotive,Art & Craft,Snack & Beverage,Wellness,Others',
        ], [
            'categories.required_if' => 'EO must select at least 1 category',
            'categories.max' => 'Maximum 3 categories allowed for EO',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => strtolower($validated['email']),
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            // EO must be verified by admin before active
            'is_active' => $validated['role'] === 'EO' ? false : true,
        ]);

        if ($validated['role'] === 'EO' && isset($validated['categories'])) {
            foreach ($validated['categories'] as $category) {
                EoCategory::create([
                    'eo_id' => $user->id,
                    'category' => $category
                ]);
            }
        }

        $token = JwtHelper::generateToken($user);

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user->load('categories'),
        ]);
    }

    public function login(Request $request)
    {
        // Convert email to lowercase before validation
        $request->merge(['email' => strtolower($request->email)]);
        
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', strtolower($credentials['email']))->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = JwtHelper::generateToken($user);

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user,
        ]);
    }


    public function me()
    {
        return response()->json(auth()->user());
    }
}
