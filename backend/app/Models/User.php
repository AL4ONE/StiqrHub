<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
    ];

    // JWT Auth
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }

    // Relations
    public function events()
    {
        return $this->hasMany(Event::class, 'eo_id');
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class, 'tenant_id');
    }

    public function insurancePolicies()
    {
        return $this->hasMany(InsurancePolicy::class, 'insurer_id');
    }

    public function claims()
    {
        return $this->hasMany(Claim::class, 'tenant_id');
    }
    public function categories()
    {
        return $this->hasMany(EoCategory::class, 'eo_id');
    }
}
