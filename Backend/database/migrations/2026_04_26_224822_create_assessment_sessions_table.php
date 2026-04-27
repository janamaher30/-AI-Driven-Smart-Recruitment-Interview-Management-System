<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // الطالب اللي بيمتحن
            $table->integer('total_score')->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('expires_at')->nullable(); // وقت نهاية التايمر
            $table->enum('status', ['in_progress', 'completed', 'timed_out'])->default('in_progress');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assessment_sessions');
    }
};
