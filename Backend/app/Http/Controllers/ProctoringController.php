<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\ProctoringViolation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ProctoringController extends Controller
{
    // --- بدء جلسة امتحان جديدة ---
    public function startAssessment(Request $request)
    {
        // التحقق من البيانات
        $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'duration' => 'required|integer',
        ]);

        // إنشاء الجلسة في جدول الـ assessments
        $assessment = Assessment::create([
            'candidateId' => Auth::id(),
            'jobId' => $request->job_id,
            'status' => 'ACTIVE',
            'startTime' => Carbon::now(),
            'endTime' => Carbon::now()->addMinutes($request->duration),
            'proctorFlags' => 0,
        ]);

        return response()->json([
            'message' => 'Assessment started successfully',
            'assessmentId' => $assessment->id,
            'endTime' => $assessment->endTime,
        ], 201);
    }

    // --- تسجيل مخالفة (خروج من الصفحة) ---
    public function logViolation(Request $request)
    {
        // Validation بسيط عشان ميعلقش
        $request->validate([
            'assessmentId' => 'required',
            'type' => 'required|string', // TAB_SWITCH, FOCUS_LOSS...
        ]);

        // البحث عن الجلسة النشطة
        $assessment = Assessment::where('id', $request->assessmentId)
            ->where('candidateId', Auth::id())
            ->first();

        if (!$assessment) {
            return response()->json(['message' => 'Active session not found'], 404);
        }

        // زيادة عداد المخالفات
        $assessment->proctorFlags += 1;

        // لو زادت عن 3، علم على الامتحان إنه مشبوه
        $isFlagged = $assessment->proctorFlags >= 3;
        if ($isFlagged) {
            $assessment->status = 'FLAGGED';
        }
        $assessment->save();

        // حفظ المخالفة في جدول proctoring_violations
        // ملاحظة: تأكد من أسماء الأعمدة في الموديل عندك لتطابق الصورة
        $violation = ProctoringViolation::create([
            'assessmentid' => $request->assessmentId,
            'candidateid' => Auth::id(),
            'type' => $request->type,
            'duration_seconds' => $request->duration_seconds ?? 0,
            'violation_count' => $assessment->proctorFlags,
            'is_flagged' => $isFlagged,
            'occurred_at' => Carbon::now(),
        ]);

        return response()->json([
            'message' => $isFlagged ? 'Assessment FLAGGED' : 'Violation Logged',
            'proctorFlags' => $assessment->proctorFlags,
            'warning' => "تحذير {$assessment->proctorFlags}/3: التزم بصفحة الامتحان"
        ], 200);
    }

    // --- إنهاء الامتحان ---
    public function submitAssessment(Request $request)
    {
        $request->validate([
            'assessmentId' => 'required',
            'score' => 'required|numeric',
        ]);

        $assessment = Assessment::where('id', $request->assessmentId)
            ->where('candidateId', Auth::id())
            ->first();

        if (!$assessment) {
            return response()->json(['message' => 'Assessment not found'], 404);
        }

        $assessment->score = $request->score;
        $assessment->status = $assessment->status === 'FLAGGED' ? 'FLAGGED' : 'COMPLETED';
        $assessment->endTime = Carbon::now();
        $assessment->save();

        return response()->json(['message' => 'Submitted successfully', 'status' => $assessment->status], 200);
    }

    // --- عرض الامتحانات المشبوهة للأدمن ---
    public function getFlaggedAssessments()
    {
        $flagged = Assessment::where('status', 'FLAGGED')->get();
        return response()->json(['flagged' => $flagged], 200);
    }
}