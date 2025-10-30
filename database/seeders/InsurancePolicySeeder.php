<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InsurancePolicy;
use App\Models\Event;
use App\Models\User;

class InsurancePolicySeeder extends Seeder
{
    public function run(): void
    {
        $insurer = User::where('role', 'INSURER')->first();

        if (!$insurer) {
            $insurer = User::create([
                'name' => 'Insurance Company',
                'email' => 'insurer@stiqrhub.com',
                'password' => bcrypt('password123'),
                'role' => 'INSURER',
            ]);
        }

        $events = Event::where('insurance_active', true)->get();

        foreach ($events as $event) {
            InsurancePolicy::create([
                'event_id' => $event->id,
                'insurer_id' => $insurer->id,
                'policy_number' => 'POL-' . $event->id . '-' . date('Ymd'),
                'premium_amount' => 10000,
            ]);
        }
    }
}
