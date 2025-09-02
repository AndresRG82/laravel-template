<?php

namespace App\Http\Controllers;

use App\Models\Maquinaria;
use App\Attributes\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class MaquinariaController extends Controller
{
    #[Permission('view-maquinaria')]
    public function index(Request $request): Response
    {
        $query = Maquinaria::query();

        if ($request->q) {
            // multi columns search 
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('maquinaria/index', [
            'data' => $query->paginate(10),
        ]);
    }

    #[Permission('create-maquinaria')]
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Maquinaria::create([
            'name' => $request->name
        ]);

        return redirect()->route('maquinarias.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been created']);
    }

    #[Permission('update-maquinaria')]
    public function update(Request $request, Maquinaria $maquinaria): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $maquinaria->fill([
            'name' => $request->name,
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
