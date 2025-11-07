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

        // Update existing ACTIVE records to ACTIVATED first
        DB::statement("UPDATE events SET status = 'ACTIVATED' WHERE status = 'ACTIVE'");

        // Update status enum: change ACTIVE to ACTIVATED
        // Handle different database drivers
        $driver = DB::getDriverName();
        
        if ($driver === 'pgsql') {
            // PostgreSQL: Need to recreate the enum type
            // First, get the actual enum type name
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
                
                // Create new enum type
                DB::statement("CREATE TYPE {$newTypeName} AS ENUM('DRAFT', 'ACTIVATED', 'PUBLISHED')");
                
                // Update column to use new type
                DB::statement("ALTER TABLE events ALTER COLUMN status TYPE {$newTypeName} USING status::text::{$newTypeName}");
                DB::statement("ALTER TABLE events ALTER COLUMN status SET DEFAULT 'DRAFT'");
                
                // Drop old type and rename new type
                DB::statement("DROP TYPE {$oldTypeName}");
                DB::statement("ALTER TYPE {$newTypeName} RENAME TO {$oldTypeName}");
            }
        } elseif ($driver === 'mysql' || $driver === 'mariadb') {
            // MySQL/MariaDB
            DB::statement("ALTER TABLE events MODIFY COLUMN status ENUM('DRAFT', 'ACTIVATED', 'PUBLISHED') DEFAULT 'DRAFT'");
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
            // PostgreSQL: Revert enum type
            DB::statement("UPDATE events SET status = 'ACTIVE' WHERE status = 'ACTIVATED'");
            
            // Get the actual enum type name
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
                
                // Create new enum type with old values
                DB::statement("CREATE TYPE {$newTypeName} AS ENUM('DRAFT', 'ACTIVE', 'PUBLISHED')");
                
                // Update column to use new type
                DB::statement("ALTER TABLE events ALTER COLUMN status TYPE {$newTypeName} USING status::text::{$newTypeName}");
                DB::statement("ALTER TABLE events ALTER COLUMN status SET DEFAULT 'DRAFT'");
                
                // Drop old type and rename new type
                DB::statement("DROP TYPE {$oldTypeName}");
                DB::statement("ALTER TYPE {$newTypeName} RENAME TO {$oldTypeName}");
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
