<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'type', 'description', 'pokemon_id', 'effect',
    ];

    public function pokemon()
    {
        return $this->belongsTo(Pokemon::class);
    }
}

