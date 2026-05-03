<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\AuditLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    
    public function index()
    {
        $analytics = Cache::remember('hr_admin_stats', 86400, function () {
            return [
                'throughput' => $this->calculateThroughput(),
                'bottlenecks' => $this->identifyBottlenecks(),
                'sourceAttribution' => $this->calculateSourceAttribution(),
            ];
        });

        return view('admin.dashboard', $analytics);
    }

    private function calculateThroughput()
    {
        return AuditLog::whereNotNull('application_id')
            ->select('new_state', DB::raw('AVG(TIMESTAMPDIFF(HOUR, created_at, updated_at)) as avg_hours'))
            ->groupBy('new_state')
            ->get();
    }

    private function identifyBottlenecks()
    {
        return AuditLog::whereNotNull('application_id')
            ->select('application_id', 'new_state', 'created_at')
            ->where(DB::raw('TIMESTAMPDIFF(HOUR, created_at, NOW())'), '>', 120)
            ->get();
    }

    private function calculateSourceAttribution()
    {
        return Application::select('source_token', 
                DB::raw('count(*) as candidate_count'), 
                DB::raw('avg(total_score) as avg_quality_score'))
            ->groupBy('source_token')
            ->orderBy('avg_quality_score', 'desc')
            ->get();
    }
    public function index()
{
    return view('dashboard.index', [
        'totalApplications' => Application::count(),
        'averageMatchScore' => Application::avg('total_score'),
        'recentLogs' => AuditLog::latest()->take(5)->get(),
        'diversityStats' => User::select('ethnicity', \DB::raw('count(*) as total'))
                                ->groupBy('ethnicity')
                                ->get()
    ]);
}
    public function getCompetencyGap($id)
    {
        $application = Application::with('jobRequisition')->findOrFail($id);

        return response()->json([
            'candidate_scores' => $application->competency_scores, 
            'job_requirements' => $application->jobRequisition->total_weight, 
        ]);
    }
}
