<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $primaryKey = 'notificationId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'notificationId',
        'userId',
        'triggeredBy',
        'type',
        'message',
        'is_read',
    ];

    // notification belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'userId');
    }
}