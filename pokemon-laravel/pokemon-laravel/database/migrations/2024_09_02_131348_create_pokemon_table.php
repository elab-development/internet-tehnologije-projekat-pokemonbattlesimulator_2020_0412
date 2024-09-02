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
        Schema::create('pokemon', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // Dodajte ovu kolonu za vrstu Pokemona
            $table->integer('hp'); // Dodajte ovu kolonu za HP
            $table->integer('attack'); // Dodajte ovu kolonu za Attack
            $table->integer('defense'); // Dodajte ovu kolonu za Defense
            $table->integer('speed'); // Dodajte ovu kolonu za Speed
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Dodajte spoljni ključ za korisnika
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
        Schema::dropIfExists('pokemon');
    }
};
