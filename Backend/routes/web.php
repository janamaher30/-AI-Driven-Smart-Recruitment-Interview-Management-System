<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobPostController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/dashboard', [JobPostController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('role:ADMIN')->group(function () {
    Route::get('/admin/dashboard', function () {
        return "hello admin";
    });
});

Route::middleware(['auth', 'role:ADMIN'])->group(function () {
    Route::get('/jobs/create', [JobPostController::class, 'create'])->middleware('auth', 'role:ADMIN');
    Route::post('/jobs', [JobPostController::class, 'store'])->name('jobs.store');
});

Route::middleware('role:CANDIDATE')->group(function () {
    Route::get('/apply', function () {
        return "here the candinate page";
    });
});

Route::middleware('role:INTERVIEWER')->group(function () {
    Route::get('/interviews', function () {
        return "here the interview list";
    });
});
require __DIR__ . '/auth.php';
