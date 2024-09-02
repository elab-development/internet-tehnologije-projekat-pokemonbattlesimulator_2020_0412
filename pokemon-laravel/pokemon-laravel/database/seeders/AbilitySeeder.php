<?php

namespace Database\Seeders;

use Database\Factories\AbilityFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AbilitySeeder extends Seeder
{
    public function run()
    {
        AbilityFactory::factory()->count(30)->create(); // Generiši 30 random sposobnosti
    }
}
