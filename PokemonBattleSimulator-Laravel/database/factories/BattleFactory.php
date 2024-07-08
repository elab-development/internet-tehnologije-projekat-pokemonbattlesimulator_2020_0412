<?php

namespace Database\Factories;

use App\Models\Battle;
use App\Models\Pokemon;
use Illuminate\Database\Eloquent\Factories\Factory;

class BattleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Battle::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $pokemon1_id = Pokemon::factory()->create()->id;
        $pokemon2_id = Pokemon::factory()->create()->id;
        $result = $this->faker->randomElement(['win', 'loss', 'tie']);
        $comments = $this->faker->sentence();

        return [
            'pokemon1_id' => $pokemon1_id,
            'pokemon2_id' => $pokemon2_id,
            'result' => $result,
            'comments' => $comments,
        ];
    }
}
