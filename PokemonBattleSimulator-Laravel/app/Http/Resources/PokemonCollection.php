<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PokemonCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $pokemons = $this->collection->map(function ($pokemon) {
            $pokemonData = [
                'id' => $pokemon->id,
                'name' => $pokemon->name,
                'type' => $pokemon->type,
                'level' => $pokemon->level,
            ];

            if ($pokemon->level > 50) {
                $pokemonData['status'] = 'High level';
            }

            return $pokemonData;
        });

        return [
            'data' => $pokemons,
        ];
    }
}

