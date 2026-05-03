<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobRequisition;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

class JobRequisitionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
        ]);

        JobRequisition::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'Draft',
            'version_number' => 1,
        ]);

        return redirect()->back()->with('success', 'Job Requisition created as Draft.');
    }

    public function update(Request $request, $id)
    {
        $job = JobRequisition::findOrFail($id);

        $job->update([
            'title' => $request->title,
            'description' => $request->description,
            'version_number' => $job->version_number + 1
        ]);

        return redirect()->back()->with('success', 'Job updated to Version ' . $job->version_number);
    }

    public function approve($id)
    {
        $job = JobRequisition::findOrFail($id);
        $oldStatus = $job->status;

        $job->update(['status' => 'Live']);

        AuditLog::create([
            'job_requisition_id' => $job->id,
            'application_id' => null,
            'action_type' => 'Job Approved',
            'user_id' => Auth::id(),
            'old_state' => $oldStatus,
            'new_state' => 'Live',
        ]);

        return redirect()->back()->with('success', 'Job is now LIVE.');
    }

    public function close($id)
    {
        $job = JobRequisition::findOrFail($id);
        $oldStatus = $job->status;

        $job->update(['status' => 'Closed']);

        AuditLog::create([
            'job_requisition_id' => $job->id,
            'application_id' => null,
            'action_type' => 'Job Closed',
            'user_id' => Auth::id(),
            'old_state' => $oldStatus,
            'new_state' => 'Closed',
        ]);

        return redirect()->back()->with('warning', 'Job Posting has been closed.');
    }
}
