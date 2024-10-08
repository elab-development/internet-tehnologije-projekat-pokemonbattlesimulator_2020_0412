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
    public function up ()
        {
        Schema::create ( 'battles', function (Blueprint $table)
            {
            $table->id ();
            $table->foreignId ( 'pokemon1_id' )->constrained ( 'pokemon' )->onDelete ( 'cascade' );
            $table->foreignId ( 'pokemon2_id' )->constrained ( 'pokemon' )->onDelete ( 'cascade' );
            $table->string ( 'winner' );
            $table->integer ( 'duration' );
            $table->string ( 'location' );
            $table->timestamps ();
            } );
        }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down ()
        {
        Schema::dropIfExists ( 'battles' );
        }
    };
