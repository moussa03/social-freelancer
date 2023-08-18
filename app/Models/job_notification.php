<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class job_notification extends Model
{
    use HasFactory;
    protected $fillable = [
        'job_id',
         "job_notif_content"
    ];
    
}
