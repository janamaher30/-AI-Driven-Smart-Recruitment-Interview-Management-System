<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{

    public function index()
    {
        // تم التأكد من الربط مع jobPost (العلاقة في الموديل لازم تكون بتبص على JobPost)
        $applications = Application::where('user_id', Auth::id())
            ->with('jobPost')
            ->latest()
            ->get();

        return view('my-applications', compact('applications'));
    }


    public function create($id)
    {
        $job_id = $id;
        return view('apply', compact('job_id'));
    }


    public function store(Request $request)
    {
        // 1. التعديل هنا: التأكد من وجود الـ ID في جدول job_posts وليس job_requisitions
        $request->validate([
            'cv' => 'required|mimes:pdf|max:2048',
            'job_post_id' => 'required|exists:job_posts,id'
        ]);

        // 2. التأكد من عدم تكرار التقديم باستخدام نفس الـ ID
        $alreadyApplied = Application::where('user_id', Auth::id())
            ->where('job_requisition_id', $request->job_post_id)
            ->exists();

        if ($alreadyApplied) {
            return redirect()->route('my.applications')->with('error', 'لقد قمت بالتقديم على هذه الوظيفة مسبقاً!');
        }

        // 3. رفع الملف
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('cvs', 'public');
        } else {
            return redirect()->back()->with('error', 'فشل في رفع ملف السيرة الذاتية.');
        }

        // 4. الحفظ في الداتا بيز
        // ملاحظة: تأكد أنك نفذت أمر الـ SQL اللي بعتهولك لتعديل الـ Foreign Key في الداتا بيز يدوياً
        Application::create([
            'user_id' => Auth::id(),
            'job_requisition_id' => $request->job_post_id,
            'cv_path' => $path,
            'status' => 'Pending',
        ]);

        return redirect()->route('my.applications')->with('success', 'تم تقديم طلبك بنجاح ونحن الآن بصدد مراجعته.');
    }
}