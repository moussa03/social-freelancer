<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Broadcasting\PrivateChannel;
// use Auth;
use Illuminate\Auth\Access\AuthorizationException;


use App\Models\User;
use App\Models\Job;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/


Broadcast::channel('send-email-job.{userId}', function ($user,$userId) {

    // return Auth::check() && (int) $user->id == Auth::id();
    // try {
      
       return  Auth::check() && (int) $user->id==$userId;
    // } catch (\Illuminate\Http\Client\RequestException $e) {
    //     if ($e->response->status() === 403) {
    //         // event(new ForbiddenAccess('Access to the resource is forbidden.'));
    //        return  false;
    //     }
    // }
   
    // return User::find($employer_id);
    // return true;
         
    
});

