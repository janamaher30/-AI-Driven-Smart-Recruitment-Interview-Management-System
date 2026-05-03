<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'application_id', 
        'job_requisition_id', 
        'user_id', 
        'action_type', 
        'old_state', 
        'new_state', 
        'changed_at'
    ];
    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
