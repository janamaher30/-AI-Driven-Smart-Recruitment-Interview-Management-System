<?php

namespace App\Services;

use App\Models\Application;
use App\Models\JobRequisition;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ReportingService
{

    public function calculateMatchScore($applicationId)
    {
        $application = Application::with('jobRequisition')->findOrFail($applicationId);
        $candidateSkills = $application->competency_scores; 
        $jobWeights = $application->jobRequisition->skill_weights; 

        $totalMatchScore = 0;
        foreach ($jobWeights as $skill => $weight) {
            if (isset($candidateSkills[$skill])) {
                $totalMatchScore += ($weight * $candidateSkills[$skill]);
            }
        }

        $application->update(['total_score' => $totalMatchScore]);
        return $totalMatchScore;
    }

    public function getAuditTrailReport($jobId)
    {
        return DB::table('audit_logs')
            ->join('users', 'audit_logs.user_id', '=', 'users.id')
            ->join('job_requisitions', 'audit_logs.job_requisition_id', '=', 'job_requisitions.id')
            ->select(
                'job_requisitions.title as job_title',
                'users.name as admin_name',
                'audit_logs.action_type',
                'audit_logs.old_state',
                'audit_logs.new_state',
                'audit_logs.changed_at'
            )
            ->where('job_requisitions.id', $jobId)
            ->orderBy('audit_logs.changed_at', 'desc')
            ->get();
    }


    public function anonymizeExpiredApplications()
    {
        $retentionLimit = now()->subYears(2);

        $expiredCount = Application::where('created_at', '<', $retentionLimit)
            ->where('status', '!=', 'Anonymized')
            ->update([
                'source_token' => 'REDACTED',
                'competency_scores' => null,
                'status' => 'Anonymized'
            ]);

        return $expiredCount;
    }
}
