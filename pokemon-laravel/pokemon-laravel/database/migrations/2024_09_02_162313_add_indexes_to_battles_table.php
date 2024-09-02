<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexesToBattlesTable extends Migration
{
    public function up()
    {
        Schema::table('battles', function (Blueprint $table) {
            $table->index('pokemon1_id');
            $table->index('pokemon2_id');
        });
    }

    public function down()
    {
        Schema::table('battles', function (Blueprint $table) {
            $table->dropIndex(['pokemon1_id']);
            $table->dropIndex(['pokemon2_id']);
        });
    }
};
