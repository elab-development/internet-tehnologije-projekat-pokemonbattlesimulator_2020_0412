<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateBattleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {

        $user = $this->user();

        if ($user->isAdmin()) {
            return true;
        }

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method = $this->method();

        if ($method == 'PUT') {
            return [
                'result' => 'required|string|in:win,loss,tie',
                'comments' => 'nullable|string',
            ];
        } else {
            return [
                'result' => 'string|in:win,loss,tie',
                'comments' => 'nullable|string',
            ];
        }
    }
}




