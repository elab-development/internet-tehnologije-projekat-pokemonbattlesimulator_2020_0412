<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;
use App\Http\Requests\StorePokemonRequest;
use App\Http\Requests\UpdatePokemonRequest;
use App\Filters\PokemonFilter;
use App\Http\Resources\PokemonResource;
use App\Http\Resources\PokemonCollection;

class PokemonController extends Controller
{
    public function index(Request $request, PokemonFilter $filter)
    {
        $pageSize = $request->query('page_size', 10);

        $query = Pokemon::query();

        // Apply filters
        $filter->setQuery($query);
        $filter->apply();

        // Paginate the results
        $pokemon = $query->paginate($pageSize);

        return new PokemonCollection($pokemon);
    }

    public function show($id)
    {
        $pokemon = Pokemon::findOrFail($id);
        return new PokemonResource($pokemon);
    }

    public function store(StorePokemonRequest $request)
    {
        $validated = $request->validated();
        $pokemon = Pokemon::create($validated);

        return response()->json(new PokemonResource($pokemon), 201);
    }

    public function update(UpdatePokemonRequest $request, $id)
    {
        $pokemon = Pokemon::findOrFail($id);
        $validated = $request->validated();
        $pokemon->update($validated);

        return response()->json(new PokemonResource($pokemon));
    }

    public function destroy($id)
    {
        $pokemon = Pokemon::findOrFail($id);
        $pokemon->delete();

        return response()->json(['message' => 'Pokemon deleted successfully']);
    }
}


