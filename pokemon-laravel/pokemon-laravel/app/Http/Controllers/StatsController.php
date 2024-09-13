<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
    {
    public function getLocationStats () : JsonResponse
        {
        $stats = DB::table ( 'battles' )
            ->select ( 'location',
                DB::raw ( 'SUM(CASE WHEN winner = "pokemon1" THEN 1 ELSE 0 END) AS pokemon1_wins' ),
                DB::raw ( 'SUM(CASE WHEN winner = "pokemon2" THEN 1 ELSE 0 END) AS pokemon2_wins' ),
            )
            ->groupBy ( 'location' )
            ->orderBy ( 'pokemon1_wins', 'DESC' )
            ->get ();

        return response ()->json ( $stats );
        }
    }

