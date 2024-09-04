<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

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

    public function strongest()
{
    $pokemon = Pokemon::orderBy('attack', 'desc')->first();
    return response()->json($pokemon);
}

public function types()
{
    $types = Pokemon::distinct()->pluck('type');
    return response()->json($types);
}

public function byType($type)
{
    $pokemons = Pokemon::where('type', $type)->get();
    return response()->json($pokemons);
}

public function paginatedIndex(Request $request)
{
    // Paginate with a default of 10 items per page
    $pokemons = Pokemon::paginate(10);

    // Optional: Get a custom number of items per page if specified in the query parameters
    $perPage = $request->query('per_page', 10);
    $pokemons = Pokemon::paginate($perPage);

    return response()->json($pokemons);
}

public function filterByType(Request $request)
{
    $type = $request->query('type');

    if (!$type) {
        return response()->json(['message' => 'Type parameter is required'], 400);
    }

    $pokemons = Pokemon::where('type', $type)->get();

    return response()->json($pokemons);
}

public function indexCache()
    {
        // Keširaj sve pokemone na 60 minuta
        $pokemons = Cache::remember('pokemons', 60, function () {
            return Pokemon::all();
        });

        return response()->json($pokemons);
    }

    public function showCache($id)
    {
        // Keširaj pojedinačnog pokemona na 60 minuta
        $pokemon = Cache::remember("pokemon_{$id}", 60, function () use ($id) {
            return Pokemon::findOrFail($id);
        });

        return response()->json($pokemon);
    }


}

