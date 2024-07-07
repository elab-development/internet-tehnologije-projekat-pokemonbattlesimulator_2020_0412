<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropColumnFromBattles extends Migration
{
    public function up()
    {
        Schema::table('battles', function (Blueprint $table) {
            $table->dropColumn('location');
        });
    }

    public function down()
    {
        Schema::table('battles', function (Blueprint $table) {
            $table->string('location')->nullable()->after('status');
        });
    }
}
