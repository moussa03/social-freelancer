<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'City_Name',
        
    ];
    // public function comments()
    // {
    //     return $this->hasMany('App\Models\User');
    // }
        public function users(){
            return $this->hasMany(User::class,"user_id");
        }
 
}
