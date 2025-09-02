<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoMaquinariaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         DB::table('tipo_maquinarias')->insert([
            'nombre' => "CAMION-ESTANQUE",

        ]);
         DB::table('tipo_maquinarias')->insert([
            'nombre' => "TRACTO CAMION",

        ]);
    }
}
