<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Battle;

class BattleSeeder extends Seeder
{
    public function run()
    {
        Battle::factory()->count(10)->create();
    }
}

