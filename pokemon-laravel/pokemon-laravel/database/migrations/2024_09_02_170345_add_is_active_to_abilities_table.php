<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsActiveToAbilitiesTable extends Migration
{
    public function up()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('description');
        });
    }

    public function down()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
