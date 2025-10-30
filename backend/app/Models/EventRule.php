<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventRule extends Model
{
    protected $fillable = ['event_id', 'rule_name', 'is_mandatory'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
