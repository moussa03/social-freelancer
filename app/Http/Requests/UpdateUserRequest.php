<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UpdateUserRequest extends FormRequest
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
        // $user_id = $this->route('update')->id;
        return [
            'Username' => 'required',
            'profil' => 'required',
            'ville'=>'required',
            // 'email' =>"required"
            // 'picture'=>'required',
            
        ];
    }
}
