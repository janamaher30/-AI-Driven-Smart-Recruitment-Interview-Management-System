<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->string('notificationId', 36)->primary();
            $table->string('userId', 36);
            $table->string('triggeredBy', 36)->nullable();
            $table->enum('type', [
                'ASSESSMENT_FLAGGED',
                'FEEDBACK_REMINDER',
                'FEEDBACK_ESCALATION',
                'SESSION_EXTENSION_REQUEST',
                'SESSION_EXTENSION_APPROVED',
                'SESSION_EXTENSION_REJECTED',
                'STATUS_CHANGE',
                'INTERVIEW_SCHEDULED',
                'OFFER_SENT',
                'RED_FLAG_RAISED'
            ]);
            $table->string('message', 500);
            $table->boolean('is_read')->default(false);
            $table->timestamps();
            // foreign key removed — users table structure
            // will be finalized when team merges all migrations
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};