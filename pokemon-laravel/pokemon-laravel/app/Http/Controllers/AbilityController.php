<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ability;

class AbilityController extends Controller
    {
    public function __construct ()
        {

        $this->authorizeResource ( Ability::class, 'ability' );
        }


    public function store ( Request $request )
        {
        $this->authorize ( 'create', Ability::class);

        $validatedData = $request->validate ( [ 
            'name'        => 'required|string',
            'type'        => 'required|string',
            'description' => 'required|string',
            'pokemon_id'  => 'nullable|exists:pokemon,id',
            'effect'      => 'required|string',
        ] );

        $ability = Ability::create ( $validatedData );
        return response ()->json ( $ability, 201 );
        }


    public function index ()
        {
        $abilities = Ability::all ();
        return response ()->json ( $abilities );
        }


    public function show ( $id )
        {
        $ability = Ability::findOrFail ( $id );
        return response ()->json ( $ability );
        }


    public function update ( Request $request, $id )
        {
        $this->authorize ( 'update', Ability::findOrFail ( $id ) );

        $validatedData = $request->validate ( [ 
            'name'        => 'sometimes|required|string',
            'type'        => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'pokemon_id'  => 'sometimes|nullable|exists:pokemon,id',
            'effect'      => 'sometimes|required|string',
        ] );

        $ability = Ability::findOrFail ( $id );
        $ability->update ( $validatedData );

        return response ()->json ( $ability );
        }


    public function destroy ( $id )
        {
        $this->authorize ( 'delete', Ability::findOrFail ( $id ) );

        $ability = Ability::findOrFail ( $id );
        $ability->delete ();

        return response ()->json ( null, 204 );
        }


    public function statusEffects ()
        {
        $abilities = Ability::whereIn ( 'effect', [ 'paralysis', 'burn', 'freeze' ] )->get ();
        return response ()->json ( $abilities );
        }


    public function byType ( $type )
        {
        $abilities = Ability::where ( 'type', $type )->get ();
        return response ()->json ( $abilities );
        }


    public function latest ()
        {
        $abilities = Ability::orderBy ( 'created_at', 'desc' )->take ( 10 )->get ();
        return response ()->json ( $abilities );
        }
    }



