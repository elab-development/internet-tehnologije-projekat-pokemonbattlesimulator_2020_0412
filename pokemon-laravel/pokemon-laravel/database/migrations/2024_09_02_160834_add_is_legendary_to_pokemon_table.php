<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsLegendaryToPokemonTable extends Migration
    {
    public function up ()
        {
        Schema::table ( 'pokemon', function (Blueprint $table)
            {
            $table->boolean ( 'is_legendary' )->default ( false );
            } );
        }

    public function down ()
        {
        Schema::table ( 'pokemon', function (Blueprint $table)
            {
            $table->dropColumn ( 'is_legendary' );
            } );
        }
    }
;
