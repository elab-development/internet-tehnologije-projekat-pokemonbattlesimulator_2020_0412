<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ability;

class AbilitySeeder extends Seeder
{
    public function run()
    {
        Ability::factory()->count(10)->create();
    }
}

