<?php


namespace App\Http\Controllers;

use App\Models\Battle;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBattleRequest;
use App\Http\Requests\UpdateBattleRequest;

class BattleController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->query('page_size', 10);

        $result = $request->query('result');

        $query = Battle::query();

        if ($result) {
            $query->where('result', $result);
        }

        return $query->paginate($pageSize);
    }

    public function show($id)
    {
        return Battle::findOrFail($id);
    }

    public function store(StoreBattleRequest $request)
    {
        $validated = $request->validated();
        $battle = Battle::create($validated);

        return response()->json($battle, 201);
    }

    public function update(UpdateBattleRequest $request, $id)
    {
        $battle = Battle::findOrFail($id);
        $validated = $request->validated();
        $battle->update($validated);

        return response()->json($battle);
    }

    public function destroy($id)
    {
        $battle = Battle::findOrFail($id);
        $battle->delete();

        return response()->json(['message' => 'Battle deleted successfully']);
    }
}

