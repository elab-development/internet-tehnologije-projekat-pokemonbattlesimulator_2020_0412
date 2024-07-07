<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyTablePokemonsAddColumn extends Migration
{
    public function up()
    {
        Schema::table('pokemons', function (Blueprint $table) {
            $table->string('nickname')->nullable()->after('name');
        });
    }

    public function down()
    {
        Schema::table('pokemons', function (Blueprint $table) {
            $table->dropColumn('nickname');
        });
    }
}
