<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UpdateUserRequest;

use App\Models\Ville;
use App\Models\User;
use Auth;
use Hash;
use Response;
use Str;
use Storage;
use DB;
use Intervention\Image\Facades\Image;

use App\Http\Requests\RegisterRequest;

class StudentController extends Controller
{
    public function show_cities(){
        
        $cities=Ville::all();
        return Response::json($cities);
    }


    
    public function register(RegisterRequest $request){
        if ($request->file('profil_picture')) {
            $image = $request->file('profil_picture');
            $imageName = time().'.'.$image->extension();
           
            $destinationPathThumbnail = public_path('/images/profil_pictures/small');
            $img = Image::make($image->path());
            $img->resize(50, 50, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPathThumbnail.'/'.$imageName);
         
            $destinationPath = public_path('/images/profil_pictures/origin');
            $image->move($destinationPath, $imageName);
            }
        $credentials = $request->validated();
        /** @var \App\Models\User $student */
        $user = User::create([
            'name' => $request['Name'],
            'email' => $request['Email'],
            'ville_id'=>$request['ville_id'],
            'profil'=>$request['profil'],
            'profil_picture' => $imageName,
            'password' => bcrypt($request['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));

    }

    public function show_user(Request $request){
         return $request->user();
        //  $hashedPassword = Auth::user()->getAuthPassword();
        //  return response(compact('user','hashedPassword'));
    }


    public function update_profile(UpdateUserRequest $request, string $id){
         $credentials = $request->validated();
         $user=User::find($id);
         if ($request->file('picture')) {
            $image = $request->file('picture');
            $imageName = time().'.'.$image->extension();
           
            $destinationPathThumbnail = public_path('/images/profil_pictures/small');
            $img = Image::make($image->path());
            $img->resize(50, 50, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPathThumbnail.'/'.$imageName);
         
            $destinationPath = public_path('/images/profil_pictures/origin');
            $image->move($destinationPath, $imageName);
            User::where('id',$user->id)
            ->update([
                 'name' => $request['Username'],
                 'profil'=>$request['profil'],
                 'email'=>$user->email,
                 'ville_id'=>$request['ville'],
                 'profil_picture'=>$imageName,
                 
            ]);
        }
      else {
       
        User::where('id',$user->id)
            ->update([
                 'name' => $request['Username'],
                 'profil'=>$request['profil'],
                 'email'=>$user->email,
                 'ville_id'=>$request['ville'],
                 
            ]);
      }
    
     
        
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
