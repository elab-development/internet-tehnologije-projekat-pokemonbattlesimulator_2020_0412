<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{
    use HasFactory;

    protected $fillable = [
        'result', 'battle_time',
    ];

    // Relationships
    public function pokemons()
    {
        return $this->belongsToMany(Pokemon::class)->withTimestamps();
    }
}
