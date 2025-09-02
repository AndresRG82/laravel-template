<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empresas', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();

            // relations

            // columns
            $table->string('nombre');
            $table->string('direccion')->nullable();
            $table->string('rut')->nullable();
            $table->string('glosa')->nullable();
            $table->string('telefono')->nullable();
            $table->string('email')->nullable();
            $table->enum('tipo', ['emisora', 'receptora']);

            // default
            $table->timestamps();
            $table->softDeletes();
            $table->ulid('created_by')->nullable();
            $table->ulid('updated_by')->nullable();
            $table->ulid('deleted_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
