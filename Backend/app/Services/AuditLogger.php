<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Support\Str;

class AuditLogger
{
    // the single instance
    private static ?AuditLogger $instance = null;

    // private constructor — no one can do "new AuditLogger()" directly
    private function __construct() {}

    // get the single instance
    public static function getInstance(): AuditLogger
    {
        if (self::$instance === null) {
            self::$instance = new AuditLogger();
        }
        return self::$instance;
    }

    // main method — logs any action in the system
    public function logAction(
        ?string $userId,
        string $actionType,
        ?string $affectedRecord = null,
        ?string $affectedTable = null,
        ?string $previousValue = null,
        ?string $newValue = null,
        ?string $details = null
    ): void {
        AuditLog::create([
            'logId'          => Str::uuid(),
            'userId'         => $userId,
            'actionType'     => $actionType,
            'affectedRecord' => $affectedRecord,
            'affectedTable'  => $affectedTable,
            'previousValue'  => $previousValue,
            'newValue'       => $newValue,
            'details'        => $details,
        ]);
    }

    // --- shortcut methods for common actions ---

    public function logAssessmentStarted(string $userId, string $assessmentId): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'ASSESSMENT_STARTED',
            affectedRecord: $assessmentId,
            affectedTable: 'assessments',
            details: 'Assessment session started'
        );
    }

    public function logAssessmentSubmitted(string $userId, string $assessmentId, float $score): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'ASSESSMENT_SUBMITTED',
            affectedRecord: $assessmentId,
            affectedTable: 'assessments',
            newValue: "score: {$score}",
            details: 'Assessment submitted successfully'
        );
    }

    public function logAssessmentFlagged(string $userId, string $assessmentId, int $violations): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'ASSESSMENT_FLAGGED',
            affectedRecord: $assessmentId,
            affectedTable: 'assessments',
            details: "Assessment flagged after {$violations} proctoring violations"
        );
    }

    public function logProctoringViolation(string $userId, string $assessmentId, string $type): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'PROCTORING_VIOLATION',
            affectedRecord: $assessmentId,
            affectedTable: 'assessments',
            details: "Violation type: {$type}"
        );
    }

    public function logInterviewScheduled(string $userId, string $interviewId, string $scheduledAt): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'INTERVIEW_SCHEDULED',
            affectedRecord: $interviewId,
            affectedTable: 'interviews',
            details: "Interview scheduled at {$scheduledAt}"
        );
    }

    public function logSessionExtensionRequested(string $userId, string $interviewId, int $extraMinutes): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'SESSION_EXTENSION_REQUESTED',
            affectedRecord: $interviewId,
            affectedTable: 'interviews',
            details: "Requested {$extraMinutes} extra minutes"
        );
    }

    public function logSessionExtensionApproved(string $userId, string $interviewId, int $extraMinutes): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'SESSION_EXTENSION_APPROVED',
            affectedRecord: $interviewId,
            affectedTable: 'interviews',
            newValue: "extra_minutes: {$extraMinutes}",
            details: "Session extension approved"
        );
    }

    public function logSessionExtensionRejected(string $userId, string $interviewId): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'SESSION_EXTENSION_REJECTED',
            affectedRecord: $interviewId,
            affectedTable: 'interviews',
            details: "Session extension rejected"
        );
    }

    public function logFeedbackSubmitted(string $userId, string $interviewId, int $score): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'FEEDBACK_SUBMITTED',
            affectedRecord: $interviewId,
            affectedTable: 'interviews',
            newValue: "score: {$score}",
            details: 'Interview feedback submitted'
        );
    }

    public function logCandidateStageChanged(
        string $userId,
        string $applicationId,
        string $previousStatus,
        string $newStatus
    ): void {
        $this->logAction(
            userId: $userId,
            actionType: 'CANDIDATE_STAGE_CHANGED',
            affectedRecord: $applicationId,
            affectedTable: 'applications',
            previousValue: $previousStatus,
            newValue: $newStatus,
            details: "Application stage changed from {$previousStatus} to {$newStatus}"
        );
    }

    public function logRedFlagRaised(string $userId, string $applicationId, string $reason): void
    {
        $this->logAction(
            userId: $userId,
            actionType: 'RED_FLAG_RAISED',
            affectedRecord: $applicationId,
            affectedTable: 'applications',
            details: "Red flag raised. Reason: {$reason}"
        );
    }
}