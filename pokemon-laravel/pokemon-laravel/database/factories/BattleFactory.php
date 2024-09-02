<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Battle>
 */
class BattleFactory extends Factory
{
    protected $model = \App\Models\Battle::class;

    public function definition()
    {
        return [
            'pokemon1_id' => \App\Models\Pokemon::inRandomOrder()->first()->id,
            'pokemon2_id' => \App\Models\Pokemon::inRandomOrder()->first()->id,
            'winner' => $this->faker->randomElement(['pokemon1', 'pokemon2']),
        ];
    }
}
