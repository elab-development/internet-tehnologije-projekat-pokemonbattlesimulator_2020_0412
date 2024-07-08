<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAbilityRequest;
use App\Http\Requests\UpdateAbilityRequest;

class AbilityController extends Controller
{
    public function index()
    {
        return Ability::all();
    }

    public function show($id)
    {
        return Ability::findOrFail($id);
    }

    public function store(StoreAbilityRequest $request)
    {
        $validated = $request->validated();
        $ability = Ability::create($validated);

        return response()->json($ability, 201);
    }

    public function update(UpdateAbilityRequest $request, $id)
    {
        $ability = Ability::findOrFail($id);
        $validated = $request->validated();
        $ability->update($validated);

        return response()->json($ability);
    }

    public function destroy($id)
    {
        $ability = Ability::findOrFail($id);
        $ability->delete();

        return response()->json(['message' => 'Ability deleted successfully']);
    }
}
