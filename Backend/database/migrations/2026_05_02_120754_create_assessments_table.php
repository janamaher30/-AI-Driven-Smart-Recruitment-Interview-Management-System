<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->string('assessmentId', 36)->primary();
            $table->string('candidateId', 36); // references candidates table
            $table->string('jobId', 36);        // references jobs table
            $table->integer('duration')->default(60);
            $table->float('score')->nullable();
            $table->enum('status', ['ACTIVE', 'COMPLETED', 'FLAGGED'])->default('ACTIVE');
            $table->dateTime('startTime')->nullable();
            $table->dateTime('endTime')->nullable();
            $table->integer('attempts')->default(0);
            $table->integer('proctorFlags')->default(0);
            $table->string('difficultyLevel', 20)->default('Medium');
            $table->timestamps();
            // foreign keys removed — candidates and jobs tables
            // are managed by teammates and will be linked later
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};