<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\Option;

class QuestionSeeder extends Seeder
{
    public function run()
    {
      
        $q1 = Question::create([
            'content' => 'What does PHP stand for?',
            'type' => 'mcq',
            'difficulty' => 'easy',
            'category' => 'Backend',
            'points' => 5
        ]);

        Option::create(['question_id' => $q1->id, 'option_text' => 'Hypertext Preprocessor', 'is_correct' => true]);
        Option::create(['question_id' => $q1->id, 'option_text' => 'Preprocessed Hypertext', 'is_correct' => false]);

  
        $q2 = Question::create([
            'content' => 'Laravel is a Javascript Framework.',
            'type' => 'true_false',
            'difficulty' => 'easy',
            'category' => 'Backend',
            'points' => 5
        ]);

        Option::create(['question_id' => $q2->id, 'option_text' => 'True', 'is_correct' => false]);
        Option::create(['question_id' => $q2->id, 'option_text' => 'False', 'is_correct' => true]);
    }
}