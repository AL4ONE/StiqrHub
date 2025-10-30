<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Event;
use App\Models\Registration;
use App\Models\Payment;
use App\Models\InsurancePolicy;
use App\Models\Claim;

class StiqrSeeder extends Seeder
{
    public function run(): void
    {
        $eo = User::create([
            'name' => 'EO Alpha',
            'email' => 'eo@stiqrhub.com',
            'password' => Hash::make('password'),
            'role' => 'EO',
            'is_active' => true,
        ]);
        $admin = User::create([
            'name' => 'Admin StiqrHub',
            'email' => 'admin@stiqrhub.com',
            'password' => Hash::make('password'),
            'role' => 'ADMIN',
            'is_active' => true,
        ]);
        $insurer = User::create([
            'name' => 'insurer Alpha',
            'email' => 'insurer@stiqrhub.com',
            'password' => Hash::make('password'),
            'role' => 'INSURER',
            'is_active' => true,
        ]);

        $tenant1 = User::create([
            'name' => 'Tenant Kopi Kuy',
            'email' => 'tenant1@stiqrhub.com',
            'password' => Hash::make('password'),
            'role' => 'TENANT',
            'is_active' => true,
        ]);

        $tenant2 = User::create([
            'name' => 'Tenant Baju Lokal',
            'email' => 'tenant2@stiqrhub.com',
            'password' => Hash::make('password'),
            'role' => 'TENANT',
            'is_active' => true,
        ]);

        $event = Event::create([
            'eo_id' => $eo->id,
            'name' => 'Festival UMKM Jakarta',
            'location' => 'JCC Senayan, Jakarta',
            'map_link' => 'https://maps.google.com/?q=JCC+Senayan',
            'start_date' => now()->addDays(5),
            'end_date' => now()->addDays(7),
            'category' => 'F&B',
            'booth_capacity' => 50,
            'booth_size' => '3x3m',
            'banner' => 'banner_festival.jpg',
            'insurance_active' => true,
            'booth_price' => 250000,
            'estimated_visitors' => 2000,
            'payment_method' => 'per_event',
            'status' => 'ACTIVE',
        ]);

        $reg1 = Registration::create([
            'tenant_id' => $tenant1->id,
            'event_id' => $event->id,
            'status' => 'PAID',
        ]);

        $reg2 = Registration::create([
            'tenant_id' => $tenant2->id,
            'event_id' => $event->id,
            'status' => 'REGISTERED',
        ]);

        Payment::create([
            'registration_id' => $reg1->id,
            'qris_reference' => 'STQR123456789',
            'amount' => 255000,
            'status' => 'SUCCESS',
        ]);

        // Create an insurance policy for the event (owned by the insurer)
        $policy = InsurancePolicy::create([
            'event_id' => $event->id,
            'insurer_id' => $insurer->id,
            'policy_number' => 'POL-' . $event->id . '-' . now()->format('Ymd'),
            'premium_amount' => 10000,
        ]);

        // Seed one sample claim from tenant1 so insurer can see it
        Claim::create([
            'tenant_id' => $tenant1->id,
            'insurance_policy_id' => $policy->id,
            'description' => 'Kerusakan booth akibat hujan deras, butuh kompensasi.',
            'claim_amount' => 500000,
            'document_path' => 'claims/sample.pdf',
            'status' => 'REQUEST_CLAIM',
        ]);

        $this->command->info('✅ Seeder selesai — EO, Tenant, Event, Registrations, Policy, dan 1 Claim siap!');
    }
}
