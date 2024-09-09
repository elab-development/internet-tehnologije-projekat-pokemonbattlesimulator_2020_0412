<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
    {
    public function search ( Request $request )
        {
        $query = User::query ();


        if ( $request->has ( 'name' ) )
            {
            $query->where ( 'name', 'like', '%' . $request->input ( 'name' ) . '%' );
            }

        if ( $request->has ( 'email' ) )
            {
            $query->where ( 'email', 'like', '%' . $request->input ( 'email' ) . '%' );
            }

        if ( $request->has ( 'id' ) )
            {
            $query->where ( 'id', 'like', '%' . $request->input ( 'id' ) . '%' );
            }



        $results = $query->get ();

        return response ()->json ( $results );
        }
    }

