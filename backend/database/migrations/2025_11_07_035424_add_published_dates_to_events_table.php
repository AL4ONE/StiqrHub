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
        Schema::table('events', function (Blueprint $table) {
            $table->dateTime('published_start_date')->nullable();
            $table->dateTime('published_end_date')->nullable();
        });

        // Update status constraint/enum: change ACTIVE to ACTIVATED
        // Handle different database drivers
        $driver = DB::getDriverName();
        
        if ($driver === 'pgsql') {
            // PostgreSQL: Either enum or check constraint may be used. Handle both safely.
            // 1) Try enum path
            $result = DB::select("
                SELECT pg_type.typname 
                FROM pg_type 
                JOIN pg_attribute ON pg_attribute.atttypid = pg_type.oid 
                JOIN pg_class ON pg_class.oid = pg_attribute.attrelid 
                WHERE pg_class.relname = 'events' 
                AND pg_attribute.attname = 'status' 
                AND pg_type.typtype = 'e'
                LIMIT 1
            ");

            if (!empty($result)) {
                $oldTypeName = $result[0]->typname;
                $newTypeName = $oldTypeName . '_new';
                DB::statement("CREATE TYPE {$newTypeName} AS ENUM('DRAFT', 'ACTIVATED', 'PUBLISHED')");
                DB::statement("ALTER TABLE events ALTER COLUMN status TYPE {$newTypeName} USING status::text::{$newTypeName}");
                DB::statement("ALTER TABLE events ALTER COLUMN status SET DEFAULT 'DRAFT'");
                DB::statement("DROP TYPE {$oldTypeName}");
                DB::statement("ALTER TYPE {$newTypeName} RENAME TO {$oldTypeName}");
                // after enum expanded, convert data
                DB::statement("UPDATE events SET status = 'ACTIVATED' WHERE status = 'ACTIVE'");
            } else {
                // 2) Fallback: CHECK constraint path
                // Drop existing constraint if exists
                DB::statement("DO $$
                BEGIN
                  IF EXISTS (
                    SELECT 1 FROM pg_constraint c
                    JOIN pg_class t ON c.conrelid = t.oid
                    WHERE c.conname = 'events_status_check' AND t.relname = 'events'
                  ) THEN
                    ALTER TABLE events DROP CONSTRAINT events_status_check;
                  END IF;
                END $$;");
                // Add temporary relaxed constraint allowing ACTIVE and ACTIVATED
                DB::statement("ALTER TABLE events ADD CONSTRAINT events_status_check CHECK (status IN ('DRAFT','ACTIVE','ACTIVATED','PUBLISHED'))");
                // Update data
                DB::statement("UPDATE events SET status = 'ACTIVATED' WHERE status = 'ACTIVE'");
                // Replace constraint without ACTIVE
                DB::statement("ALTER TABLE events DROP CONSTRAINT events_status_check");
                DB::statement("ALTER TABLE events ADD CONSTRAINT events_status_check CHECK (status IN ('DRAFT','ACTIVATED','PUBLISHED'))");
                DB::statement("ALTER TABLE events ALTER COLUMN status SET DEFAULT 'DRAFT'");
            }
        } elseif ($driver === 'mysql' || $driver === 'mariadb') {
            // MySQL/MariaDB
            DB::statement("ALTER TABLE events MODIFY COLUMN status ENUM('DRAFT', 'ACTIVATED', 'PUBLISHED') DEFAULT 'DRAFT'");
            DB::statement("UPDATE events SET status = 'ACTIVATED' WHERE status = 'ACTIVE'");
        } else {
            // For other databases, just update the data
            DB::statement("UPDATE events SET status = 'ACTIVATED' WHERE status = 'ACTIVE'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert status enum back to ACTIVE
        $driver = DB::getDriverName();
        
        if ($driver === 'pgsql') {
            // PostgreSQL: Revert to allow ACTIVE again
            // Try enum path first
            $result = DB::select("
                SELECT pg_type.typname 
                FROM pg_type 
                JOIN pg_attribute ON pg_attribute.atttypid = pg_type.oid 
                JOIN pg_class ON pg_class.oid = pg_attribute.attrelid 
                WHERE pg_class.relname = 'events' 
                AND pg_attribute.attname = 'status' 
                AND pg_type.typtype = 'e'
                LIMIT 1
            ");

            if (!empty($result)) {
                // Convert data first
                DB::statement("UPDATE events SET status = 'ACTIVE' WHERE status = 'ACTIVATED'");
                $oldTypeName = $result[0]->typname;
                $newTypeName = $oldTypeName . '_new';
                DB::statement("CREATE TYPE {$newTypeName} AS ENUM('DRAFT', 'ACTIVE', 'PUBLISHED')");
                DB::statement("ALTER TABLE events ALTER COLUMN status TYPE {$newTypeName} USING status::text::{$newTypeName}");
                DB::statement("ALTER TABLE events ALTER COLUMN status SET DEFAULT 'DRAFT'");
                DB::statement("DROP TYPE {$oldTypeName}");
                DB::statement("ALTER TYPE {$newTypeName} RENAME TO {$oldTypeName}");
            } else {
                // CHECK constraint path
                // Drop if exists then add with ACTIVE allowed
                DB::statement("DO $$
                BEGIN
                  IF EXISTS (
                    SELECT 1 FROM pg_constraint c
                    JOIN pg_class t ON c.conrelid = t.oid
                    WHERE c.conname = 'events_status_check' AND t.relname = 'events'
                  ) THEN
                    ALTER TABLE events DROP CONSTRAINT events_status_check;
                  END IF;
                END $$;");
                DB::statement("ALTER TABLE events ADD CONSTRAINT events_status_check CHECK (status IN ('DRAFT','ACTIVE','PUBLISHED'))");
                DB::statement("UPDATE events SET status = 'ACTIVE' WHERE status = 'ACTIVATED'");
                DB::statement("ALTER TABLE events ALTER COLUMN status SET DEFAULT 'DRAFT'");
            }
        } elseif ($driver === 'mysql' || $driver === 'mariadb') {
            // MySQL/MariaDB
            DB::statement("UPDATE events SET status = 'ACTIVE' WHERE status = 'ACTIVATED'");
            DB::statement("ALTER TABLE events MODIFY COLUMN status ENUM('DRAFT', 'ACTIVE', 'PUBLISHED') DEFAULT 'DRAFT'");
        } else {
            DB::statement("UPDATE events SET status = 'ACTIVE' WHERE status = 'ACTIVATED'");
        }

        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['published_start_date', 'published_end_date']);
        });
    }
};
