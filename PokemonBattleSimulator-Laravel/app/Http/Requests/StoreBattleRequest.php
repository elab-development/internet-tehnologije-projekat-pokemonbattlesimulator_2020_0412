<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreBattleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {

        return Gate::allows('admin-authorize');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pokemon1_id' => 'required|exists:pokemons,id',
            'pokemon2_id' => 'required|exists:pokemons,id',
            'result' => 'required|string|in:win,loss,tie',
            'comments' => 'nullable|string',
        ];
    }
}


