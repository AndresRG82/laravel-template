<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TipoMaquinaria;

class TipoMaquinariaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear tipos de maquinaria solo si no existen
        TipoMaquinaria::firstOrCreate(['nombre' => 'CAMION-ESTANQUE']);
        TipoMaquinaria::firstOrCreate(['nombre' => 'TRACTO CAMION']);
    }
}
