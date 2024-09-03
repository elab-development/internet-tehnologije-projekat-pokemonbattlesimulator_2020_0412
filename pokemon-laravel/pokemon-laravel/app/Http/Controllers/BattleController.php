<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use Illuminate\Http\Request;

class BattleController extends Controller
{
    public function index()
    {
        return response()->json(Battle::all());
    }

    public function store(Request $request)
    {
        $pokemon = Battle::create($request->all());
        return response()->json($pokemon, 201);
    }

    public function show($id)
    {
        $battle = Battle::find($id);

        if (!$battle) {
            return response()->json(['message' => 'Battle not found'], 404);
        }

        return response()->json($battle);
    }

    public function update(Request $request, $id)
    {
        $battle = Battle::find($id);

        if (!$battle) {
            return response()->json(['message' => 'Battle not found'], 404);
        }

        $request->validate([
            'pokemon_1_id' => 'sometimes|exists:pokemons,id',
            'pokemon_2_id' => 'sometimes|exists:pokemons,id',
            'result' => 'sometimes|string',
        ]);

        $battle->update($request->all());

        return response()->json($battle);
    }

    public function destroy($id)
    {
        $battle = Battle::find($id);

        if (!$battle) {
            return response()->json(['message' => 'Battle not found'], 404);
        }

        $battle->delete();

        return response()->json(['message' => 'Battle deleted successfully']);
    }

    public function getBattlesForPokemon1($pokemon_id)
    {
        $battles = Battle::where('pokemon1_id', $pokemon_id)->get();

        if ($battles->isEmpty()) {
            return response()->json(['message' => 'No battles found for this Pokémon'], 404);
        }

        return response()->json($battles);
    }

    public function getBattlesForPokemon2($pokemon_id)
    {
        $battles = Battle::where('pokemon2_id', $pokemon_id)->get();

        if ($battles->isEmpty()) {
            return response()->json(['message' => 'No battles found for this Pokémon'], 404);
        }

        return response()->json($battles);
    }

    public function getBattlesWherePokemonWon($pokemon_id)
    {
        $battles = Battle::where('winner', $pokemon_id)->get();

        if ($battles->isEmpty()) {
            return response()->json(['message' => 'No battles found where this Pokémon won'], 404);
        }

        return response()->json($battles);
    }
}

