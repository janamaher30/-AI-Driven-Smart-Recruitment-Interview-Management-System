<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\AssessmentSession; // تأكد أن اسم الموديل يطابق جدولك
use App\Models\Option;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AssessmentController extends Controller
{
    public function start()
    {
        try {
            // 1. جلب الأسئلة
            $questions = Question::with('options')
                ->inRandomOrder()
                ->limit(10)
                ->get();

            // 2. إنشاء الجلسة - استخدمنا create وحطينا الداتا اللي الجدول محتاجها
            // تأكد أن الموديل AssessmentSession فيه fillable للأعمدة دي
            $session = AssessmentSession::create([
                'user_id' => Auth::id() ?? 1, // لو مش عامل login هنحط 1 للتجربة
                'started_at' => Carbon::now(),
                'expires_at' => Carbon::now()->addMinutes(30),
                'status' => 'in_progress',
                'total_score' => 0
            ]);

            // لو مسمعش في الداتا بيز السطر ده هيوقف الكود ويقولك ليه
            if (!$session) {
                throw new \Exception("Failed to create assessment session in database.");
            }

            return view('exam.show', compact('questions', 'session'));

        } catch (\Exception $e) {
            // هيطبع لك الغلط بالظبط في ملف storage/logs/laravel.log
            Log::error("Assessment Start Error: " . $e->getMessage());
            return response()->json(['error' => 'حدث خطأ أثناء بدء الامتحان: ' . $e->getMessage()], 500);
        }
    }

    public function submitAnswer(Request $request)
    {
        // التحقق من وصول البيانات
        $request->validate([
            'question_id' => 'required',
            'option_id' => 'required',
            'session_id' => 'required',
        ]);

        $isCorrect = Option::where('id', $request->option_id)
            ->where('question_id', $request->question_id)
            ->where('is_correct', true)
            ->exists();

        $session = AssessmentSession::find($request->session_id);

        if (!$session) {
            return response()->json(['message' => 'Session not found'], 404);
        }

        if ($isCorrect) {
            $question = Question::find($request->question_id);
            $points = $question->points ?? 1;
            $session->increment('total_score', $points);
        }

        if ($request->ajax()) {
            return response()->json([
                'correct' => $isCorrect,
                'current_total_score' => $session->total_score,
                'message' => $isCorrect ? 'Well done!' : 'Wrong answer!'
            ]);
        }

        return back();
    }
}