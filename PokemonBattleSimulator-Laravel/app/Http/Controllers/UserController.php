<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->query('page_size', 10);

        $role = $request->query('role');

        $query = User::query();

        if ($role) {
            $query->where('role', $role);
        }

        return $query->paginate($pageSize);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $user = User::create($validated);

        return response()->json($user, 201);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validated();
        $user->update($validated);

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function addPokemons(Request $request, User $user)
    {
        $pokemonIds = $request->input('pokemon_ids');
        $user->pokemons()->syncWithoutDetaching($pokemonIds);

        return response()->json(['message' => 'Pokemons added successfully']);
    }

    public function getRandomPokemon(User $user)
    {
        $randomPokemon = Pokemon::inRandomOrder()->first();
        $user->pokemons()->attach($randomPokemon->id);

        return response()->json($randomPokemon);
    }
}
