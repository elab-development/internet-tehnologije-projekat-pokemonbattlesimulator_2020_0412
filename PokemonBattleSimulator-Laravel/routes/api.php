<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\AbilityController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'prefix' => 'v1',
    'namespace' => 'App\Http\Controllers',
], function () {
    Route::get('/pokemons', [PokemonController::class, 'index']);
    Route::get('/pokemons/{id}', [PokemonController::class, 'show']);
    Route::get('/abilities', [AbilityController::class, 'index']);
    Route::get('/abilities/{id}', [AbilityController::class, 'show']);
    Route::get('/battles', [BattleController::class, 'index']);
    Route::get('/battles/{id}', [BattleController::class, 'show']);

    Route::get('pokemons/types/{type}', [PokemonController::class, 'getByType']);
    Route::post('pokemons/search', [PokemonController::class, 'search']);
    Route::delete('/pokemons/{id}', [PokemonController::class, 'destroy']);

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::group([
        'middleware' => 'auth:sanctum'
    ], function () {
        Route::apiResource('pokemons', PokemonController::class)->except(['index', 'show']);
        Route::apiResource('abilities', AbilityController::class)->except(['index', 'show']);
        Route::apiResource('battles', BattleController::class)->except(['index', 'show']);

        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('/users/{user}/add-pokemons', [UserController::class, 'addPokemons'])->name('users.addPokemons');
        Route::post('/users/{user}/get-random-pokemon', [UserController::class, 'getRandomPokemon'])->name('users.getRandomPokemon');
    });
});
