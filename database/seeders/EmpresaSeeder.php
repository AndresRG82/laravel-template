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

        $empresa= new Empresa();
        $empresa->nombre = "MECANICA SEBASTIAN ANDRES VALDEBENITO GONZALEZ E.I.R.L";
        $empresa->direccion = "PASAJE DIAGONAL SUR 33, GOMES CARREÑO, VIÑA DEL AMR";
        $empresa->glosa = "MANTENCION Y REPARACION DE VEHICULOS";
        $empresa->rut = "76.938.678-5";
        $empresa->telefono = "+56972139153";
        $empresa->email = "sebastian@mecanicavaldebenito.cl";
        $empresa->tipo = 'emisora';
        $empresa->save();

        $empresa2= new Empresa();
        $empresa2->nombre = "TRANSPORTES DE COMBUSTIBLES CHILE LTDA";
        $empresa2->rut = "79.904.920-1";
        $empresa2->tipo = 'receptora';
        $empresa2->save();

    }
}
