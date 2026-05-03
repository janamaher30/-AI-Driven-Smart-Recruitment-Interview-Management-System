<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\NameController;
use App\Http\Controllers\AssessmentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

// الـ Dashboard يعرض الوظائف للجميع بعد تسجيل الدخول
Route::get('/dashboard', [JobPostController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// لينك عرض الوظائف الصريح (حل مشكلة MethodNotAllowed)
Route::get('/jobs', [JobPostController::class, 'index'])
    ->middleware(['auth'])
    ->name('jobs.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Routes (ADMIN)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:ADMIN'])->group(function () {
    // إدارة الوظائف
    Route::get('/jobs/create', [JobPostController::class, 'create'])->name('jobs.create');
    Route::post('/jobs', [JobPostController::class, 'store'])->name('jobs.store');
    Route::get('/jobs/{id}/edit', [JobPostController::class, 'edit'])->name('jobs.edit');
    Route::put('/jobs/{id}', [JobPostController::class, 'update'])->name('jobs.update');
    Route::delete('/jobs/{id}', [JobPostController::class, 'destroy'])->name('jobs.delete');

    // إدارة المتقدمين
    Route::get('/admin/jobs/{job_id}/candidates', [ApplicationController::class, 'adminIndex'])->name('admin.jobs.candidates');
    Route::patch('/admin/applications/{id}/status', [ApplicationController::class, 'updateStatus'])->name('admin.applications.updateStatus');
});

/*
|--------------------------------------------------------------------------
| Candidate Routes (CANDIDATE)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:CANDIDATE'])->group(function () {
    // التقديم على الوظائف
    Route::get('/apply/{job_id}', [ApplicationController::class, 'create'])->name('apply.page');
    Route::post('/apply', [ApplicationController::class, 'store'])->name('apply.store');
    Route::get('/my-applications', [ApplicationController::class, 'index'])->name('my.applications');

    // راوت بدء الامتحان (حل مشكلة الـ 404 في image_6ca09e.png)
    // ملاحظة: شيلنا كلمة api من اللينك عشان يشتغل من الـ web.php
    Route::get('/start-exam', [AssessmentController::class, 'start'])->name('exam.start');
});

/*
|--------------------------------------------------------------------------
| Extra Routes
|--------------------------------------------------------------------------
*/
Route::get('/about/{name?}', function ($name = 'Insert your name') {
    return view('about', compact('name'));
});

Route::post('/send_name', [NameController::class, 'ShowMyName']);

require __DIR__ . '/auth.php';