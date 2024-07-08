<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use App\Http\Requests\AddPokemonToUserRequest;
use App\Http\Requests\GetRandomPokemonRequest;

class UserController extends Controller
{
    public function addPokemons(AddPokemonToUserRequest $request, User $user)
    {
        $validated = $request->validated();
        $pokemonIds = $validated['pokemon_ids'];

        foreach ($pokemonIds as $pokemonId) {
            $user->pokemons()->attach($pokemonId);
        }

        return response()->json(['message' => 'Pokemons added successfully']);
    }

    public function getRandomPokemon(GetRandomPokemonRequest $request, User $user)
    {
        $limit = $request->validated()['limit'] ?? 1;
        $randomPokemons = Pokemon::inRandomOrder()->limit($limit)->get();

        return response()->json($randomPokemons);
    }
}
