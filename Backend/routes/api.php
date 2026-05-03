<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProctoringController;
use App\Http\Controllers\SessionExtensionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\LiveCodingController;
use App\Http\Controllers\FrontendApiController;

// ─────────────────────────────────────────────
// PROCTORING & ANTI-CHEATING ROUTES (UC-08)
// ─────────────────────────────────────────────
Route::prefix('proctoring')->group(function () {

    // candidate starts an assessment session
    Route::post('/start', [ProctoringController::class, 'startAssessment']);

    // candidate's browser reports a focus-loss violation
    Route::post('/violation', [ProctoringController::class, 'logViolation']);

    // candidate submits the assessment
    Route::post('/submit', [ProctoringController::class, 'submitAssessment']);

    // heartbeat check — checks if timer has expired
    Route::post('/check-timer', [ProctoringController::class, 'checkTimer']);

    // HR views all flagged assessments
    Route::get('/flagged', [ProctoringController::class, 'getFlaggedAssessments']);

});

// ─────────────────────────────────────────────
// SESSION EXTENSION ROUTES (UC-37 & UC-31)
// ─────────────────────────────────────────────
Route::prefix('session')->group(function () {

    // UC-37: interviewer requests a session extension
    Route::post('/request-extension', [SessionExtensionController::class, 'requestExtension']);

    // UC-31: HR approves the extension
    Route::post('/approve-extension', [SessionExtensionController::class, 'approveExtension']);

    // UC-31: HR rejects the extension
    Route::post('/reject-extension', [SessionExtensionController::class, 'rejectExtension']);

});

// ─────────────────────────────────────────────
// NOTIFICATION ROUTES (UC-03)
// ─────────────────────────────────────────────
Route::prefix('notifications')->group(function () {

    // get all notifications for a user
    Route::get('/user', [NotificationController::class, 'getUserNotifications']);

    // get only unread notifications
    Route::get('/unread', [NotificationController::class, 'getUnreadNotifications']);

    // mark a single notification as read
    Route::post('/mark-read', [NotificationController::class, 'markAsRead']);

    // mark all notifications as read
    Route::post('/mark-all-read', [NotificationController::class, 'markAllAsRead']);

    // delete a notification
    Route::delete('/delete', [NotificationController::class, 'deleteNotification']);

    // HR views full audit log
    Route::get('/audit-logs', [NotificationController::class, 'getAuditLogs']);

});

// ─────────────────────────────────────────────
// LIVE CODING ROUTES (UC-04)
// ─────────────────────────────────────────────
Route::prefix('live-coding')->group(function () {

    // interviewer starts the live coding session
    Route::post('/start', [LiveCodingController::class, 'startSession']);

    // participant joins the session
    Route::post('/join', [LiveCodingController::class, 'joinSession']);

    // sync code changes to all participants
    Route::post('/sync', [LiveCodingController::class, 'syncCode']);

    // interviewer submits feedback after session
    Route::post('/feedback', [LiveCodingController::class, 'submitFeedback']);

    // get full session details and code history
    Route::get('/session', [LiveCodingController::class, 'getSessionDetails']);

});

// ─────────────────────────────────────────────
// FRONTEND INTEGRATION ROUTES
// ─────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/login', [FrontendApiController::class, 'login']);
    Route::post('/register', [FrontendApiController::class, 'register']);
});

Route::get('/jobs', [FrontendApiController::class, 'jobs']);
Route::get('/interviews', [FrontendApiController::class, 'interviews']);
Route::post('/interviews/reschedule', [FrontendApiController::class, 'rescheduleInterview']);
Route::get('/candidate/dashboard', [FrontendApiController::class, 'candidateDashboard']);
Route::get('/interviewer/dashboard', [FrontendApiController::class, 'interviewerDashboard']);
Route::get('/candidates/pipeline', [FrontendApiController::class, 'candidatesPipeline']);