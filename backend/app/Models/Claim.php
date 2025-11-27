<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    protected $fillable = [
        'tenant_id',
        'insurance_policy_id',
        'incident_date',
        'description',
        'claim_amount',
        'document_path',
        'status',
        'reason'
    ];

    public function tenant()
    {
        return $this->belongsTo(User::class, 'tenant_id');
    }

    public function insurancePolicy()
    {
        return $this->belongsTo(InsurancePolicy::class);
    }
}
