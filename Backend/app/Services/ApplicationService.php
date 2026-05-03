 <?php

namespace App\Services;

use App\Models\Application;
use App\Models\AuditLog;
use Exception;

class ApplicationService
{
    
    public function moveCandidateToStage(Application $application, string $nextStage)
    {
        $oldStage = $application->status;

        $flow = [
            'Applied' => 'Technical Test',
            'Technical Test' => 'Interview',
            'Interview' => 'Offer'
        ];

        if (!isset($flow[$oldStage]) || $flow[$oldStage] !== $nextStage) {
            throw new Exception("Invalid move. You cannot go from $oldStage to $nextStage.");
        }

        $application->update(['status' => $nextStage]);

        AuditLog::create([
            'application_id' => $application->id,
            'old_state' => $oldStage,
            'new_state' => $nextStage,
            'changed_at' => now(),
        ]);
    }
}
