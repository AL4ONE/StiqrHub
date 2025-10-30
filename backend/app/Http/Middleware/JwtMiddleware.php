<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], Response::HTTP_UNAUTHORIZED);
            }

            $secret = env('JWT_SECRET');
            $decoded = JWT::decode($token, new Key($secret, 'HS256'));

            $user = User::find($decoded->sub);
            if (!$user) {
                return response()->json(['message' => 'User not found'], Response::HTTP_UNAUTHORIZED);
            }

            Auth::setUser($user);

            $request->merge(['auth_user' => $user]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Invalid or expired token', 'error' => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
