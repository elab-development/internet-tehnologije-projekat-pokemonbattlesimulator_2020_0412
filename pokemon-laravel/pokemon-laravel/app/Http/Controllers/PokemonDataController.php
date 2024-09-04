<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonDataController extends Controller
{
    public function fetchPokemonData()
    {
        // Pozivanje PokeAPI za dobijanje podataka o Pokémonima
        $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=10'); // Primer, vraća prvih 10 Pokémon

        // Proveravamo da li je odgovor uspešan
        if ($response->successful()) {
            $pokemonData = $response->json();

            // Obraditi podatke (u ovom primeru samo vraćamo podatke bez obrade)
            return response()->json($pokemonData);
        } else {
            return response()->json(['error' => 'Unable to fetch data'], $response->status());
        }
    }
}

