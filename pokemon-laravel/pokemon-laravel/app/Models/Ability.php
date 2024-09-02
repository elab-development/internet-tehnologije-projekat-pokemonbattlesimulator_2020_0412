<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
    protected $fillable = [
        'name',
        'type',
        'description',
        'pokemon_id'
    ];

    use HasFactory;
}
