<?php

namespace App\Http\Controllers\Api;
use App\Events\messageEvent;
use App\Events\EmailRecrutor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\job_notification;
use App\Notifications\messagenotification;
use App\Models\Notification;
use App\Models\User;
use App\Models\Important_email;
use App\Models\Job;
use Auth;
use DB;



class NotificationController extends Controller
{

    public function index(){
        // $user = Auth::id();
        $notifications=DB::table('notifications')
        ->where('notifiable_id', '=', Auth::id())
        ->get();
       return response()->json($notifications, 200);
        
    }
    
    public function store(Request $request)
    {
        
         
        $job=$request->Job_id;
        $job_seeker=$request->user_name;
        $selected_job=Job::where('id',$job)->get('user_id');
        $user=User::find($selected_job)->first();  
        $job=Job::where('id',$job)->get('job_title');
        $notifications=DB::table('notifications')
        ->where('notifiable_id', '=', Auth::id())
        ->get();
        $username=$request->Username;
        $email=$request->Email;
        $subject=$request->subject;
        $Content=$request->Content;
        //  event(new EmailRecrutor($user->id,$notifications));
         broadcast(new EmailRecrutor($user,$notifications,$job_seeker,$job,$username,$email,$subject,$Content))->toOthers();
       
    }

    public function important(Request $request){
        $important_emails=$request->items;
        $users = DB::table('notifications')->whereIn('id', $important_emails)->get();
      
        foreach ($users as $user) {
            $flight = new Important_email;
            $flight->email_id = $user->id;
            $flight->read_at = $user->read_at;
            $flight->data = $user->data;

            $flight->save();
        }
        //   DB::table('important_emails')->insert($names);
        // $users = DB::table('important_emails')->insert([$users])->whereIn('id', $important_emails);
        // return response()->json($users, 200);

    }

}
