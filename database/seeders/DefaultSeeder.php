<?php

namespace Database\Seeders;

use App\Constants\PermissionConstant;
use App\Constants\SettingConstant;
use App\Models\Default\Permission;
use App\Models\Default\Role;
use App\Models\Default\Setting;
use App\Models\Default\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insertar configuraciones solo si no existen
        foreach (SettingConstant::all() as $setting) {
            $exists = Setting::where('key', $setting['key'])->exists();
            if (!$exists) {
                Setting::insert(['id' => Str::ulid(), ...$setting]);
            }
        }

        // Insertar permisos solo si no existen
        foreach (PermissionConstant::all() as $permission) {
            $exists = Permission::where('name', $permission['name'])->exists();
            if (!$exists) {
                Permission::insert(['id' => Str::ulid(), ...$permission]);
            }
        }

        // Crear rol admin solo si no existe
        $role = Role::firstOrCreate(['name' => 'admin']);

        // Asignar permisos al rol solo si no los tiene
        $permissions = Permission::all();
        foreach ($permissions as $permission) {
            $rolePermissionExists = $role->rolePermissions()
                ->where('permission_id', $permission->id)
                ->exists();

            if (!$rolePermissionExists) {
                $role->rolePermissions()->create(['permission_id' => $permission->id]);
            }
        }

        // Crear usuarios solo si no existen
        User::firstOrCreate(
            ['email' => 'root@admin.com'],
            [
                'name' => 'Super Administrator',
                'password' => bcrypt('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Administator',
                'password' => bcrypt('password'),
                'role_id' => $role->id,
            ]
        );
    }
}
