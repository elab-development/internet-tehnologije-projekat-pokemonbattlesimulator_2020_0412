<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonDataController extends Controller
{
    public function fetchPokemonData()
    {
        
        $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=10'); 

        
        if ($response->successful()) {
            $pokemonData = $response->json();

           
            return response()->json($pokemonData);
        } else {
            return response()->json(['error' => 'Unable to fetch data'], $response->status());
        }
    }
}

