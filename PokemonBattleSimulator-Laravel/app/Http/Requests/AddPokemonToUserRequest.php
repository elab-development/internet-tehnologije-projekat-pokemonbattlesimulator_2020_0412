<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class AddPokemonToUserRequest extends FormRequest
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
            'pokemon_id' => 'required|exists:pokemons,id',
        ];
    }

    protected function prepareForValidation()
{
    $this->merge([
        'pokemon_id' => $this->pokremonIds
    ]);
}
}

