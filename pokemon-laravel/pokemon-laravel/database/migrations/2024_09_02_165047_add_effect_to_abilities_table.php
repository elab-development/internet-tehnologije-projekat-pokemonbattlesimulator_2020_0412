<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEffectToAbilitiesTable extends Migration
{
    public function up()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->text('effect')->nullable()->after('description');
        });
    }

    public function down()
    {
        Schema::table('abilities', function (Blueprint $table) {
            $table->dropColumn('effect');
        });
    }
};
