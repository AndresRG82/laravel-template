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
        Schema::create('certificados', function (Blueprint $table) {
            // id
            $table->ulid('id')->primary();

            // relations (ULID foreign keys)
            $table->ulid('empresa_emisora_id');
            $table->ulid('empresa_receptora_id');
            $table->foreign('empresa_emisora_id')->references('id')->on('empresas');
            $table->foreign('empresa_receptora_id')->references('id')->on('empresas');
            $table->ulid('maquinaria_id');
            $table->foreign('maquinaria_id')->references('id')->on('maquinarias');
            $table->ulid('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            // columns
            $table->string('servicio')->nullable();
            $table->string('codigo_qr')->nullable();
            $table->date('fecha_emision')->nullable();

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
        Schema::dropIfExists('certificados');
    }
};
