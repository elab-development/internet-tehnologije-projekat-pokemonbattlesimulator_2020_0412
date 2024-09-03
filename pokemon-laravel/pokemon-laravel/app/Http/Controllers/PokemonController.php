<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function index()
    {
        $pokemons = Pokemon::all();
        return response()->json($pokemons);
    }

    public function show($id)
    {
        $pokemon = Pokemon::find($id);
        if (!$pokemon) {
            return response()->json(['message' => 'Pokemon not found'], 404);
        }
        return response()->json($pokemon);
    }

    public function store(Request $request)
    {
        $pokemon = Pokemon::create($request->all());
        return response()->json($pokemon, 201);
    }

    public function update(Request $request, $id)
    {
        $pokemon = Pokemon::find($id);
        if (!$pokemon) {
            return response()->json(['message' => 'Pokemon not found'], 404);
        }
        $pokemon->update($request->all());
        return response()->json($pokemon);
    }

    public function destroy($id)
    {
        $pokemon = Pokemon::find($id);
        if (!$pokemon) {
            return response()->json(['message' => 'Pokemon not found'], 404);
        }
        $pokemon->delete();
        return response()->json(['message' => 'Pokemon deleted successfully']);
    }
}

