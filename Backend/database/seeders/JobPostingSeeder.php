<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class JobPostingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\JobPosting::create([
            'job_title' => 'AI Engineer',
            'job_description' => 'Working on LLMs',
            'salary' => 80000,
        ]);

        \App\Models\JobPosting::create([
            'job_title' => 'Laravel Developer',
            'job_description' => 'Building recruitment portals',
            'salary' => 65000,
        ]);
    }
}

    

