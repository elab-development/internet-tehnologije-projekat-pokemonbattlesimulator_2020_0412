<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('battles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pokemon1_id')->constrained('pokemon')->onDelete('cascade'); // Spoljni ključ za prvi Pokemon
            $table->foreignId('pokemon2_id')->constrained('pokemon')->onDelete('cascade'); // Spoljni ključ za drugi Pokemon
            $table->string('winner'); // Dodajte kolonu za pobednika
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('battles');
    }
};
