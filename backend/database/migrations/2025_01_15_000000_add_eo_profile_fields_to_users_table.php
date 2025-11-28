<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // EO Profile fields
            $table->string('eo_logo')->nullable()->after('is_active');
            $table->text('eo_description')->nullable()->after('eo_logo');
            $table->enum('eo_category', ['F&B', 'Umum', 'Fashion', 'Craft', 'Mixed Event Organizer'])->nullable()->after('eo_description');
            $table->year('eo_founded_year')->nullable()->after('eo_category');
            $table->string('eo_city')->nullable()->after('eo_founded_year');
            $table->string('eo_website')->nullable()->after('eo_city');
            $table->string('eo_instagram')->nullable()->after('eo_website');
            $table->string('eo_tiktok')->nullable()->after('eo_instagram');
            $table->string('eo_whatsapp')->nullable()->after('eo_tiktok');
            $table->string('eo_official_email')->nullable()->after('eo_whatsapp');
            $table->text('eo_address')->nullable()->after('eo_official_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'eo_logo',
                'eo_description',
                'eo_category',
                'eo_founded_year',
                'eo_city',
                'eo_website',
                'eo_instagram',
                'eo_tiktok',
                'eo_whatsapp',
                'eo_official_email',
                'eo_address',
            ]);
        });
    }
};




