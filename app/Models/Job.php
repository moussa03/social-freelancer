<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
        
    protected $fillable = [
        'job_title',
        'user_id',
        'job_type',
        'salary',
        'category',
        'job_description',
        'job_picture'
    ];
    
        /**
         * The roles that belong to the Job
         *
         * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
         */
        public function tags(){

            return $this->belongsToMany(Tags::class,'job_tag','job_id','tag_id')->withTimestamps();;
        }
        public function comments(){

             return $this->belongsToMany(Comment::class,'job_comment','job_id','comment_id')->withTimestamps();;
            
        }
         
        public function users()
        {
            return $this->belongsTo(User::class,"user_id");
        }
        
        public function cities()
        {
            return $this->hasOneThrough(
                Ville::class,
                User::class,
                'ville_id', // foreign key on the users table
                'user_id', // local key on the posts table
                'id', // local key on the cities table
                'id' // foreign key on the users table
            );
        }
    
        
    
}
