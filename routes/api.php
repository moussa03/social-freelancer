<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Student ;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\GmailController;
use App\Http\Controllers\Api\NotificationController;







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

// Route::get('/cities',[StudentController::class,'show_cities']);

 Route::post('/login',[LoginController::class,'login']);
 Route::post('/signup',[StudentController::class,'register']);
 Route::get('/cities',[StudentController::class,'show_cities']);
 Broadcast::routes(['middleware' => ['auth:sanctum']]);

 Route::middleware(['auth:sanctum'])->group(function () {
 Route::get('/user',[StudentController::class,'show_user']);
 Route::post('/updatepassword',[StudentController::class,'update_password']);
 Route::post('/update_user/{id}',[StudentController::class,'update_profile'])->name('update');

//  Route::post('/logout',[App\Http\Controllers\LoginStudentController::class,'logout']);
 Route::apiResource('jobs',JobController::class);
 Route::apiResource('projects',ProjectController::class);
 Route::apiResource('comments',CommentController::class);

 //route for projects
Route::post('/Projects',[ProjectController::class,'projects']);
Route::post('/searchproject',[ProjectController::class,'searchproject']);
Route::post('/searchbytype',[ProjectController::class,'searchbytype']);
Route::post('/pricerange',[ProjectController::class,'pricerange']);

//route for jobs 
Route::get('/getjobs',[JobController::class,'getjobs']);
Route::post('/searchbytag',[JobController::class,'searchbytag']);
Route::post('/searchjob',[JobController::class,'searchjob']);
Route::post('/searchbytype',[JobController::class,'searchbytype']);
Route::post('/pricerange',[JobController::class,'pricerange']);

//route for handling notifications 
Route::get('/gmail',[GmailController::class,'redirectToGoogleAuth']);
Route::post('/notifications', [NotificationController::class, 'store']);
Route::get('/notifications', [NotificationController::class, 'index']);
Route::post('important_emails',[NotificationController::class,'important']);
Route::post('like/{id}',[CommentController::class,'like']);
Route::get('getpost',[CommentController::class,'getpost']);


});






