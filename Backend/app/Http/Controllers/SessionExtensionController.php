<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Services\AuditLogger;
use App\Services\EventService;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SessionExtensionController extends Controller
{
    private AuditLogger $auditLogger;
    private EventService $eventService;

    public function __construct()
    {
        $this->auditLogger = AuditLogger::getInstance();
        $this->eventService = EventService::getInstance();
    }

    // --- UC-37: Interviewer requests a session extension ---
    public function requestExtension(Request $request)
    {
        $request->validate([
            'interviewId'    => 'required|string',
            'interviewerId'  => 'required|string',
            'interviewerName'=> 'required|string',
            'extraMinutes'   => 'required|integer|min:1|max:60',
            'reason'         => 'required|string|max:500',
            'hrId'           => 'required|string',
        ]);

        // find the active interview session
        $interview = Interview::where('interviewId', $request->interviewId)
                              ->where('status', 'SCHEDULED')
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview session not found or not active'
            ], 404);
        }

        // log the extension request in audit trail
        $this->auditLogger->logSessionExtensionRequested(
            $request->interviewerId,
            $request->interviewId,
            $request->extraMinutes
        );

        // fire event — NotificationEscalator will notify HR via Observer pattern
        $this->eventService->fireExtensionRequest([
            'interviewId'     => $request->interviewId,
            'interviewerId'   => $request->interviewerId,
            'interviewerName' => $request->interviewerName,
            'extraMinutes'    => $request->extraMinutes,
            'reason'          => $request->reason,
            'hrId'            => $request->hrId,
        ]);

        return response()->json([
            'message'      => 'Extension request submitted successfully. Waiting for HR approval.',
            'interviewId'  => $request->interviewId,
            'extraMinutes' => $request->extraMinutes,
            'reason'       => $request->reason,
        ], 200);
    }

    // --- UC-31: HR approves the session extension ---
    public function approveExtension(Request $request)
    {
        $request->validate([
            'interviewId'    => 'required|string',
            'interviewerId'  => 'required|string',
            'interviewerName'=> 'required|string',
            'hrId'           => 'required|string',
            'extraMinutes'   => 'required|integer|min:1|max:60',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview not found'
            ], 404);
        }

        // extend the session duration
        $interview->duration = $interview->duration + $request->extraMinutes;
        $interview->save();

        // log approval in audit trail
        $this->auditLogger->logSessionExtensionApproved(
            $request->hrId,
            $request->interviewId,
            $request->extraMinutes
        );

        // fire event — NotificationEscalator will notify interviewer via Observer pattern
        $this->eventService->fireExtensionApproved([
            'interviewId'     => $request->interviewId,
            'interviewerId'   => $request->interviewerId,
            'interviewerName' => $request->interviewerName,
            'hrId'            => $request->hrId,
            'extraMinutes'    => $request->extraMinutes,
        ]);

        return response()->json([
            'message'         => 'Session extension approved successfully',
            'interviewId'     => $request->interviewId,
            'newDuration'     => $interview->duration,
            'extraMinutes'    => $request->extraMinutes,
        ], 200);
    }

    // --- UC-31: HR rejects the session extension ---
    public function rejectExtension(Request $request)
    {
        $request->validate([
            'interviewId'    => 'required|string',
            'interviewerId'  => 'required|string',
            'interviewerName'=> 'required|string',
            'hrId'           => 'required|string',
        ]);

        $interview = Interview::where('interviewId', $request->interviewId)
                              ->first();

        if (!$interview) {
            return response()->json([
                'message' => 'Interview not found'
            ], 404);
        }

        // log rejection in audit trail
        $this->auditLogger->logSessionExtensionRejected(
            $request->hrId,
            $request->interviewId
        );

        // fire event — NotificationEscalator will notify interviewer via Observer pattern
        $this->eventService->fireExtensionRejected([
            'interviewId'     => $request->interviewId,
            'interviewerId'   => $request->interviewerId,
            'interviewerName' => $request->interviewerName,
            'hrId'            => $request->hrId,
        ]);

        return response()->json([
            'message'     => 'Session extension rejected. Session will end at original time.',
            'interviewId' => $request->interviewId,
            'duration'    => $interview->duration,
        ], 200);
    }
}