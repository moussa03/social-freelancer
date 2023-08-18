<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    // protected $table = 'job_notifications';

    protected $fillable = [
        'job_id',
        'data',
        'type'
       
    ];
}
