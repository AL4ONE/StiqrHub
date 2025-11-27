<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payout extends Model
{
    protected $fillable = ['event_id', 'total_amount', 'payout_date', 'status'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
