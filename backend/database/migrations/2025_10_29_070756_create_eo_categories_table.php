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
        Schema::create('eo_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('eo_id')->constrained('users')->onDelete('cascade');
            $table->enum('category', ['F&B', 'Fashion', 'Automotive', 'Art & Craft', 'Snack & Beverage', 'Wellness', 'Others']);
            $table->timestamps();

            $table->unique(['eo_id', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eo_categories');
    }
};
