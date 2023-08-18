<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'comment_content',
       
    ];

    // public function jobs(): BelongsToMany
    //     {
    //         return $this->belongsToMany(Comment::class, 'job_tag');
    //     }
    use HasFactory;
}
