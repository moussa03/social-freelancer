<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
        
    protected $fillable = [
        'post_title',
        'user_id',
        'post_type',
        'salary',
        'category',
        'job_description'
    ];
    
        /**
         * The roles that belong to the Job
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
         */
        public function tags(){

            return $this->belongsToMany(Tags::class,'job_tag','job_id','tag_id')->withTimestamps();;
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
