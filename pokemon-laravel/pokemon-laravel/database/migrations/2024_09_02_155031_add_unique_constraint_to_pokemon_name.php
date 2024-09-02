<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUniqueConstraintToPokemonName extends Migration
{
    public function up()
    {
        Schema::table('pokemon', function (Blueprint $table) {
            $table->string('name')->unique()->change();
        });
    }

    public function down()
    {
        Schema::table('pokemon', function (Blueprint $table) {
            $table->dropUnique(['name']);
        });
    }
};
