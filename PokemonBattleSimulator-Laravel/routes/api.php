<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\AbilityController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\PokemonTCGController;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

Route::get('/test-connection', function () {
    try {
        DB::connection()->getPdo();
        return "Connected successfully to the database!";
    } catch (\Exception $e) {
        return "Could not connect to the database: " . $e->getMessage();
    }
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/upload', [FileUploadController::class, 'upload'])->name('upload.file');
Route::get('/pokemon-cards', [PokemonTCGController::class, 'getCards']);

Route::group([
    'prefix' => 'v1',
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

    Route::get('/pokemons/export/csv', [PokemonController::class, 'exportCSV'])->name('pokemons.export.csv');
    Route::get('/pokemons/export/ics', [PokemonController::class, 'exportICS'])->name('pokemons.export.ics');
    Route::get('/pokemons/export/pdf', [PokemonController::class, 'exportPDF'])->name('pokemons.export.pdf');

    Route::group([
        'middleware' => ['auth:sanctum', 'role:admin']
    ], function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('/users/{user}/add-pokemons', [UserController::class, 'addPokemons'])->name('users.addPokemons');
        Route::post('/users/{user}/get-random-pokemon', [UserController::class, 'getRandomPokemon'])->name('users.getRandomPokemon');
        Route::post('/users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.resetPassword');

        Route::apiResource('pokemons', PokemonController::class)->except(['index', 'show']);
        Route::apiResource('abilities', AbilityController::class)->except(['index', 'show']);
        Route::apiResource('battles', BattleController::class)->except(['index', 'show']);
        Route::apiResource('users', UserController::class)->except(['index', 'show']);
    });
});





