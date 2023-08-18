<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            "Project_Title"=>'required',
            'project_category'=>"required",
            'project_contract'=>"required",
            'Min_Price'=>"required",
            'Max_Price'=>"required",
            "project_Description"=>"required",
            
        ];
    }
}
