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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('eo_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->text('location');
            $table->string('map_link')->nullable();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->enum('category', ['F&B', 'Fashion', 'Automotive', 'Art & Craft', 'Snack & Beverage', 'Wellness', 'Others']);
            $table->integer('booth_capacity');
            $table->string('booth_size')->nullable();
            $table->string('banner')->nullable();
            $table->boolean('insurance_active')->default(false);
            $table->decimal('booth_price', 12, 2)->default(0);
            $table->integer('estimated_visitors')->nullable();
            $table->enum('payment_method', ['per_day', 'per_event'])->default('per_event');
            $table->enum('status', ['DRAFT', 'ACTIVE', 'PUBLISHED'])->default('DRAFT');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
