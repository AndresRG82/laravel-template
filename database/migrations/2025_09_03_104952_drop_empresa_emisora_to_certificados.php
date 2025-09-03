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
        Schema::table('certificados', function (Blueprint $table) {
            //
            $table->dropForeign(['empresa_emisora_id']);
            $table->dropColumn('empresa_emisora_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certificados', function (Blueprint $table) {
            //
            $table->ulid('empresa_emisora_id');
            $table->foreign('empresa_emisora_id')->references('id')->on('empresas');
        });
    }
};
