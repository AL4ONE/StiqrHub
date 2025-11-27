<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $driver = DB::getDriverName();
        
        if ($driver === 'pgsql') {
            // Drop existing check constraint if it exists
            DB::statement("
                ALTER TABLE events 
                DROP CONSTRAINT IF EXISTS events_status_check
            ");
            
            // The enum type should already be updated by previous migration
            // But if there's still a check constraint, we need to ensure enum type is correct
            // Get enum type name and check if it has ACTIVATED
            $enumResult = DB::select("
                SELECT pg_type.typname,
                       EXISTS (
                           SELECT 1 FROM pg_enum e
                           WHERE e.enumtypid = pg_type.oid
                           AND e.enumlabel = 'ACTIVATED'
                       ) as has_activated
                FROM pg_type 
                JOIN pg_attribute ON pg_attribute.atttypid = pg_type.oid 
                JOIN pg_class ON pg_class.oid = pg_attribute.attrelid 
                WHERE pg_class.relname = 'events' 
                AND pg_attribute.attname = 'status' 
                AND pg_type.typtype = 'e'
                LIMIT 1
            ");
            
            // If enum doesn't have ACTIVATED, we need to fix it
            if (!empty($enumResult) && !($enumResult[0]->has_activated ?? false)) {
                $oldTypeName = $enumResult[0]->typname;
                $newTypeName = $oldTypeName . '_new';
                
                // Update existing data first
                DB::statement("UPDATE events SET status = 'ACTIVATED' WHERE status = 'ACTIVE'");
                
                // Create new enum type
                DB::statement("CREATE TYPE {$newTypeName} AS ENUM('DRAFT', 'ACTIVATED', 'PUBLISHED')");
                
                // Update column to use new type
                DB::statement("ALTER TABLE events ALTER COLUMN status TYPE {$newTypeName} USING status::text::{$newTypeName}");
                DB::statement("ALTER TABLE events ALTER COLUMN status SET DEFAULT 'DRAFT'");
                
                // Drop old type and rename new type
                DB::statement("DROP TYPE IF EXISTS {$oldTypeName}");
                DB::statement("ALTER TYPE {$newTypeName} RENAME TO {$oldTypeName}");
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need to revert - this is a fix migration
    }
};
