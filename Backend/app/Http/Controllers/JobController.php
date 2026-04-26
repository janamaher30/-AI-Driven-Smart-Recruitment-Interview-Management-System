<?php

namespace App\Http\Controllers;
use App\Models\Job; //

use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::all(); // هات كل الوظائف من الداتابيز
        return view('jobs.index', compact('jobs')); // ابعتها لصفحة العرض
    }
}
