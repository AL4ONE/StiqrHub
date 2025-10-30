<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = ['tenant_id', 'event_id', 'start_date', 'end_date', 'days_booked', 'status'];

    public function tenant()
    {
        return $this->belongsTo(User::class, 'tenant_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
