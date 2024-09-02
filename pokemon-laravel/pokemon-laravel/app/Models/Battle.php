<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{
    protected $fillable = [
        'pokemon1_id',
        'pokemon2_id',
        'winner'
    ];

    use HasFactory;
}
