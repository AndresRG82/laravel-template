<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;


class Certificado extends Model
{
    use HasUlids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'empresa_emisora_id',
        'empresa_receptora_id',
        'servicio_id',
        'maquinaria_id',
        'codigo_qr',
        'fecha_emision',
    ];

    public function empresaEmisora()
    {
        return $this->belongsTo(Empresa::class, 'empresa_emisora_id');
    }

    public function empresaReceptora()
    {
        return $this->belongsTo(Empresa::class, 'empresa_receptora_id');
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }

    public function maquinaria()
    {
        return $this->belongsTo(Maquinaria::class);
    }
}
