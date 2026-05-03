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


    public function edit($id)
    {
        $job = JobPost::findOrFail($id); // بيجيب بيانات الوظيفة من الداتابيز
        return view('jobs.edit', compact('job')); // بيفتح صفحة التعديل ويبعتلها البيانات
    }

    public function update(Request $request, $id)
    {
        // 1. التحقق من البيانات (Validation)
        $validated = $request->validate([
            'title' => 'required',
            'location' => 'required',
            'salary' => 'required|numeric',
        ]);

        // 2. تحديث البيانات في الداتابيز
        $job = JobPost::findOrFail($id);
        $job->update($validated);

        // 3. الرجوع للداشبورد مع رسالة نجاح (صلب الوظيفة 4)
        return redirect()->route('dashboard')->with('success', 'تم تحديث بيانات الوظيفة بنجاح يا هندسة! 🚀');
    }

    public function destroy(JobPost $jobPost)
    {
        return response()->json([]);
    }
}
