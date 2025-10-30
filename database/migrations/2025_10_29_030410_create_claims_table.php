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
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('insurance_policy_id')->constrained('insurance_policies')->onDelete('cascade');
            $table->date('incident_date')->nullable();
            $table->text('description');
            $table->decimal('claim_amount', 12, 2)->nullable();
            $table->string('document_path')->nullable();
            $table->enum('status', ['REQUEST_CLAIM', 'APPROVED', 'REJECTED'])->default('REQUEST_CLAIM');
            $table->text('reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
