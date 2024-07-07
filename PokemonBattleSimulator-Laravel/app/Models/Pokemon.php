<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'type', 'level', 'health', 'attack', 'defense', 'evolves',
    ];

    // Relationships
    public function abilities()
    {
        return $this->belongsToMany(Ability::class)->withTimestamps();
    }

    public function battles()
    {
        return $this->hasMany(Battle::class);
    }
}
