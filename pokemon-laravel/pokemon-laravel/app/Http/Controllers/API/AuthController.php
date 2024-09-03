<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validacija zahteva
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Ako validacija ne uspe, vrati grešku
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiraj novog korisnika
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Kreiraj token za korisnika
        $token = $user->createToken('auth_token')->plainTextToken;

        // Vrati odgovor sa tokenom i korisnikom
        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = $request->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }



    public function logout(Request $request) {
        // Dobijamo trenutno autentifikovanog korisnika
        $user = $request->user();

        // Brišemo sve tokene korisnika (odjava sa svih uređaja)
        $user->tokens()->delete();

        // Alternativno, ako želiš obrisati samo trenutni token (odjava sa jednog uređaja):
        // $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }


}

