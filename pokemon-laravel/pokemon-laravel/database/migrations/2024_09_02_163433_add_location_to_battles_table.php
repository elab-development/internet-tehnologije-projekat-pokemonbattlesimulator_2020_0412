<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationToBattlesTable extends Migration
{
    public function up()
    {
        Schema::table('battles', function (Blueprint $table) {
            $table->string('location')->nullable(); // Dodajte kolonu za lokaciju bitke
        });
    }

    public function down()
    {
        Schema::table('battles', function (Blueprint $table) {
            $table->dropColumn('location');
        });
    }
};
