<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'eo_id',
        'name',
        'location',
        'map_link',
        'start_date',
        'end_date',
        'category',
        'booth_capacity',
        'booth_size',
        'banner',
        'insurance_active',
        'booth_price',
        'estimated_visitors',
        'payment_method',
        'status',
    ];

    public function eo()
    {
        return $this->belongsTo(User::class, 'eo_id');
    }

    public function rules()
    {
        return $this->hasMany(EventRule::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class);
    }

    public function insurancePolicies()
    {
        return $this->hasMany(InsurancePolicy::class);
    }
}
