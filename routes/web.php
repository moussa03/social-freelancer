<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// route::get("event",function(){
//     \App\Events\EmailRecrutor::dispatch(App\Models\User::find(2));
// });
// Route::post('/broadcasting/auth', function () {
//     return Auth::check() ? Auth::user() : abort(401);
// })->middleware('auth:web');

// Route::get('/jobs',[JobController::class,'index']);

