<?php

use App\Http\Controllers\CertificadoController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\MaquinariaController;
use App\Http\Controllers\MachineryController;
use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\Default\GeneralController;
use App\Http\Controllers\Default\PermissionController;
use App\Http\Controllers\Default\ProfileController;
use App\Http\Controllers\Default\RoleController;
use App\Http\Controllers\Default\SettingController;
use App\Http\Controllers\Default\UserController;
use Illuminate\Support\Facades\Route;

// define module as main route
// Route::get('/', [App\Module\Shortlink\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', function () {
    return inertia('Welcome');
});

Route::get('files/{file}', [FileController::class, 'show'])->name('file.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');
    Route::get('/maintance', [GeneralController::class, 'maintance'])->name('maintance');

    // User
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Permission
    Route::delete('_permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
    Route::put('_permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::post('_permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::get('_permissions', [PermissionController::class, 'index'])->name('permissions.index');

    // Role
    Route::resource('/roles', RoleController::class);

    // Setting
    Route::get('/settings', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('setting.update');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // #Admin

    //
});

// #Guest


// Route::get('/{link:code}', [App\Module\Shortlink\Controllers\HomeController::class, 'redirect'])->name('redirect')

Route::get('maquinarias', [MaquinariaController::class,'index'])->name('maquinarias.index');
Route::post('maquinarias', [MaquinariaController::class,'store'])->name('maquinarias.store');
Route::put('maquinarias/{maquinaria}', [MaquinariaController::class,'update'])->name('maquinarias.update');
Route::delete('maquinarias/{maquinaria}', [MaquinariaController::class,'destroy'])->name('maquinarias.destroy');
Route::get('empresas', [EmpresaController::class,'index'])->name('empresas.index');
Route::post('empresas', [EmpresaController::class,'store'])->name('empresas.store');
Route::put('empresas/{empresa}', [EmpresaController::class,'update'])->name('empresas.update');
Route::delete('empresas/{empresa}', [EmpresaController::class,'destroy'])->name('empresas.destroy');
Route::get('certificados', [CertificadoController::class,'index'])->name('certificados.index');
Route::post('certificados', [CertificadoController::class,'store'])->name('certificados.store');
Route::put('certificados/{certificado}', [CertificadoController::class,'update'])->name('certificados.update');
Route::delete('certificados/{certificado}', [CertificadoController::class,'destroy'])->name('certificados.destroy');
Route::get('certificados/{id}/pdf', [\App\Http\Controllers\CertificadoController::class, 'downloadPdf'])->name('certificados.downloadPdf');

Route::get('validador', [CertificadoController::class,'qr'])->name('certificado.validate');
Route::get('/image/{filename}', function ($filename) {
    $path = storage_path('app/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return Response::make($file, 200, [
        'Content-Type' => $type,
        'Content-Disposition' => 'inline; filename="' . $filename . '"'
    ]);
})->name('image');
