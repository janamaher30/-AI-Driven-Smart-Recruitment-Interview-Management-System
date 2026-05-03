<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->string('logId', 36)->primary();
            $table->string('userId', 36)->nullable();
            $table->enum('actionType', [
                'CANDIDATE_STAGE_CHANGED',
                'ASSESSMENT_STARTED',
                'ASSESSMENT_SUBMITTED',
                'ASSESSMENT_FLAGGED',
                'PROCTORING_VIOLATION',
                'INTERVIEW_SCHEDULED',
                'INTERVIEW_COMPLETED',
                'SESSION_EXTENSION_REQUESTED',
                'SESSION_EXTENSION_APPROVED',
                'SESSION_EXTENSION_REJECTED',
                'FEEDBACK_SUBMITTED',
                'OFFER_GENERATED',
                'OFFER_ACCEPTED',
                'OFFER_REJECTED',
                'RED_FLAG_RAISED',
                'NOTIFICATION_SENT'
            ]);
            $table->string('affectedRecord', 36)->nullable();
            $table->string('affectedTable', 100)->nullable();
            $table->text('previousValue')->nullable();
            $table->text('newValue')->nullable();
            $table->text('details')->nullable();
            $table->timestamps();
            // foreign key removed — will be linked to users
            // table when team merges all migrations together
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};