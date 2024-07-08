<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class PokemonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $pokemonData = [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
        ];

        if (Auth::check() && Auth::user()->role === 'admin') {
            $pokemonData['level'] = $this->level;
            $pokemonData['health'] = $this->health;
            $pokemonData['attack'] = $this->attack;
            $pokemonData['defense'] = $this->defense;
            $pokemonData['evolves'] = $this->evolves;
        }

        return $pokemonData;
    }
}

