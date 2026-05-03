<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
public function up(): void
{
    Schema::create('job_postings', function (Blueprint $table) {
        $table->id(); 
        $table->string('job_title');
        $table->text('job_description');
        $table->decimal('salary', 10, 2);
        $table->json('skill_weights')->nullable(); 
        $table->timestamps();
    });
}


    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
