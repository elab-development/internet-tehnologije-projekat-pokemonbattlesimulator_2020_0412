<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Pokemon;

class PokemonSeeder extends Seeder
{
    public function run()
    {
        Pokemon::factory()->count(10)->create();
    }
}
