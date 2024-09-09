<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use Illuminate\Http\Request;

class BattleController extends Controller
    {
    public function __construct ()
        {
        $this->authorizeResource ( Battle::class, 'battle' );
        }


    public function index ()
        {
        $this->authorize ( 'viewAny', Battle::class);

        return response ()->json ( Battle::all () );
        }


    public function store ( Request $request )
        {
        $this->authorize ( 'create', Battle::class);

        $validatedData = $request->validate ( [ 
            'pokemon1_id' => 'required|exists:pokemons,id',
            'pokemon2_id' => 'required|exists:pokemons,id',
            'winner'      => 'nullable|exists:pokemons,id',
            'duration'    => 'nullable|integer',
            'location'    => 'nullable|string',
        ] );

        $battle = Battle::create ( $validatedData );
        return response ()->json ( $battle, 201 );
        }


    public function show ( $id )
        {
        $this->authorize ( 'view', Battle::findOrFail ( $id ) );

        $battle = Battle::findOrFail ( $id );
        return response ()->json ( $battle );
        }


    public function update ( Request $request, $id )
        {
        $this->authorize ( 'update', Battle::findOrFail ( $id ) );

        $battle = Battle::findOrFail ( $id );

        $validatedData = $request->validate ( [ 
            'pokemon1_id' => 'sometimes|exists:pokemons,id',
            'pokemon2_id' => 'sometimes|exists:pokemons,id',
            'winner'      => 'sometimes|nullable|exists:pokemons,id',
            'duration'    => 'sometimes|nullable|integer',
            'location'    => 'sometimes|nullable|string',
        ] );

        $battle->update ( $validatedData );

        return response ()->json ( $battle );
        }


    public function destroy ( $id )
        {
        $this->authorize ( 'delete', Battle::findOrFail ( $id ) );

        $battle = Battle::findOrFail ( $id );
        $battle->delete ();

        return response ()->json ( [ 'message' => 'Battle deleted successfully' ] );
        }


    public function getBattlesForPokemon1 ( $pokemon_id )
        {
        $battles = Battle::where ( 'pokemon1_id', $pokemon_id )->get ();

        if ( $battles->isEmpty () )
            {
            return response ()->json ( [ 'message' => 'No battles found for this Pokémon' ], 404 );
            }

        return response ()->json ( $battles );
        }


    public function getBattlesForPokemon2 ( $pokemon_id )
        {
        $battles = Battle::where ( 'pokemon2_id', $pokemon_id )->get ();

        if ( $battles->isEmpty () )
            {
            return response ()->json ( [ 'message' => 'No battles found for this Pokémon' ], 404 );
            }

        return response ()->json ( $battles );
        }


    public function getBattlesWherePokemonWon ( $pokemon_id )
        {
        $battles = Battle::where ( 'winner', $pokemon_id )->get ();

        if ( $battles->isEmpty () )
            {
            return response ()->json ( [ 'message' => 'No battles found where this Pokémon won' ], 404 );
            }

        return response ()->json ( $battles );
        }
    }


