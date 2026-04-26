<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;

class JobPostController extends Controller
{

    public function index()
    {
        $jobs = JobPost::all();

        return view('dashboard', compact('jobs'));
    }

    public function create()
    {
        return view('create-job');
    }

    public function store(Request $request)
    {
        // 1. الفلترة الأمنية (عشان مفيش هكر يحط Script جوه الوصف)
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'salary' => 'nullable|numeric',
        ]);

        JobPost::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'salary' => $validated['salary'],
            'admin_id' => auth()->id(),
        ]);

        return redirect('/dashboard')->with('success', 'الوظيفة اتنشرت يا هندسة!');
    }
    public function show(JobPost $jobPost)
    {
        return response()->json([]);
    }


    public function edit(JobPost $jobPost)
    {
        return response()->json([]);
    }


    public function update(Request $request, JobPost $jobPost)
    {
        return response()->json([]);
    }

    public function destroy(JobPost $jobPost)
    {
        return response()->json([]);
    }
}
