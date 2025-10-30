<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        if (strtoupper($user->role) !== strtoupper($role)) {
            return response()->json([
                'message' => 'Forbidden: insufficient role',
                'required_role' => $role,
                'your_role' => $user->role
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
