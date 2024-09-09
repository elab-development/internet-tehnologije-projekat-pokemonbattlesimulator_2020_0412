<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\AbilityController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\PokemonDataController;
use App\Http\Controllers\PasswordController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. Thesep
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post ( '/register', [ AuthController::class, 'register' ] );
Route::post ( '/login', [ AuthController::class, 'login' ] );
Route::post ( '/logout', [ AuthController::class, 'logout' ] )->middleware ( 'auth:sanctum' );
Route::get ( 'battles1/pokemon/{pokemon1_id}', [ BattleController::class, 'getBattlesForPokemon1' ] );
Route::get ( 'battles2/pokemon/{pokemon2_id}', [ BattleController::class, 'getBattlesForPokemon2' ] );
Route::get ( 'battles/wins/pokemon/{pokemon_id}', [ BattleController::class, 'getBattlesWherePokemonWon' ] );
Route::get ( '/pokemons/strongest', [ PokemonController::class, 'strongest' ] );
Route::get ( '/pokemons/types', [ PokemonController::class, 'types' ] );
Route::get ( '/pokemons/type/{type}', [ PokemonController::class, 'byType' ] );
Route::get ( '/abilities/status', [ AbilityController::class, 'statusEffects' ] );
Route::get ( '/abilities/type/{type}', [ AbilityController::class, 'byType' ] );
Route::get ( '/abilities/latest', [ AbilityController::class, 'latest' ] );
Route::post ( '/upload', [ FileUploadController::class, 'upload' ] )->name ( 'file.upload' );
Route::get ( '/export/csv', [ ExportController::class, 'exportCsv' ] );
Route::get ( '/search', [ SearchController::class, 'search' ] );
Route::post ( '/password/email', [ AuthController::class, 'sendResetLinkEmail' ] );
Route::post ( '/forgot-password', [ ForgotPasswordController::class, 'sendResetLinkEmail' ] );
Route::post ( '/reset-password', [ ResetPasswordController::class, 'reset' ] );


Route::middleware ( 'auth:sanctum' )->group ( function ()
    {

    Route::get ( '/pokemons/paginate', [ PokemonController::class, 'paginatedIndex' ] );


    Route::get ( '/pokemons/filter', [ PokemonController::class, 'filterByType' ] );
    } );


Route::middleware ( [ 'auth:sanctum', 'role:admin' ] )->group ( function ()
    {

    Route::resource ( 'pokemons', PokemonController::class);


    Route::resource ( 'battles', BattleController::class);


    Route::resource ( 'abilities', AbilityController::class);


    Route::get ( '/pokemon-data', [ PokemonDataController::class, 'fetchPokemonData' ] );
    } );

Route::controller ( PasswordController::class)->group ( function ()
    {
    Route::post ( 'password/email', 'sendResetLinkEmail' )->name ( 'password.email' );
    Route::post ( 'password/reset', 'reset' )->name ( 'password.update' );
    Route::get ( 'password/reset/{token}', 'showResetForm' )->name ( 'password.reset' );
    } );





