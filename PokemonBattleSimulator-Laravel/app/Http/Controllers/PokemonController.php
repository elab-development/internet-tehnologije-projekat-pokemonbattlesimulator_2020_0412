<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;
use App\Http\Requests\StorePokemonRequest;
use App\Http\Requests\UpdatePokemonRequest;
use App\Http\Requests\SearchPokemonRequest;

class PokemonController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->query('page_size', 10);

        $type = $request->query('type');

        $query = Pokemon::query();

        if ($type) {
            $query->where('type', $type);
        }

        return $query->paginate($pageSize);
    }

    public function show($id)
    {
        return Pokemon::findOrFail($id);
    }

    public function store(StorePokemonRequest $request)
    {
        $validated = $request->validated();
        $pokemon = Pokemon::create($validated);

        return response()->json($pokemon, 201);
    }

    public function update(UpdatePokemonRequest $request, $id)
    {
        $pokemon = Pokemon::findOrFail($id);
        $validated = $request->validated();
        $pokemon->update($validated);

        return response()->json($pokemon);
    }

    public function destroy($id)
    {
        $pokemon = Pokemon::findOrFail($id);
        $pokemon->delete();

        return response()->json(['message' => 'Pokemon deleted successfully']);
    }

    public function getByType($type)
    {
        return Pokemon::where('type', $type)->get();
    }

    public function search(SearchPokemonRequest $request)
    {
        $validated = $request->validated();
        return Pokemon::where('name', 'like', '%' . $validated['name'] . '%')->get();
    }
}

