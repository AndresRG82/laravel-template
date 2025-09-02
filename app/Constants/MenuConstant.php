<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class MenuConstant
{
    public static function all()
    {
        $menu = [
            [
                'name' => 'Dashboard',
                'show' => true,
                'icon' => 'MonitorDot',
                'route' => route('dashboard'),
                'active' => 'dashboard',
                'permission' => 'view-dashboard',
            ],
            [
                'name' => 'Usuario',
                'show' => true,
                'icon' => 'UserRoundCog',
                'items' => [
                    [
                        'name' => 'Roles',
                        'show' => true,
                        'route' => route('roles.index'),
                        'active' => 'roles.*',
                        'permission' => 'view-role',
                    ],
                    [
                        'name' => 'Usuarios',
                        'show' => true,
                        'route' => route('users.index'),
                        'active' => 'users.index',
                        'permission' => 'view-user',
                    ],
                ],
            ],
            [
                'name' => 'Configuración',
                'show' => true,
                'icon' => 'Cog',
                'route' => route('setting.index'),
                'active' => 'setting.index',
                'permission' => 'view-setting',
            ],

            // # Add Generated Menu Here!

            [
                'name' => 'Certificado',
                'show' => true,
                'icon' => 'TableOfContents',
                'route' => route('certificados.index'),
                'active' => 'certificados.*',
                'permission' => 'view-certificado',
            ],
            [
                'name' => 'Empresa',
                'show' => true,
                'icon' => 'TableOfContents',
                'route' => route('empresas.index'),
                'active' => 'empresas.*',
                'permission' => 'view-empresa',
            ],
            [
                'name' => 'Maquinaria',
                'show' => true,
                'icon' => 'TableOfContents',
                'route' => route('maquinarias.index'),
                'active' => 'maquinarias.*',
                'permission' => 'view-maquinaria',
            ],            [
                'name' => 'Maquinaria',
                'show' => true,
                'icon' => 'TableOfContents',
                'route' => route('machineries.index'),
                'active' => 'machineries.*',
                'permission' => 'view-machinery',
            ],        ];

        if (Route::has('shortlink.link.index')) {
            $menu = array_merge(
                $menu,
                [[
                    'name' => 'Accesos Directos',
                    'show' => true,
                    'icon' => 'Globe',
                    'route' => route('shortlink.link.index'),
                    'active' => 'shortlink.link.*',
                    'permission' => 'view-shortlink',
                ]],
            );
        }

        if (Route::has('custom-form.forms.index')) {
            $menu = array_merge($menu, [[
                'name' => 'Formulario Personalizado',
                'show' => true,
                'icon' => 'FormInput',
                'route' => route('custom-form.forms.index'),
                'active' => 'custom-form.forms.*',
                'permission' => 'view-custom-form',
            ]]);
        }

        return $menu;
    }

    public static function handle()
    {
        return self::all();
    }
}
