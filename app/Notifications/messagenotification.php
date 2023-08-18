<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;


class messagenotification extends Notification 
{
    use Queueable;

    
    /**
     * Create a new notification instance.
     */
    // public $user;
   
     public $job_seeker;
     public $job;

     public $username;
     public $email;
     public $subject;
     public $Content;
    // public $data;
    public function __construct($job_seeker,$job,$username,$email,$subject,$Content)
    { 
       
         $this->job_seeker = $job_seeker;
         $this->job = $job;
         $this->username = $username;
         $this->email = $email;
         $this->subject = $subject;
         $this->Content = $Content;
        
        // $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    // public function toBroadcast($notifiable)
    // {
    //     return new BroadcastMessage([
    //         'lesson_name' => 'test'
    //     ]);
    // }

  
    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    // public function toBroadcast(object $notifiable): BroadcastMessage
    // {
    //     return new BroadcastMessage([
    //         'id' => $user,
           
    //     ]);
    // }
    public function toArray(object $notifiable)
    {
        return [
            // 'user'=>$this->user,
            'data'=>[$this->job,$this->job_seeker,$this->username,$this->email,$this->subject,$this->Content],
            // 'job_name'=>$this->job
            
        ];
    }

}
