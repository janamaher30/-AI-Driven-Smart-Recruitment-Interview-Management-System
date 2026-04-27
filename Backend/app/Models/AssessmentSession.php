<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentSession extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'total_score', 'started_at', 'expires_at', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
