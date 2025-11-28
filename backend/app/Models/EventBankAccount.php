<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventBankAccount extends Model
{
    protected $fillable = [
        'event_id',
        'account_number',
        'account_name',
        'bank_name',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
