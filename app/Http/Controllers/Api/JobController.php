<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Tags;
use App\Models\Ville;
use App\Http\Requests\JobRequest;
use Auth;
use App\Models\User;
use Str;
use Storage;
use DB;
use App\Models\Project;

use Intervention\Image\Facades\Image;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {    
        $jobs = Job::with(['users.cities','tags','comments'])->get();
        $projects = Project::with(['users.cities','tags','comments'])->get();
        $all = array_merge($jobs->toArray(), $projects->toArray());
        shuffle($all);
        return response()->json($all, 200);
    }
    public function getjobs(){
        $jobs = Job::with(['users.cities','tags','comments'])->get();
        return response()->json($jobs, 200);
    }
    public function searchbytag(Request $request){
        $jobs=Job::with(['users.cities','tags','comments'])->get();
        
         if(($request->Skill) !=""){
            $projects_tag =Tags::where('tag_name', '=', $request->Skill)->pluck("id")->first();
              
               $tags_id = DB::table('job_tag')->where("tag_id","=",$projects_tag)->pluck("job_id");
            //    $projects = Project::with(['users.cities','tags','comments'])->whereIn('id',"=", $tags_id)->get();
           
                
            $jobs = Job::where(function ($query) use ($tags_id) {
                $query->whereIn('id', $tags_id);
            })->with(['users.cities','tags','comments'])->get();
                
            return $jobs;
         }
         return $jobs;
        // }
       
       
    }
    public function searchbytype(Request $request){
   
        $projects=Job::with(['tags','comments','users.cities'])->get();
        if($request->Jobtype!="All"){
            $projects=Job::with(['tags','comments','users.cities'])->where('project_category',"like","%".$request->Jobtype."%")->get();
            return $projects;
        }
        return $projects;
      }
    /**
     * Show the form for creating a new resource.
     */

     public function pricerange(Request $request){
   
        $projects=Job::with(['tags','comments','users.cities'])->where([
            ['salary', '>=', $request->Minprice],
            ['salary', '<=',$request->Maxprice]
         ])->get();
    
         return $projects;
    
    }

    public function searchjob(Request $request){
        $jobs=Job::with(['tags','comments','users.cities'])->get();
        if($request->Searchjob!=""){
            $jobs=Job::where('job_title','like','%'.$request->Searchjob."%")->with(['tags','comments','users.cities'])->get();
            return $jobs;
        }
        return $jobs;
      }
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobRequest $request)
    {
        // if ($request->file('job_picture')) {
        //     $image = $request->file('job_picture');
        //     $imageName = time().'.'.$image->extension();
           
        //     $destinationPathThumbnail = public_path('/images/job_pictures/small');
        //     $img = Image::make($image->path());
        //     $img->resize(50, 50, function ($constraint) {
        //         $constraint->aspectRatio();
        //     })->save($destinationPathThumbnail.'/'.$imageName);
         
        //     $destinationPath = public_path('/images/job_pictures/oigin');
        //     $image->move($destinationPath, $imageName);
        //     }

            

       $credentials = $request->validated();
       $job=new Job;
       $job->job_title=$request->job_title;
       $job->user_id=Auth::user()->id;
       $job->job_contract=$request->job_contract;
       $job->salary=$request->Price;
       $job->job_category=$request->job_category;
       $job->job_description=$request->Description;
    //    $job->job_picture=$imageName;

       $job->save();
       $job = Job::find($job->id);
       $tags=$request->Tags;
       $array_tags = array_map('intval', explode(',', $request->Tags));

       foreach ($array_tags as $tagName) {
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
    public function update(JobRequest $request, string $id)
    {
        $credentials = $request->validated();
        $job=Job::find($id);
        Job::where('id',$job->id)
        ->update([
             'job_title' => $request['job_title'],
             'user_id'=>Auth::user()->id,
             'salary'=>$request['Price'],
             'job_category'=>$request['job_category'],
             'job_description'=>$request['Description'],
             'job_contract'=>$request['job_contract']
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $job_id=Job::find($id);
        $single_job=Job::where('id',$id)->delete();
        return "elemenet deleted";

    }
}
