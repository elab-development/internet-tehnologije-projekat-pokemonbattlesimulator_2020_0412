<?php

namespace Database\Seeders;

use Database\Factories\BattleFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BattleSeeder extends Seeder
{
    public function run()
    {
        BattleFactory::factory()->count(20)->create();
    }
}
