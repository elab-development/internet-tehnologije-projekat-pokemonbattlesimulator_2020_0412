<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Ability;

class AbilitySeeder extends Seeder
{
    public function run()
    {
        Ability::factory()->count(5)->create();
    }
}
