<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Assessment;
use App\Models\Interview;
use App\Models\Job;
use App\Models\JobPost;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class FrontendApiController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'role' => 'nullable|string',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($request->filled('role') && strtolower((string) $user->role) !== strtolower((string) $request->role)) {
            return response()->json(['message' => 'Role mismatch for this account'], 403);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'userId' => $user->userId,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $user->createToken('frontend-session')->plainTextToken,
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string',
        ]);

        $user = User::create([
            'userId' => (string) Str::uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'Account created successfully',
            'user' => [
                'id' => $user->id,
                'userId' => $user->userId,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 201);
    }

    public function jobs()
    {
        $jobs = JobPost::query()->latest()->get();

        if ($jobs->isEmpty()) {
            $jobs = Job::query()->latest()->get();
        }

        return response()->json([
            'jobs' => $jobs,
        ]);
    }

    public function interviews(Request $request)
    {
        $query = Interview::query()->latest();

        if ($request->filled('interviewId')) {
            $query->where('interviewId', $request->interviewId);
        }

        return response()->json([
            'interviews' => $query->get(),
        ]);
    }

    public function rescheduleInterview(Request $request)
    {
        $request->validate([
            'interviewId' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)->first();
        if (!$interview) {
            return response()->json(['message' => 'Interview not found'], 404);
        }

        if (Schema::hasColumn('interviews', 'scheduled_at')) {
            $interview->scheduled_at = $request->date . ' ' . $request->time;
        }
        if (Schema::hasColumn('interviews', 'date')) {
            $interview->date = $request->date;
        }
        if (Schema::hasColumn('interviews', 'time')) {
            $interview->time = $request->time;
        }

        $interview->save();

        return response()->json([
            'message' => 'Interview rescheduled successfully',
            'interview' => $interview,
        ]);
    }

    public function candidateDashboard(Request $request)
    {
        $candidateId = $request->query('candidateId');

        $notifications = collect();
        if ($request->filled('userId')) {
            $notifications = Notification::where('userId', $request->query('userId'))
                ->latest()
                ->get();
        }

        $applications = $candidateId ? Application::where('user_id', $candidateId)->latest()->get() : collect();
        $assessments = $candidateId ? Assessment::where('candidateId', $candidateId)->latest()->get() : collect();

        return response()->json([
            'applications' => $applications,
            'assessments' => $assessments,
            'notifications' => $notifications,
            'stats' => [
                'applied' => $applications->count(),
                'interviews' => Interview::query()->count(),
                'assessments' => $assessments->count(),
                'offers' => 0,
            ],
        ]);
    }

    public function interviewerDashboard(Request $request)
    {
        $interviewerId = $request->query('interviewerId');
        $interviews = Interview::query()->latest()->get();
        $feedback = $interviews->filter(function ($interview) {
            return !empty($interview->feedback);
        })->values();

        return response()->json([
            'interviewerId' => $interviewerId,
            'interviews' => $interviews,
            'feedback' => $feedback,
        ]);
    }

    public function candidatesPipeline()
    {
        $candidates = User::whereRaw('LOWER(role) = ?', ['candidate'])->latest()->get();

        return response()->json([
            'candidates' => $candidates,
        ]);
    }
}
