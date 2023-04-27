<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Auth;

class LoginController extends Controller
{
    

    public function login(LoginRequest $request){

        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
         return response(compact('user', 'token'));
        // return $user;
    }

    public function logout(){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

}
