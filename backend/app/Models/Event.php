<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    protected $fillable = [
        'eo_id',
        'name',
        'location',
        'map_link',
        'details',
        'start_date',
        'end_date',
        'published_start_date',
        'published_end_date',
        'category',
        'booth_capacity',
        'tenant_capacity',
        'booth_size',
        'banner',
        'insurance_active',
        'booth_price',
        'contact_for_price',
        'estimated_visitors',
        'payment_method',
        'status',
    ];

    protected $casts = [
        'insurance_active' => 'boolean',
        'contact_for_price' => 'boolean',
    ];
    protected $appends = ['banner_url'];

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

    public function bankAccounts()
    {
        return $this->hasMany(EventBankAccount::class);
    }

    public function getBannerUrlAttribute()
    {
        if (!$this->banner) {
            return null;
        }
        try {
            // Use default disk (can be 'public' or 's3' based on FILESYSTEM_DISK env)
            $disk = config('filesystems.default', 'public');
            return Storage::disk($disk)->url($this->banner);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
