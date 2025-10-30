<?php

namespace App\Helpers;

use Firebase\JWT\JWT;

class JwtHelper
{
    public static function generateToken($user)
    {
        $payload = [
            'iss' => config('app.url'),
            'sub' => $user->id,
            'role' => $user->role,
            'iat' => time(),
            'exp' => time() + 60 * 60 * 24, // 1 hari
        ];

        $secret = env('JWT_SECRET');
        return JWT::encode($payload, $secret, 'HS256');
    }
}
