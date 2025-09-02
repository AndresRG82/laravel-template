<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;


class Empresa extends Model
{
    use HasUlids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
        'tipo',
    ];

    public function certificadosEmitidos()
    {
        return $this->hasMany(Certificado::class, 'empresa_emisora_id');
    }

    public function certificadosRecibidos()
    {
        return $this->hasMany(Certificado::class, 'empresa_receptora_id');
    }
}
