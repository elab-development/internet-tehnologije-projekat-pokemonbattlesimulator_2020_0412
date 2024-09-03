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
}

