<?php

namespace App\Observers;

use App\Models\Notification;
use App\Models\AuditLog;
use Illuminate\Support\Str;
use Carbon\Carbon;

class NotificationEscalator implements ObserverInterface
{
    // this method is called automatically when any subject fires an event
    public function update(string $eventType, array $data): void
    {
        match($eventType) {
            'ASSESSMENT_FLAGGED'           => $this->handleAssessmentFlagged($data),
            'FEEDBACK_REMINDER'            => $this->handleFeedbackReminder($data),
            'FEEDBACK_ESCALATION'          => $this->handleFeedbackEscalation($data),
            'SESSION_EXTENSION_REQUEST'    => $this->handleExtensionRequest($data),
            'SESSION_EXTENSION_APPROVED'   => $this->handleExtensionApproved($data),
            'SESSION_EXTENSION_REJECTED'   => $this->handleExtensionRejected($data),
            'STATUS_CHANGE'                => $this->handleStatusChange($data),
            'INTERVIEW_SCHEDULED'          => $this->handleInterviewScheduled($data),
            'RED_FLAG_RAISED'              => $this->handleRedFlag($data),
            default                        => null,
        };
    }

    // --- called when assessment proctoring violations exceed 3 ---
    private function handleAssessmentFlagged(array $data): void
    {
        // notify HR admins
        $this->sendNotification(
            userId: $data['hrId'],
            triggeredBy: $data['candidateId'],
            type: 'ASSESSMENT_FLAGGED',
            message: "Assessment flagged for candidate {$data['candidateName']}. 
                      Violations exceeded limit during assessment.",
            actionType: 'ASSESSMENT_FLAGGED',
            affectedRecord: $data['assessmentId'],
            affectedTable: 'assessments',
            details: "Proctor flags: {$data['proctorFlags']}"
        );
    }

    // --- called 24hrs after interview if feedback not submitted ---
    private function handleFeedbackReminder(array $data): void
    {
        $this->sendNotification(
            userId: $data['interviewerId'],
            triggeredBy: null,
            type: 'FEEDBACK_REMINDER',
            message: "Reminder: You have not submitted feedback for candidate 
                      {$data['candidateName']}. Please submit as soon as possible.",
            actionType: 'FEEDBACK_SUBMITTED',
            affectedRecord: $data['interviewId'],
            affectedTable: 'interviews',
            details: "Feedback deadline exceeded 24 hours"
        );
    }

    // --- called 48hrs after interview if feedback still not submitted ---
    private function handleFeedbackEscalation(array $data): void
    {
        // notify HR that interviewer hasn't submitted
        $this->sendNotification(
            userId: $data['hrId'],
            triggeredBy: $data['interviewerId'],
            type: 'FEEDBACK_ESCALATION',
            message: "Escalation: Interviewer {$data['interviewerName']} has not submitted 
                      feedback for candidate {$data['candidateName']} after 48 hours.",
            actionType: 'FEEDBACK_SUBMITTED',
            affectedRecord: $data['interviewId'],
            affectedTable: 'interviews',
            details: "Feedback deadline exceeded 48 hours — escalated to HR"
        );
    }

    // --- called when interviewer requests session extension ---
    private function handleExtensionRequest(array $data): void
    {
        $this->sendNotification(
            userId: $data['hrId'],
            triggeredBy: $data['interviewerId'],
            type: 'SESSION_EXTENSION_REQUEST',
            message: "Interviewer {$data['interviewerName']} has requested a session 
                      extension of {$data['extraMinutes']} minutes. Reason: {$data['reason']}",
            actionType: 'SESSION_EXTENSION_REQUESTED',
            affectedRecord: $data['interviewId'],
            affectedTable: 'interviews',
            details: "Requested extra minutes: {$data['extraMinutes']}"
        );
    }

    // --- called when HR approves the extension ---
    private function handleExtensionApproved(array $data): void
    {
        $this->sendNotification(
            userId: $data['interviewerId'],
            triggeredBy: $data['hrId'],
            type: 'SESSION_EXTENSION_APPROVED',
            message: "Your session extension request has been approved. 
                      {$data['extraMinutes']} minutes have been added to the session.",
            actionType: 'SESSION_EXTENSION_APPROVED',
            affectedRecord: $data['interviewId'],
            affectedTable: 'interviews',
            details: "Approved extra minutes: {$data['extraMinutes']}"
        );
    }

