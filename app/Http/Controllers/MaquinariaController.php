<?php

namespace App\Http\Controllers;

use App\Models\Maquinaria;
use App\Models\TipoMaquinaria;
use App\Attributes\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class MaquinariaController extends Controller
{
    #[Permission('view-maquinaria')]
    public function index(Request $request): Response
    {
    $query = Maquinaria::with('tipo_maquinaria');

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('maquinaria/index', [
            'data' => $query->paginate(10),
            'tipos_maquinaria' => TipoMaquinaria::select('id', 'nombre')->get(),
        ]);
    }

    #[Permission('create-maquinaria')]
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'tipo_maquinaria_id' => 'required|integer|exists:tipo_maquinarias,id',
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'anio' => 'integer|min:1900|max:' . date('Y'),
            'vin' => 'nullable|string|max:255',
            'patente' => 'nullable|string|max:255',
            'kilometraje' => 'nullable|integer|min:0',
            'numero_interno' => 'nullable|string|max:255',
            'numero_motor' => 'nullable|string|max:255',
        ]);

        Maquinaria::create([
            'tipo_maquinaria_id' => $request->tipo_maquinaria_id,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'anio' => $request->anio,
            'vin' => $request->vin,
            'ppu' => $request->ppu,
            'kilometraje' => $request->kilometraje,
            'numero_interno' => $request->numero_interno,
            'numero_motor' => $request->numero_motor,
        ]);

        return redirect()->route('maquinarias.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been created']);
    }

    #[Permission('update-maquinaria')]
    public function update(Request $request, Maquinaria $maquinaria): RedirectResponse
    {
        $request->validate([
            'tipo_maquinaria_id' => 'required|integer|exists:tipo_maquinarias,id',
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'anio' => 'integer|min:1900|max:' . date('Y'),
            'vin' => 'nullable|string|max:255',
            'patente' => 'nullable|string|max:255',
            'kilometraje' => 'nullable|integer|min:0',
            'numero_interno' => 'nullable|string|max:255',
            'numero_motor' => 'nullable|string|max:255',
        ]);

        $maquinaria->fill([
            'tipo_maquinaria_id' => $request->tipo_maquinaria_id,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'anio' => $request->anio,
            'vin' => $request->vin,
            'patente' => $request->patente,
            'kilometraje' => $request->kilometraje,
            'numero_interno' => $request->numero_interno,
            'numero_motor' => $request->numero_motor,
        ]);

        $maquinaria->save();

        return redirect()->route('maquinarias.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been updated']);
    }

    #[Permission('delete-maquinaria')]
    public function destroy(Maquinaria $maquinaria): RedirectResponse
    {
        $maquinaria->delete();

        return redirect()->route('maquinarias.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been deleted']);
    }
}
