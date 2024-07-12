<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PokemonTCGService;

class PokemonTCGController extends Controller
{
    protected $pokemonTCGService;

    public function __construct(PokemonTCGService $pokemonTCGService)
    {
        $this->pokemonTCGService = $pokemonTCGService;
    }

    public function getCards(Request $request)
    {
        $pageSize = $request->query('page_size', 10);
        $cards = $this->pokemonTCGService->getCards($pageSize);

        return response()->json($cards);
    }
}


