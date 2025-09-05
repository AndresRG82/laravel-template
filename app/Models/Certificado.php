<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;


class Certificado extends Model
{
    use HasUlids;


    protected $fillable = [
        'codigo_qr',
        'orden_trabajo',
        'fecha_emision',
        'fecha_servicio',
        'servicio',
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
        'user_id',
    ];

}
