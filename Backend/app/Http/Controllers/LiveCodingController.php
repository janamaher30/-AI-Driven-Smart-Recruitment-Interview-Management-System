<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Services\AuditLogger;
use App\Services\EventService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LiveCodingController extends Controller
{
    private AuditLogger $auditLogger;
    private EventService $eventService;

    public function __construct()
    {
        $this->auditLogger = AuditLogger::getInstance();
        $this->eventService = EventService::getInstance();
    }

    // --- called when interviewer starts the live coding session ---
    public function startSession(Request $request)
    {
        $request->validate([
            'interviewId'      => 'required|string',
            'interviewerId'    => 'required|string',
            'candidateUserId'  => 'required|string',
            'interviewerUserId'=> 'required|string',
            'hrId'             => 'required|string',
            'scheduledAt'      => 'required|string',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)
                              ->where('status', 'SCHEDULED')
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview session not found or already started'
            ], 404);
        }

        // generate a unique meeting link for the session
        $meetingLink = 'https://recruitment-system/live/' . Str::uuid();
        $interview->meeting_link = $meetingLink;
        $interview->save();

        // log in audit trail
        $this->auditLogger->logInterviewScheduled(
            $request->interviewerId,
            $request->interviewId,
            $request->scheduledAt
        );

        // notify both candidate and interviewer via Observer pattern
        $this->eventService->fireInterviewScheduled([
            'interviewId'      => $request->interviewId,
            'candidateUserId'  => $request->candidateUserId,
            'interviewerUserId'=> $request->interviewerUserId,
            'hrId'             => $request->hrId,
            'scheduledAt'      => $request->scheduledAt,
            'meetingLink'      => $meetingLink,
        ]);

        return response()->json([
            'message'     => 'Live coding session started successfully',
            'interviewId' => $request->interviewId,
            'meetingLink' => $meetingLink,
            'sessionId'   => Str::uuid(),
        ], 200);
    }

    // --- called when participant joins the live coding session ---
    public function joinSession(Request $request)
    {
        $request->validate([
            'interviewId' => 'required|string',
            'userId'      => 'required|string',
            'role'        => 'required|in:CANDIDATE,INTERVIEWER,SHADOW',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview session not found'
            ], 404);
        }

        // log who joined the session
        $this->auditLogger->logAction(
            userId: $request->userId,
            actionType: 'INTERVIEW_SCHEDULED',
            affectedRecord: $request->interviewId,
            affectedTable: 'interviews',
            details: "User joined live coding session as {$request->role}"
        );

        return response()->json([
            'message'     => 'Joined live coding session successfully',
            'interviewId' => $request->interviewId,
            'meetingLink' => $interview->meeting_link,
            'role'        => $request->role,
            'joinedAt'    => Carbon::now(),
        ], 200);
    }

    // --- called every time code changes in the shared editor ---
    // simulates the observer pattern real-time sync
    public function syncCode(Request $request)
    {
        $request->validate([
            'interviewId' => 'required|string',
            'userId'      => 'required|string',
            'code'        => 'required|string',
            'language'    => 'required|string',
            'changeType'  => 'required|in:INSERT,DELETE,REPLACE',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview session not found'
            ], 404);
        }

        // log the code change in audit trail for version history
        $this->auditLogger->logAction(
            userId: $request->userId,
            actionType: 'INTERVIEW_COMPLETED',
            affectedRecord: $request->interviewId,
            affectedTable: 'interviews',
            previousValue: null,
            newValue: substr($request->code, 0, 500), // store first 500 chars
            details: "Code sync — language: {$request->language}, change: {$request->changeType}"
        );

        return response()->json([
            'message'     => 'Code synced successfully',
            'interviewId' => $request->interviewId,
            'syncedAt'    => Carbon::now(),
            'language'    => $request->language,
            // in a real system this would be broadcast to all observers
            // via WebSockets — simulated here as a REST response
            'broadcastTo' => 'all_session_participants',
        ], 200);
    }

    // --- called when interviewer submits feedback after session ---
    public function submitFeedback(Request $request)
    {
        $request->validate([
            'interviewId'  => 'required|string',
            'interviewerId'=> 'required|string',
            'score'        => 'required|integer|min:0|max:100',
            'feedback'     => 'required|string|max:1000',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview not found'
            ], 404);
        }

        // save feedback and score
        $interview->feedback = $request->feedback;
        $interview->score    = $request->score;
        $interview->status   = 'COMPLETED';
        $interview->save();

        // log feedback submission in audit trail
        $this->auditLogger->logFeedbackSubmitted(
            $request->interviewerId,
            $request->interviewId,
            $request->score
        );

        return response()->json([
            'message'     => 'Feedback submitted successfully',
            'interviewId' => $request->interviewId,
            'score'       => $request->score,
            'status'      => 'COMPLETED',
        ], 200);
    }

    // --- called to get full session details including code history ---
    public function getSessionDetails(Request $request)
    {
        $request->validate([
            'interviewId' => 'required|string',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview not found'
            ], 404);
        }

        // get code change history from audit logs
        $codeHistory = \App\Models\AuditLog::where('affectedRecord', $request->interviewId)
                                           ->where('affectedTable', 'interviews')
                                           ->orderBy('created_at', 'asc')
                                           ->get();

        return response()->json([
            'interview'   => $interview,
            'codeHistory' => $codeHistory,
        ], 200);
    }
}