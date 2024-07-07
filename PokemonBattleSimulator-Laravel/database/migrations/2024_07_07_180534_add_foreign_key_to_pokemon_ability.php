<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyToPokemonAbility extends Migration
{
    public function up()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->foreign('pokemon_id')
                  ->references('id')
                  ->on('pokemons')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->dropForeign(['pokemon_id']);
        });
    }
}
