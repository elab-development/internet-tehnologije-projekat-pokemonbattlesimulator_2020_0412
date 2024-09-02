<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBattlePokemonTable extends Migration
{
    public function up()
    {
        Schema::create('battle_pokemon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('battle_id')->constrained()->onDelete('cascade');
            $table->foreignId('pokemon_id')->constrained()->onDelete('cascade');
            $table->string('role');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('battle_pokemon');
    }
};
