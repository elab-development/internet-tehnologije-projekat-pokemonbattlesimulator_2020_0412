<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\AbilityController;


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

Route::get('/pokemons/strongest', [PokemonController::class, 'strongest']);
Route::get('/pokemons/types', [PokemonController::class, 'types']);
Route::get('/pokemons/type/{type}', [PokemonController::class, 'byType']);

Route::get('/abilities/status', [AbilityController::class, 'statusEffects']);
Route::get('/abilities/type/{type}', [AbilityController::class, 'byType']);
Route::get('/abilities/latest', [AbilityController::class, 'latest']);




Route::middleware('auth:sanctum')->group(function () {
    // Resource routes for Pokemon
    Route::resource('pokemons', PokemonController::class);

    // Resource routes for Battles
    Route::resource('battles', BattleController::class);

    // Resource routes for Abilities
    Route::resource('abilities', AbilityController::class);

});



