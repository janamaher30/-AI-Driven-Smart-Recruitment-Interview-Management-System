<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    // السطر ده هو الحل.. بنعرفه الخانات المسموح بكتابتها
    protected $fillable = ['user_id', 'job_requisition_id', 'cv_path', 'status'];

    // علاقة الطلب بالوظيفة (عشان يظهر اسم الوظيفة في جدول طلباتي)
    // جوه موديل الـ Application
    public function jobPost()
    {
        // بنعرف الموديل إن الـ Application الواحد بينتمي لوظيفة (JobPost)
        // وبنحدد اسم العمود اللي رابط بينهم
        return $this->belongsTo(JobPost::class, 'job_requisition_id');
    }
}