<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Job;
use App\Models\Project; 
use Auth;
use DB;
class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request)
    {
                 
        $credentials = $request->validated();
        $post_type=$request->postType;
        
        $model=$post_type=="job"?Job::find($request->id):Project::find($request->id);

        if(!$model) return null;

        $comment=new Comment;
        $comment->user_id=Auth::user()->id;
        $comment->User_Name=Auth::user()->name;
        $comment->comment_content=$request->comment;
        $comment->profile_picture=Auth::user()->profil_picture;
        $comment->save();

        $model->comments()->attach($comment);

        return $comment;
        
       

    }
    public function getpost(){
        $likes = DB::table('job_like') // Table name
        ->get();
    // $item = DB::table('job_like')->where('job_id', $id)->first();
     return $likes;

    }
    public function like(Request $request,string $id){
        // $job = DB::table('job_like')->where('job_id', $request->job_id)->first();
        // if($job==""){
        //     return "null";
        // }
        $job=DB::table('job_like')
            ->updateOrInsert(
                ['job_id' => $request->job_id,'user_id'=>Auth::user()->id],
                ['is_like' => $request->is_like]
            );
        
        

    }
   
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $single_comment=Comment::where('id',$id)->delete();
        return "element deleted";
    }
}
