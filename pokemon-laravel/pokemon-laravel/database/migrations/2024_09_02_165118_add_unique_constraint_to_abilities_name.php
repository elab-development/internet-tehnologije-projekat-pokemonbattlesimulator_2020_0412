<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUniqueConstraintToAbilitiesName extends Migration
{
    public function up()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->unique('name');
        });
    }

    public function down()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->dropUnique(['name']);
        });
    }
};
