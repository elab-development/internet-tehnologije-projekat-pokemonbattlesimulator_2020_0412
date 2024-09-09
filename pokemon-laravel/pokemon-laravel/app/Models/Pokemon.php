<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
    {
    use HasFactory;

    protected $fillable = [ 
    'name', 'type', 'hp', 'attack', 'defense', 'speed', 'user_id', 'level', 'evolution_stage', 'is_legendary',
    ];

    public function abilities ()
        {
        return $this->hasMany ( Ability::class);
        }

    public function battles ()
        {
        return $this->belongsToMany ( Battle::class, 'battle_pokemon', 'pokemon_id', 'battle_id' )
            ->withPivot ( 'role' );
        }
    }
