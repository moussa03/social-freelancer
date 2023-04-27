<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Tags;
use App\Http\Requests\JobRequest;
use Auth;
use App\Models\User;
class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {    
        // $results = Job::with(['users'])->get();
        $posts = Job::with('users.ville')->get();

        // $tweets = Job::find(84)->with("users")->get();
        // $posts = $results->get();
        return response()->json($posts, 200);
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
    public function store(JobRequest $request)
    {
      
       $credentials = $request->validated();
       $job=new Job;
       $job->post_title=$request->Post_Title;
       $job->user_id=Auth::user()->id;
       $job->post_type=$request->Post_type;
       $job->salary=$request->Price;
       $job->category=$request->category;
       $job->job_description=$request->Description;
       $job->save();
       $job = Job::find($job->id);
       $tags=$request->Tags;
       foreach ($tags as $tagName) {
         $tag = Tags::firstOrCreate(['tag_name' => $tagName]); // Create the tag if it doesn't exist
         $job->tags()->attach($tag); // Attach the tag to the post
    }
    
    $message = [
        'succes' => 'you have succesfuly post ',
      
    ];
    return response()->json($message);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $single_job=Job::find($id);
       $tags=$single_job->tags()->get();
       return response()->json([$single_job,$tags]);
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
      
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $job=Job::find($id);

        Job::where('id',$job->id)
        ->update([
            'post_title' => $request['post_title'],
             'user_id'=>Auth::user()->id,
             'salary'=>$request['price'],
             'category'=>$request['category'],
             'job_description'=>$request['job_description'],
             'post_type'=>$request['post_type']
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
