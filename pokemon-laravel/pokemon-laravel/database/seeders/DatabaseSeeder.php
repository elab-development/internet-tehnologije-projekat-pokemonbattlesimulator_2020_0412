<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            PokemonSeeder::class,
            BattleSeeder::class,
            AbilitySeeder::class,
        ]);

        $this->call([
            RolesSeeder::class,
            UserSeeder::class,
        ]);
    }
}

