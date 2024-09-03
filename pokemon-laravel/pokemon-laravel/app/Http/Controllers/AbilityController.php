<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ability;

class AbilityController extends Controller
{
    // Kreiraj novu ability
    public function store(Request $request)
    {
        $ability = Ability::create($request->all());
        return response()->json($ability, 201);
    }

    // Lista sve abilities
    public function index()
    {
        $abilities = Ability::all();
        return response()->json($abilities);
    }

    // Prikaz sposobnosti po ID
    public function show($id)
    {
        $ability = Ability::findOrFail($id);
        return response()->json($ability);
    }

    // Ažuriraj sposobnost po ID
    public function update(Request $request, $id)
    {
        // Validacija ulaznih podataka
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string',
            'type' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'pokemon_id' => 'sometimes|required|exists:pokemon,id',
            'effect' => 'sometimes|required|string',
        ]);

        $ability = Ability::findOrFail($id);
        $ability->update($validatedData);

        return response()->json($ability);
    }

    // Obriši sposobnost po ID
    public function destroy($id)
    {
        $ability = Ability::findOrFail($id);
        $ability->delete();

        return response()->json(null, 204);
    }

    public function statusEffects()
{
    $abilities = Ability::whereIn('effect', ['paralysis', 'burn', 'freeze'])->get();
    return response()->json($abilities);
}

public function byType($type)
{
    $abilities = Ability::where('type', $type)->get();
    return response()->json($abilities);
}

public function latest()
{
    $abilities = Ability::orderBy('created_at', 'desc')->take(10)->get();
    return response()->json($abilities);
}

}

