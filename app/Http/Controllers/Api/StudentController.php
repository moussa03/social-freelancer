<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Models\Ville;
use App\Models\User;
use Auth;
use Hash;
use Response;
use Str;
use Storage;
use App\Http\Requests\RegisterRequest;

class StudentController extends Controller
{
    public function show_cities(){
        $cities=Ville::all();
        return Response::json($cities);

    }
    public function register(Request $request){
        // $data = $request->validated();
        

        if ($request['profil_image']) {

           
           
        }

        /** @var \App\Models\User $student */
        $user = User::create([
            'name' => $data['Name'],
            'email' => $data['Email'],
            'ville_id'=>$data['ville_id'],
            'profil'=>$data['profil'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        $user = Auth::user();
       
        return response(compact('user', 'token'));

    }

    public function show_user(Request $request){
         return $request->user();
        //  $hashedPassword = Auth::user()->getAuthPassword();
        //  return response(compact('user','hashedPassword'));
    }

    public function update_password(Request $request){
        $validated = $request->validate([
            'Old_pass' => 'required',
            'Password'=>'required',
            'Confirmed_pass'=>'required'
        ]);

        $oldpass=$request['Old_pass'];
        $hashedPassword = Auth::user()->getAuthPassword();
        // $user=false;
        if(Hash::check($oldpass, $hashedPassword)) {
            $student=User::find(Auth::user()->id);
            $student->password=bcrypt($request['Password']);
            $student->save();
            $user=true;
            return response(compact('user'));
            
        }
        else {
            $user=false;
            return response(compact('user'));

        }
        

    }

}
