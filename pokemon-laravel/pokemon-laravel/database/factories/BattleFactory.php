<?php

namespace Database\Factories;

use App\Models\Battle;
use App\Models\Pokemon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Battle>
 */
class BattleFactory extends Factory
{
    protected $model = Battle::class;

    public function definition()
    {

        $pokemon1 = Pokemon::inRandomOrder()->first();
        $pokemon2 = Pokemon::where('id', '!=', $pokemon1->id)->inRandomOrder()->first();

        return [
            'pokemon1_id' => $pokemon1 ? $pokemon1->id : null,
            'pokemon2_id' => $pokemon2 ? $pokemon2->id : null,
            'winner' => $this->faker->randomElement(['pokemon1', 'pokemon2']),
        ];
    }
}

