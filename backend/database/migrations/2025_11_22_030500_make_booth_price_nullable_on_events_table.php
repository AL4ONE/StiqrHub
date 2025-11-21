<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('ALTER TABLE events ALTER COLUMN booth_price DROP NOT NULL');
        DB::statement('ALTER TABLE events ALTER COLUMN booth_price DROP DEFAULT');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE events ALTER COLUMN booth_price SET DEFAULT 0');
        DB::statement('UPDATE events SET booth_price = 0 WHERE booth_price IS NULL');
        DB::statement('ALTER TABLE events ALTER COLUMN booth_price SET NOT NULL');
    }
};

