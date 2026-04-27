<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\AssessmentSession;
use Carbon\Carbon;

class AssessmentController extends Controller
{
    public function generateExam(Request $request)
    {
      
        $questions = Question::with('options')
            ->inRandomOrder()
            ->limit(10) 
            ->get();

      
        $session = AssessmentSession::create([
            'user_id' => 1, 
            'started_at' => Carbon::now(),
            'expires_at' => Carbon::now()->addMinutes(30), 
            'status' => 'in_progress'
        ]);

        return response()->json([
            'message' => 'Exam started successfully',
            'session_id' => $session->id,
            'duration_minutes' => 30,
            'questions' => $questions
        ]);
    }
    public function submitAnswer(Request $request)
{
  
    $questionId = $request->question_id;
    $optionId = $request->option_id;
    $sessionId = $request->session_id;

    
    $isCorrect = \App\Models\Option::where('id', $optionId)
        ->where('question_id', $questionId)
        ->where('is_correct', true)
        ->exists();

    
    $session = AssessmentSession::find($sessionId);
    
    if ($isCorrect) {
        $question = \App\Models\Question::find($questionId);
        $session->increment('total_score', $question->points);
    }

    return response()->json([
        'correct' => $isCorrect,
        'current_total_score' => $session->total_score,
        'message' => $isCorrect ? 'Well done!' : 'Wrong answer, keep trying!'
    ]);
}
}