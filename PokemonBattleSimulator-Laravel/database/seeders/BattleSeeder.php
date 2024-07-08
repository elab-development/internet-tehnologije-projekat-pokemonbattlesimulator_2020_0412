<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Battle;

class BattleSeeder extends Seeder
{
    public function run()
    {
        Battle::factory()->count(20)->create();
    }
}
