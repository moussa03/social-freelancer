<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    use HasFactory;
    protected $fillable = [
        'tag_name',
    ];


    public function jobs(): BelongsToMany
        {
            return $this->belongsToMany(Tags::class, 'job_tag');
        }
}
