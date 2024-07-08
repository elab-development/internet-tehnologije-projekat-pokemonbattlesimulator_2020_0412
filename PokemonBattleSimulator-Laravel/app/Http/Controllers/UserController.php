<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $key = 'users.page.'.$request->query('page', 1);
        $users = Cache::remember($key, 3600, function () {
            return User::paginate(10);
        });

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create($validated);

        // Clear cache after storing a new user
        Cache::flush();

        return response()->json($user, 201);
    }

    public function show($id)
    {
        $key = 'user.'.$id;
        $user = Cache::remember($key, 3600, function () use ($id) {
            return User::findOrFail($id);
        });

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'sometimes|string|min:6',
        ]);

        $user = User::findOrFail($id);
        $user->update($validated);

        // Clear cache after updating user
        Cache::forget('user.'.$id);

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        // Clear cache after deleting user
        Cache::forget('user.'.$id);

        return response()->json(['message' => 'User deleted successfully']);
    }
}


