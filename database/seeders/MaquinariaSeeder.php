<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\TipoMaquinaria;
use App\Models\Maquinaria;

class MaquinariaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $path = database_path('seeders/data/equipo.csv');

        if (($handle = fopen($path, 'r')) !== false) {
            $header = fgetcsv($handle, 1000, ';'); // Cabecera

            while (($row = fgetcsv($handle, 1000, ';')) !== false) {
                $data = array_combine($header, $row);

                $tipoMaquinaria = TipoMaquinaria::where('nombre', $data['tipo'])->first();
                $this->command->info($data['tipo'] . ' -> ' . ($tipoMaquinaria ? $tipoMaquinaria->id : 'No encontrado'));

                $maquinaria = new Maquinaria();
                $maquinaria->numero_interno = $data['numero_interno'];
                $maquinaria->ppu = $data['ppu'];
                $maquinaria->tipo_maquinaria_id = $tipoMaquinaria ? $tipoMaquinaria->id : null;
                $maquinaria->anio = $data['anio'];
                $maquinaria->marca = $data['marca'];
                $maquinaria->modelo = $data['modelo'];
                $maquinaria->numero_motor = $data['numero_motor'];
                $maquinaria->vin = $data['vin'];
                $maquinaria->save();
            }

            fclose($handle);
        }
    }
}