    // --- called when HR rejects the extension ---
    private function handleExtensionRejected(array $data): void
    {
        $this->sendNotification(
            userId: $data['interviewerId'],
            triggeredBy: $data['hrId'],
            type: 'SESSION_EXTENSION_REJECTED',
            message: "Your session extension request has been rejected. 
                      The session will end at the original scheduled time.",
            actionType: 'SESSION_EXTENSION_REJECTED',
            affectedRecord: $data['interviewId'],
            affectedTable: 'interviews',
            details: "Extension rejected by HR"
        );
    }

    // --- called when candidate moves to a new pipeline stage ---
    private function handleStatusChange(array $data): void
    {
        $this->sendNotification(
            userId: $data['candidateUserId'],
            triggeredBy: $data['hrId'],
            type: 'STATUS_CHANGE',
            message: "Your application status has been updated from 
                      {$data['previousStatus']} to {$data['newStatus']}.",
            actionType: 'CANDIDATE_STAGE_CHANGED',
            affectedRecord: $data['applicationId'],
            affectedTable: 'applications',
            details: "Previous: {$data['previousStatus']} → New: {$data['newStatus']}"
        );
    }

    // --- called when a new interview is scheduled ---
    private function handleInterviewScheduled(array $data): void
    {
        // notify candidate
        $this->sendNotification(
            userId: $data['candidateUserId'],
            triggeredBy: $data['hrId'],
            type: 'INTERVIEW_SCHEDULED',
            message: "Your interview has been scheduled on {$data['scheduledAt']}. 
                      Meeting link: {$data['meetingLink']}",
            actionType: 'INTERVIEW_SCHEDULED',
            affectedRecord: $data['interviewId'],
            affectedTable: 'interviews',
            details: "Interview scheduled at {$data['scheduledAt']}"
        );

        // also notify interviewer
        $this->sendNotification(
            userId: $data['interviewerUserId'],
            triggeredBy: $data['hrId'],
            type: 'INTERVIEW_SCHEDULED',
            message: "You have been assigned an interview on {$data['scheduledAt']}. 
                      Meeting link: {$data['meetingLink']}",
            actionType: 'INTERVIEW_SCHEDULED',
            affectedRecord: $data['interviewId'],
            affectedTable: 'interviews',
            details: "Interview scheduled at {$data['scheduledAt']}"
        );
    }

    // --- called when interviewer raises a red flag on a candidate ---
    private function handleRedFlag(array $data): void
    {
        $this->sendNotification(
            userId: $data['hrId'],
            triggeredBy: $data['interviewerId'],
            type: 'RED_FLAG_RAISED',
            message: "Red flag raised for candidate {$data['candidateName']}. 
                      Reason: {$data['reason']}",
            actionType: 'RED_FLAG_RAISED',
            affectedRecord: $data['applicationId'],
            affectedTable: 'applications',
            details: "Flag type: {$data['flagType']}"
        );
    }

    // --- shared helper: saves notification + audit log ---
    private function sendNotification(
        string $userId,
        ?string $triggeredBy,
        string $type,
        string $message,
        string $actionType,
        ?string $affectedRecord,
        ?string $affectedTable,
        ?string $details
    ): void {
        // save notification to DB
        Notification::create([
            'notificationId' => Str::uuid(),
            'userId'         => $userId,
            'triggeredBy'    => $triggeredBy,
            'type'           => $type,
            'message'        => $message,
            'is_read'        => false,
        ]);

        // log it in audit trail
        AuditLog::create([
            'logId'          => Str::uuid(),
            'userId'         => $triggeredBy,
            'actionType'     => $actionType,
            'affectedRecord' => $affectedRecord,
            'affectedTable'  => $affectedTable,
            'previousValue'  => null,
            'newValue'       => null,
            'details'        => $details,
        ]);
    }
}