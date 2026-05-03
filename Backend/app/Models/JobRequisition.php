<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobRequisition extends Model
{
    use HasFactory;

   
    protected $fillable = [
        'title', 
        'description', 
        'status', 
        'version_number', 
        'total_weight'
    ];
    public function applications()
{
    return $this->hasMany(Application::class, 'job_requisition_id');
}

public function postings()
{
    return $this->hasMany(JobPosting::class); 
}

    public function scopeLive($query)
    {
        return $query->where('status', 'Live');
    }

    public function isLatestVersion()
    {
        return $this->version_number === JobRequisition::where('title', $this->title)->max('version_number');
    }
}
