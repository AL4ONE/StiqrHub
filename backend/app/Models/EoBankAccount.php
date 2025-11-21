<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EoBankAccount extends Model
{
    protected $fillable = [
        'eo_id',
        'bank_name',
        'account_name',
        'account_number',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function eo()
    {
        return $this->belongsTo(User::class, 'eo_id');
    }
}

