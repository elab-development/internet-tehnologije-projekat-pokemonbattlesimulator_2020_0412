<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{
    use HasFactory;

    protected $fillable = [
        'pokemon1_id', 'pokemon2_id', 'winner', 'duration', 'location',
    ];

    public function pokemon1()
    {
        return $this->belongsTo(Pokemon::class, 'pokemon1_id');
    }

    public function pokemon2()
    {
        return $this->belongsTo(Pokemon::class, 'pokemon2_id');
    }

    public function pokemons()
    {
        return $this->belongsToMany(Pokemon::class, 'battle_pokemon', 'battle_id', 'pokemon_id')
            ->withPivot('role');
    }
}
