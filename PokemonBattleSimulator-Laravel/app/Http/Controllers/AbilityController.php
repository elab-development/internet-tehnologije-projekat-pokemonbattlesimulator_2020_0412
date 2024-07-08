<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAbilityRequest;
use App\Http\Requests\UpdateAbilityRequest;
use App\Filters\AbilityFilter;
use App\Http\Resources\AbilityResource;
use App\Http\Resources\AbilityCollection;

class AbilityController extends Controller
{
    public function index(Request $request, AbilityFilter $filter)
    {
        $pageSize = $request->query('page_size', 10);

        $query = Ability::query();

        // Primena filtera
        $filter->setQuery($query);
        $filter->apply();

        // Paginacija rezultata
        $abilities = $query->paginate($pageSize);

        return new AbilityCollection($abilities);
    }

    public function show($id)
    {
        $ability = Ability::findOrFail($id);
        return new AbilityResource($ability);
    }

    public function store(StoreAbilityRequest $request)
    {
        $validated = $request->validated();
        $ability = Ability::create($validated);

        return response()->json(new AbilityResource($ability), 201);
    }

    public function update(UpdateAbilityRequest $request, $id)
    {
        $ability = Ability::findOrFail($id);
        $validated = $request->validated();
        $ability->update($validated);

        return response()->json(new AbilityResource($ability));
    }

    public function destroy($id)
    {
        $ability = Ability::findOrFail($id);
        $ability->delete();

        return response()->json(['message' => 'Ability deleted successfully']);
    }
}


