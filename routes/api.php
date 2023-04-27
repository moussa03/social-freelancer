<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Student ;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\JobController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    
//     return $request->user();
    
// });
 Route::post('/login',[LoginController::class,'login']);
 Route::get('/cities',[StudentController::class,'show_cities']);
 Route::post('/signup',[StudentController::class,'register']);
 Route::middleware(['auth:sanctum'])->group(function () {
 Route::get('/user',[StudentController::class,'show_user']);
 Route::post('/updatepassword',[StudentController::class,'update_password']);
//  Route::post('/logout',[App\Http\Controllers\LoginStudentController::class,'logout']);
 Route::apiResource('jobs',JobController::class);


});






