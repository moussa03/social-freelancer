<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Poject;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\Tags;
use DB;
use Auth;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        $projects = Project::with(['users.cities','tags','comments'])->get();
        return response()->json($projects, 200);

    }
    public function projects(Request $request){
        $projects=Project::with(['users.cities','tags','comments'])->get();
        
         if(($request->Skill) !=""){
            $projects_tag =Tags::where('tag_name', '=', $request->Skill)->pluck("id")->first();
              
               $tags_id = DB::table('project_tag')->where("tag_id","=",$projects_tag)->pluck("project_id");
            //    $projects = Project::with(['users.cities','tags','comments'])->whereIn('id',"=", $tags_id)->get();
           
                
            $projects = Project::where(function ($query) use ($tags_id) {
                $query->whereIn('id', $tags_id);
            })->with(['users.cities','tags','comments'])->get();
                
            return $projects;
         }
         return $projects;
        // }
       
       
    }
  public function searchproject(Request $request){
    $projects=Project::with(['tags','comments','users.cities'])->get();
    if($request->Searchjob!=""){
        $projects=Project::where('project_title','like','%'.$request->Searchjob."%")->with(['tags','comments','users.cities'])->get();
        return $projects;
    }
    return $projects;
  }

  public function searchbytype(Request $request){
   
    $projects=Project::with(['tags','comments','users.cities'])->get();
    if($request->Jobtype!="All"){
        $projects=Project::with(['tags','comments','users.cities'])->where('project_category',"like","%".$request->Jobtype."%")->get();
        return $projects;
    }
    return $projects;
  }
public function pricerange(Request $request){
   
    $projects=Project::with(['tags','comments','users.cities'])->where([
        ['min_price', '>=', $request->Minprice],
        ['max_price', '<=',$request->Maxprice]
     ])->get();

     return $projects;

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
    public function store(ProjectRequest $request)
    {
    $credentials = $request->validated();
       $project=new Project;
       $project->project_title=$request->Project_Title;
       $project->user_id=Auth::user()->id;
       $project->project_category=$request->project_category;
       $project->project_contract=$request->project_contract;
       $project->min_price=$request->Min_Price;
       $project->max_price=$request->Max_Price;
       $project->project_description=$request->project_Description;
       $project->save();
       $project = Project::find($project->id);
       $tags=$request->ProjectTags;

       foreach ($tags as $tagName) {
         $tag = Tags::firstOrCreate(['tag_name' => $tagName]); // Create the tag if it doesn't exist
         $project->tags()->attach($tag); // Attach the tag to the post
    }
    $message = [
        'Projectsucces' => 'you have succesfuly post ',
    ];
    return response()->json($message);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $single_project=Project::find($id);
       $tags=$single_project->tags()->get();
       return response()->json([$single_project,$tags]);
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poject $poject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, string $id)
    {
        $project=Project::find($id);

        Project::where('id',$project->id)
        ->update([
            'project_title' => $request['Project_Title'],
             'user_id'=>Auth::user()->id,
             'min_price'=>$request['Min_Price'],
             'max_price'=>$request['Max_Price'],
             'project_category'=>$request['project_category'],
             'project_description'=>$request['project_Description'],
             'project_contract'=>$request['project_contract']
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $job_id=Job::find($id);
        $single_project=Project::where('id',$id)->delete();
        return "elemenet deleted";

    }
}
