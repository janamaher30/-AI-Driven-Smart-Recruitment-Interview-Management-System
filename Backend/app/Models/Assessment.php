<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = ['candidateId', 'jobId', 'duration', 'status', 'startTime', 'endTime', 'proctorFlags'];
}
