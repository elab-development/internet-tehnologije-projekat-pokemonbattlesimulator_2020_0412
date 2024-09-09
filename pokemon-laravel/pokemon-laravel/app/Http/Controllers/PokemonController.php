<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class PokemonController extends Controller
    {
    public function __construct ()
        {
        $this->authorizeResource ( Pokemon::class, 'pokemon' );
        }

    public function index ()
        {
        $pokemons = Pokemon::all ();
        return response ()->json ( $pokemons );
        }

    public function show ( $id )
        {
        $pokemon = Pokemon::find ( $id );
        if ( ! $pokemon )
            {
            return response ()->json ( [ 'message' => 'Pokemon not found' ], 404 );
            }
        return response ()->json ( $pokemon );
        }

    public function store ( Request $request )
        {
        $this->authorize ( 'create', Pokemon::class);

        $validatedData = $request->validate ( [ 
            'name'        => 'required|string',
            'type'        => 'required|string',
            'attack'      => 'required|integer',
            'defense'     => 'required|integer',
            'hp'          => 'required|integer',
            'speed'       => 'required|integer',
            'description' => 'nullable|string',
        ] );

        $pokemon = Pokemon::create ( $validatedData );
        return response ()->json ( $pokemon, 201 );
        }

    public function update ( Request $request, $id )
        {
        $this->authorize ( 'update', Pokemon::class);

        $pokemon = Pokemon::find ( $id );
        if ( ! $pokemon )
            {
            return response ()->json ( [ 'message' => 'Pokemon not found' ], 404 );
            }

        $validatedData = $request->validate ( [ 
            'name'        => 'sometimes|required|string',
            'type'        => 'sometimes|required|string',
            'attack'      => 'sometimes|required|integer',
            'defense'     => 'sometimes|required|integer',
            'hp'          => 'sometimes|required|integer',
            'speed'       => 'sometimes|required|integer',
            'description' => 'nullable|string',
        ] );

        $pokemon->update ( $validatedData );
        return response ()->json ( $pokemon );
        }

    public function destroy ( $id )
        {
        $this->authorize ( 'delete', Pokemon::class);

        $pokemon = Pokemon::find ( $id );
        if ( ! $pokemon )
            {
            return response ()->json ( [ 'message' => 'Pokemon not found' ], 404 );
            }
        $pokemon->delete ();
        return response ()->json ( [ 'message' => 'Pokemon deleted successfully' ] );
        }

    public function strongest ()
        {
        $pokemon = Pokemon::orderBy ( 'attack', 'desc' )->first ();
        return response ()->json ( $pokemon );
        }

    public function types ()
        {
        $types = Pokemon::distinct ()->pluck ( 'type' );
        return response ()->json ( $types );
        }

    public function byType ( $type )
        {
        $pokemons = Pokemon::where ( 'type', $type )->get ();
        return response ()->json ( $pokemons );
        }

    public function paginatedIndex ( Request $request )
        {
        $perPage  = $request->query ( 'per_page', 10 );
        $pokemons = Pokemon::paginate ( $perPage );
        return response ()->json ( $pokemons );
        }

    public function filterByType ( Request $request )
        {
        $type = $request->query ( 'type' );

        if ( ! $type )
            {
            return response ()->json ( [ 'message' => 'Type parameter is required' ], 400 );
            }

        $pokemons = Pokemon::where ( 'type', $type )->get ();
        return response ()->json ( $pokemons );
        }

    public function indexCache ()
        {
        $pokemons = Cache::remember ( 'pokemons', 60, function ()
            {
            return Pokemon::all ();
            } );

        return response ()->json ( $pokemons );
        }

    public function showCache ( $id )
        {
        $pokemon = Cache::remember ( "pokemon_{$id}", 60, function () use ($id)
            {
            return Pokemon::findOrFail ( $id );
            } );

        return response ()->json ( $pokemon );
        }
    }


