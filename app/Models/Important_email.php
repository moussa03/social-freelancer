<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Important_email extends Model
{
    use HasFactory;
    protected $fillable = [
        'email_id',
         "data",
         
    ];

    protected $casts = [
        'readt_at' => 'datetime',
    ];

}
