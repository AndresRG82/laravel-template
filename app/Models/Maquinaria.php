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
        'marca',
        'modelo',
        'anio',
        'chasis',
        'patente',
        'kilometraje',
    ];

    public function certificados()
    {
        return $this->hasMany(Certificado::class);
    }
}
