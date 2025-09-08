<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Attributes\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class EmpresaController extends Controller
{
    #[Permission('view-empresa')]
    public function index(Request $request): Response
    {
        $query = Empresa::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');
        $query->where('tipo', 'receptora');

        return inertia('empresa/index', [
            'data' => $query->paginate(10),
        ]);
    }

    #[Permission('create-empresa')]
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'rut' => 'required|string|max:20',
            'direccion' => 'string|max:255',
            'telefono' => 'string|max:20',
            'email' => 'email|max:255',
        ]);

        Empresa::create([
            'nombre' => $request->nombre,
            'rut' => $request->rut,
            'direccion' => $request->direccion,
            'telefono' => $request->telefono,
            'email' => $request->email,
        ]);

        return redirect()->route('empresas.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been created']);
    }

    #[Permission('update-empresa')]
    public function update(Request $request, Empresa $empresa): RedirectResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'rut' => 'required|string|max:20',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'email' => 'required|email|max:255',
        ]);

        $empresa->fill([
            'nombre' => $request->nombre,
            'rut' => $request->rut,
            'direccion' => $request->direccion,
            'telefono' => $request->telefono,
            'email' => $request->email,
        ]);

        $empresa->save();

        return redirect()->route('empresas.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been updated']);
    }

    #[Permission('delete-empresa')]
    public function destroy(Empresa $empresa): RedirectResponse
    {
        $empresa->delete();

        return redirect()->route('empresas.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been deleted']);
    }
}
