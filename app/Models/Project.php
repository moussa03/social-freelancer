<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_title',
        'user_id',
        'project_category',
        'salary',
        'category',
        'job_description'
    ];

    public function tags(){

        return $this->belongsToMany(Tags::class,'project_tag','project_id','tag_id')->withTimestamps();;
    }

    public function comments(){

        return $this->belongsToMany(Comment::class,'project_comment','project_id','comment_id')->withTimestamps();;
    }
    public function users()
    {
        return $this->belongsTo(User::class,"user_id");
    }
    
    public function ville()
    {
        return $this->hasOneThrough(
            ville::class,
            User::class,
            'ville_id', // foreign key on the users table
            'id', // local key on the cities table
            'user_id', // local key on the posts table
            'id' // foreign key on the users table
        );
    }

}
