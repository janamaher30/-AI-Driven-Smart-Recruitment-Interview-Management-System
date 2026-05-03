<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProctoringViolation extends Model
{
    protected $primaryKey = 'violationId';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'violationId',
        'assessmentId',
        'candidateId',
        'type',
        'duration_seconds',
        'violation_count',
        'is_flagged',
        'occurred_at'
    ];
    public $timestamps = true;

    // violation belongs to one assessment
    public function assessment()
    {
        return $this->belongsTo(Assessment::class, 'assessmentId', 'assessmentId');
    }
}