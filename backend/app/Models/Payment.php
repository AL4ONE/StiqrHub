<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'registration_id',
        'qris_reference',
        'amount',
        'status'
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }
}
