<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateBattlesTableForeignKeys extends Migration
{
    public function up()
    {
        Schema::table('battles', function (Blueprint $table) {

            $table->dropForeign(['pokemon1_id']);
            $table->dropForeign(['pokemon2_id']);


            $table->foreign('pokemon1_id')->references('id')->on('pokemon')->onDelete('cascade');
            $table->foreign('pokemon2_id')->references('id')->on('pokemon')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('battles', function (Blueprint $table) {

            $table->dropForeign(['pokemon1_id']);
            $table->dropForeign(['pokemon2_id']);
        });
    }
};
