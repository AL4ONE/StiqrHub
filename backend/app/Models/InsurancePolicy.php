<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InsurancePolicy extends Model
{
    protected $fillable = ['event_id', 'insurer_id', 'policy_number', 'premium_amount'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function insurer()
    {
        return $this->belongsTo(User::class, 'insurer_id');
    }

    public function claims()
    {
        return $this->hasMany(Claim::class);
    }
}
