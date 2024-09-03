<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\BattleController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/pokemons', [PokemonController::class, 'index']);
    Route::post('/pokemons', [PokemonController::class, 'store']);
    Route::put('/pokemons/{id}', [PokemonController::class, 'update']);
    Route::delete('/pokemons/{id}', [PokemonController::class, 'destroy']);
});

// Routes for Battles
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/battles', [BattleController::class, 'index']); // Get all battles
    Route::post('/battles', [BattleController::class, 'store']); // Create a new battle
    Route::get('/battles/{id}', [BattleController::class, 'show']); // Get a specific battle by ID
    Route::put('/battles/{id}', [BattleController::class, 'update']); // Update a specific battle by ID
    Route::delete('/battles/{id}', [BattleController::class, 'destroy']); // Delete a specific battle by ID
});


