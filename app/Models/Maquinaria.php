<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;


class Maquinaria extends Model
{
    use HasUlids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'tipo_maquinaria_id',
        'marca',
        'modelo',
        'anio',
        'vin',
        'ppu',
        'kilometraje',
        'numero_interno',
        'numero_motor'

    ];


    public function tipo_maquinaria()
    {
        return $this->belongsTo(TipoMaquinaria::class);
    }

    // Accesor para obtener el nombre del tipo de maquinaria
    public function getTipoMaquinariaNombreAttribute()
    {
        return $this->tipo_maquinaria?->nombre;
    }

}
