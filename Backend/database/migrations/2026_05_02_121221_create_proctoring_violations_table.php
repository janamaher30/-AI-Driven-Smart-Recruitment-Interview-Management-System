<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proctoring_violations', function (Blueprint $table) {
            $table->string('violationId', 36)->primary();
            $table->string('assessmentId', 36); // references assessments table
            $table->string('candidateId', 36);  // references candidates table
            $table->enum('type', ['FOCUS_LOSS', 'TAB_SWITCH', 'WINDOW_LEAVE']);
            $table->integer('duration_seconds')->default(0);
            $table->integer('violation_count')->default(1);
            $table->boolean('is_flagged')->default(false);
            $table->dateTime('occurred_at');
            $table->timestamps();
            // foreign key to assessments will be added after
            // all migrations are run together as a team
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proctoring_violations');
    }
};