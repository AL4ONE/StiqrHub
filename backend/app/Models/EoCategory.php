<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EoCategory extends Model
{
    protected $fillable = ['eo_id', 'category'];

    public function eo()
    {
        return $this->belongsTo(User::class, 'eo_id');
    }
}
