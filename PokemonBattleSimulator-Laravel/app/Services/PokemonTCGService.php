<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PokemonTCGService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = 'https://api.pokemontcg.io/v2/cards';
    }

    public function getCards($pageSize = 10)
    {
        $response = Http::get($this->baseUrl, [
            'pageSize' => $pageSize,
        ]);

        return $response->json();
    }
}


