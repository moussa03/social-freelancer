<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EmailRecrutor implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    // public $user;
     public $user;
     public $job_seeker;
     public $notifications;
     public $job;
     public $username;
     public $email;
     public $subject;
     public $Content;

    public function __construct($user,$notifications,$job_seeker,$job,$username,$email,$subject,$Content)
    {
        // $this->user = $user;
         $this->user = $user;
         $this->notifications = $notifications;
         $this->job_seeker = $job_seeker;
         $this->username = $username;
         $this->job = $job;
         $this->email = $email;
         $this->subject = $subject;
         $this->Content = $Content;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
        public function broadcastOn()
        {
            return new PrivateChannel("send-email-job." .$this->user->id);
        }
       

        public function broadcastWith()
        {   
            return [
                 'message2' => $this->user->id,
                 'notifications'=>count($this->notifications)
            
            ];
        }
}
