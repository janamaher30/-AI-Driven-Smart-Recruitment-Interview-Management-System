<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\AuditLogger;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    private AuditLogger $auditLogger;

    public function __construct()
    {
        $this->auditLogger = AuditLogger::getInstance();
    }

    // --- get all notifications for a specific user ---
    public function getUserNotifications(Request $request)
    {
        $request->validate([
            'userId' => 'required|string',
        ]);

        $notifications = Notification::where('userId', $request->userId)
                                     ->orderBy('created_at', 'desc')
                                     ->get();

        return response()->json([
            'notifications' => $notifications,
            'unreadCount'   => $notifications->where('is_read', false)->count(),
        ], 200);
    }

    // --- mark a single notification as read ---
    public function markAsRead(Request $request)
    {
        $request->validate([
            'notificationId' => 'required|string',
            'userId'         => 'required|string',
        ]);

        $notification = Notification::where('notificationId', $request->notificationId)
                                    ->where('userId', $request->userId)
                                    ->first();

        if (!$notification) {
            return response()->json([
                'message' => 'Notification not found'
            ], 404);
        }

        $notification->is_read = true;
        $notification->save();

        return response()->json([
            'message' => 'Notification marked as read',
        ], 200);
    }

    // --- mark all notifications as read for a user ---
    public function markAllAsRead(Request $request)
    {
        $request->validate([
            'userId' => 'required|string',
        ]);

        Notification::where('userId', $request->userId)
                    ->where('is_read', false)
                    ->update(['is_read' => true]);

        return response()->json([
            'message' => 'All notifications marked as read',
        ], 200);
    }

    // --- get only unread notifications for a user ---
    public function getUnreadNotifications(Request $request)
    {
        $request->validate([
            'userId' => 'required|string',
        ]);

        $notifications = Notification::where('userId', $request->userId)
                                     ->where('is_read', false)
                                     ->orderBy('created_at', 'desc')
                                     ->get();

        return response()->json([
            'unreadNotifications' => $notifications,
            'unreadCount'         => $notifications->count(),
        ], 200);
    }

    // --- delete a notification ---
    public function deleteNotification(Request $request)
    {
        $request->validate([
            'notificationId' => 'required|string',
            'userId'         => 'required|string',
        ]);

        $notification = Notification::where('notificationId', $request->notificationId)
                                    ->where('userId', $request->userId)
                                    ->first();

        if (!$notification) {
            return response()->json([
                'message' => 'Notification not found'
            ], 404);
        }

        $notification->delete();

        return response()->json([
            'message' => 'Notification deleted successfully',
        ], 200);
    }

    // --- HR views audit logs ---
    public function getAuditLogs(Request $request)
    {
        $request->validate([
            'userId' => 'required|string',
        ]);

        $logs = \App\Models\AuditLog::orderBy('created_at', 'desc')
                                    ->get();

        return response()->json([
            'auditLogs' => $logs,
        ], 200);
    }
}