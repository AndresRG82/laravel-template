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
        $userId = auth()->id();
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('orden_trabajo', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');
        $query->where('user_id', $userId);

        return inertia('certificado/index', [
            'data' => $query->paginate(10),
            'empresas' => Empresa::where('tipo', 'receptora')->get(),
            'maquinarias' => Maquinaria::all(),
        ]);

    }

    #[Permission('create-certificado')]
    public function store(Request $request): RedirectResponse
    {


    // Obtener el id del usuario autenticado
    $userId = auth()->id();

    $request->validate([
            'orden_trabajo' => 'required|string|max:255',
            'fecha_emision' => 'required|date',
            'fecha_servicio' => 'required|date',
            'servicio' => 'required|string|max:255',
            'maquinaria_marca' => 'required|string|max:255',
            'maquinaria_modelo' => 'required|string|max:255',
            'maquinaria_anio' => 'required|integer',
            'maquinaria_vin' => 'required|string|max:255',
            'maquinaria_numero_motor' => 'required|string|max:255',
            'maquinaria_ppu' => 'required|string|max:255',
            'maquinaria_kilometraje' => 'required|integer',
            'empresa_nombre' => 'required|string|max:255',
            'empresa_rut' => 'required|string|max:255',
        ]);

        $data = $request->only([
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
            'empresa_rut',
        ]);
        $data['user_id'] = $userId;
        Certificado::create($data);

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

        /**
         * Muestra la carátula QR del certificado o pide el número de orden para buscarlo.
         */
        public function qr(Request $request): \Inertia\Response
        {
            $orden = $request->input('orden_trabajo');
            $certificado = null;
            $error = null;
            if ($orden) {
                $certificado = Certificado::where('orden_trabajo', $orden)->orWhere('id', $orden)->first();

                if (!$certificado) {
                    $error = 'No se encontró certificado para ese número de orden.';
                }
            }
            return \Inertia\Inertia::render('certificado/qr', [
                'certificado' => $certificado,
                'orden_trabajo' => $orden,
                'error' => $error,
            ]);
        }

        public function downloadPdf($id)
    {
        $certificado = Certificado::findOrFail($id);
        $empresa = Empresa::where('nombre', $certificado->empresa_nombre)->first();
        $maquinaria = Maquinaria::where('ppu', $certificado->maquinaria_ppu)->first();

        $data = [
            'certificado' => $certificado,
            'empresa' => $empresa,
            'maquinaria' => $maquinaria,
        ];

        $pdf = \PDF::loadView('certificado.pdf', $data)
            ->setPaper('a4', 'portrait');

        return $pdf->download('certificado_'.$certificado->orden_trabajo.'.pdf');
    }
}
