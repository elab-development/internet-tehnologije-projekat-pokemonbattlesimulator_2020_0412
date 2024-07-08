<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBattleRequest;
use App\Http\Requests\UpdateBattleRequest;
use App\Filters\BattleFilter;
use App\Http\Resources\BattleResource;
use App\Http\Resources\BattleCollection;

class BattleController extends Controller
{
    public function index(Request $request, BattleFilter $filter)
    {
        $pageSize = $request->query('page_size', 10);

        $query = Battle::query();

        // Primena filtera
        $filter->setQuery($query);
        $filter->apply();

        // Paginacija rezultata
        $battles = $query->paginate($pageSize);

        return new BattleCollection($battles);
    }

    public function show($id)
    {
        $battle = Battle::findOrFail($id);
        return new BattleResource($battle);
    }

    public function store(StoreBattleRequest $request)
    {
        $validated = $request->validated();
        $battle = Battle::create($validated);

        return response()->json(new BattleResource($battle), 201);
    }

    public function update(UpdateBattleRequest $request, $id)
    {
        $battle = Battle::findOrFail($id);
        $validated = $request->validated();
        $battle->update($validated);

        return response()->json(new BattleResource($battle));
    }

    public function destroy($id)
    {
        $battle = Battle::findOrFail($id);
        $battle->delete();

        return response()->json(['message' => 'Battle deleted successfully']);
    }
}



