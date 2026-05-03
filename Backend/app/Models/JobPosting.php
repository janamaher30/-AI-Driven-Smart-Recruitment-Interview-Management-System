<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobPosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'skill_weights',
        'status'       
    ];

    protected $casts = [
        'skill_weights' => 'array',
    ];

    public function applications()
    {
        return $this->hasMany(Application::class, 'job_requisition_id');
    }

    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }
}
