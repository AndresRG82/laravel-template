<?php

namespace App\Http\Controllers;

use App\Models\Machinery;
use App\Attributes\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class MachineryController extends Controller
{
    #[Permission('view-machinery')]
    public function index(Request $request): Response
    {
        $query = Machinery::query();

        if ($request->q) {
            // multi columns search 
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('machinery/index', [
            'data' => $query->paginate(10),
        ]);
    }

    #[Permission('create-machinery')]
    public function create(): Response
    {
        return inertia('machinery/form');
    }

    #[Permission('create-machinery')]
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Machinery::create([
            'name' => $request->name
        ]);

        return redirect()->route('machineries.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been created']);
    }

    #[Permission('update-machinery')]
    public function edit(Machinery $machinery): Response
    {
        return inertia('machinery/form', [
            'machinery' => $machinery,
        ]);
    }

    #[Permission('update-machinery')]
    public function update(Request $request, Machinery $machinery): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $machinery->fill([
            'name' => $request->name,
        ]);

        $machinery->save();

        return redirect()->route('machineries.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been updated']);
    }

    #[Permission('delete-machinery')]
    public function destroy(Machinery $machinery): RedirectResponse
    {
        $machinery->delete();

        return redirect()->route('machineries.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been deleted']);
    }
}
