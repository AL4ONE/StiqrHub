<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Payment extends Model
{
    protected $fillable = [
        'registration_id',
        'qris_reference',
        'payment_proof_path',
        'amount',
        'status'
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function getPaymentProofUrlAttribute()
    {
        if (!$this->payment_proof_path) {
            return null;
        }

        $disk = config('filesystems.default', 'public');
        
        if ($disk === 's3') {
            return Storage::disk('s3')->url($this->payment_proof_path);
        }
        
        // For public storage, Storage::url() returns the correct URL
        if ($disk === 'public') {
            $url = Storage::disk('public')->url($this->payment_proof_path);
            // Ensure it starts with /storage/ for proper routing
            if (!str_starts_with($url, 'http')) {
                return $url;
            }
            return $url;
        }
        
        // For local (private) storage, return path that can be accessed via route
        // This would need a custom route to serve private files
        return '/storage/' . str_replace('app/public/', '', $this->payment_proof_path);
    }
}
