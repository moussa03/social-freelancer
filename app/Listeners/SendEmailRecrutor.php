<?php

namespace App\Listeners;

use App\Events\EmailRecrutor;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\messagenotification;
use App\Models\User;

class SendEmailRecrutor
{
    /**
     * Create the event listener.
     */
    
     public function __construct()
     { 
        

         
     }

    /**
     * Handle the event.
     */
    public function handle(EmailRecrutor $event): void
    { 
      
        // $event->data['user']->notify(new messagenotification($event->data));
        //    $user=User::find(1);
        $usernotif = $event->user;
        $job_seeker=$event->job_seeker;
        $job=$event->job;

        $username=$event->username;
        $email=$event->email;
        $subject=$event->subject;
        $Content=$event->Content;

        $usernotif->notify(new messagenotification($job_seeker,$job,$username,$email,$subject,$Content));
        //    broadcast(new messagenotification($user))->toOthers();
        //  broadcast(new messagenotification($event->user))->via('pusher');

    }
}
