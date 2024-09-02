<?php

namespace Database\Factories;

use App\Models\Ability;
use App\Models\Pokemon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ability>
 */
class AbilityFactory extends Factory
{
    protected $model = Ability::class;

    public function definition()
    {

        $pokemon = Pokemon::inRandomOrder()->first();

        return [
            'name' => $this->faker->word,
            'type' => $this->faker->randomElement(['Fire', 'Water', 'Grass', 'Electric']),
            'description' => $this->faker->sentence,
            'pokemon_id' => $pokemon ? $pokemon->id : null,
        ];
    }
}

