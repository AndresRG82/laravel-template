<?php

namespace App\Http\Controllers;

use App\Models\Certificado;
use App\Models\Empresa;
use App\Models\Maquinaria;

use App\Attributes\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CertificadoController extends Controller
{
    #[Permission('view-certificado')]
    public function index(Request $request): Response
    {
    $query = Certificado::query();

        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('certificado/index', [
            'data' => $query->paginate(10),
            'empresas' => Empresa::where('tipo', 'receptora')->get(),
            'maquinarias' => Maquinaria::all(),
        ]);

    }

    #[Permission('create-certificado')]
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Certificado::create([
            'name' => $request->name
        ]);

        return redirect()->route('certificados.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been created']);
    }

    #[Permission('update-certificado')]
    public function update(Request $request, Certificado $certificado): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $certificado->fill([
            'name' => $request->name,
        ]);

        $certificado->save();

        return redirect()->route('certificados.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been updated']);
    }

    #[Permission('delete-certificado')]
    public function destroy(Certificado $certificado): RedirectResponse
    {
        $certificado->delete();

        return redirect()->route('certificados.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been deleted']);
    }
}
