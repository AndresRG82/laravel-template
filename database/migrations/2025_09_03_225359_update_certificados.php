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
        //

          Schema::table('certificados', function (Blueprint $table) {
            //
            $table->dropForeign(['empresa_receptora_id']);
            $table->dropColumn('empresa_receptora_id');
            $table->dropForeign(['maquinaria_id']);
            $table->dropColumn('maquinaria_id');

            $table->string('maquinaria_marca')->nullable();
            $table->string('maquinaria_modelo')->nullable();
            $table->year('maquinaria_anio')->nullable();
            $table->string('maquinaria_vin')->nullable();
            $table->string('maquinaria_numero_motor')->nullable();
            $table->string('maquinaria_ppu')->nullable();
            $table->integer('maquinaria_kilometraje')->nullable();

            $table->string('empresa_nombre');
            $table->string('empresa_direccion')->nullable();
            $table->string('empresa_rut')->nullable();
            $table->string('empresa_telefono')->nullable();
            $table->string('empresa_email')->nullable();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certificados', function (Blueprint $table) {
            $table->dropColumn([
                'maquinaria_marca',
                'maquinaria_modelo',
                'maquinaria_anio',
                'maquinaria_vin',
                'maquinaria_numero_motor',
                'maquinaria_ppu',
                'maquinaria_kilometraje',
                'empresa_nombre',
                'empresa_direccion',
                'empresa_rut',
                'empresa_telefono',
                'empresa_email',
            ]);

             $table->ulid('empresa_receptora_id');
            $table->foreign('empresa_receptora_id')->references('id')->on('empresas');
            $table->ulid('maquinaria_id');
            $table->foreign('maquinaria_id')->references('id')->on('maquinarias');

        });
    }
};
