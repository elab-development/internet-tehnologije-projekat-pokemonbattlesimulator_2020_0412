<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ability>
 */
class AbilityFactory extends Factory
{
    protected $model = \App\Models\Ability::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'type' => $this->faker->word,
            'description' => $this->faker->sentence,
            'pokemon_id' => \App\Models\Pokemon::inRandomOrder()->first()->id,
        ];
    }
}
