<?php

namespace Database\Factories;

use App\Models\Pokemon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pokemon>
 */
class PokemonFactory extends Factory
{
    protected $model = Pokemon::class;

    public function definition()
    {
        return [
            'name' => $this->faker->unique()->word,
            'type' => $this->faker->randomElement(['Fire', 'Water', 'Grass', 'Electric']),
            'hp' => $this->faker->numberBetween(20, 100),
            'attack' => $this->faker->numberBetween(30, 80),
            'defense' => $this->faker->numberBetween(20, 70),
            'speed' => $this->faker->numberBetween(20, 90),
            'user_id' => 1,
        ];
    }
}



