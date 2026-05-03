<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('assessment_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamp('started_at');
            $table->timestamp('expires_at')->nullable();
            $table->integer('total_score')->default(0);
            $table->string('status')->default('in_progress');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('assessment_sessions');
    }
};