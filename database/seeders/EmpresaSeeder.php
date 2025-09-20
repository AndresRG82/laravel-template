<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Empresa;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.

     **/
    public function run(): void
    {
        // Crear primera empresa solo si no existe (basándose en RUT)
        Empresa::firstOrCreate(
            ['rut' => '76.938.678-5'],
            [
                'nombre' => "MECANICA SEBASTIAN ANDRES VALDEBENITO GONZALEZ E.I.R.L",
                'direccion' => "PASAJE DIAGONAL SUR 33, GOMES CARREÑO, VIÑA DEL AMR",
                'glosa' => "MANTENCION Y REPARACION DE VEHICULOS",
                'telefono' => "+56972139153",
                'email' => "sebastian@mecanicavaldebenito.cl",
                'tipo' => 'emisora',
            ]
        );

        // Crear segunda empresa solo si no existe (basándose en RUT)
        Empresa::firstOrCreate(
            ['rut' => '79.904.920-1'],
            [
                'nombre' => "TRANSPORTES DE COMBUSTIBLES CHILE LTDA",
                'tipo' => 'receptora',
            ]
        );
    }
}
