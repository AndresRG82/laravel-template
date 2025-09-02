<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class PermissionConstant
{
    const LIST = [
        ['label' => 'View Dashboard', 'name' => 'view-dashboard', 'group' => 'General'],

        ['label' => 'Create User', 'name' => 'create-user', 'group' => 'Users'],
        ['label' => 'Update User', 'name' => 'update-user', 'group' => 'Users'],
        ['label' => 'View User', 'name' => 'view-user', 'group' => 'Users'],
        ['label' => 'Delete User', 'name' => 'delete-user', 'group' => 'Users'],

        ['label' => 'Create Role', 'name' => 'create-role', 'group' => 'Users'],
        ['label' => 'Update Role', 'name' => 'update-role', 'group' => 'Users'],
        ['label' => 'View Role', 'name' => 'view-role', 'group' => 'Users'],
        ['label' => 'Delete Role', 'name' => 'delete-role', 'group' => 'Users'],

        ['label' => 'View Setting', 'name' => 'view-setting', 'group' => 'Sertting'],
        ['label' => 'Update Setting', 'name' => 'update-setting', 'group' => 'Setting'],

        // #Add New Permission Below!
		['label' => 'Delete Certificado', 'name' => 'delete-certificado' , 'group' => 'certificado'],
		['label' => 'Update Certificado', 'name' => 'update-certificado' , 'group' => 'certificado'],
		['label' => 'Create Certificado', 'name' => 'create-certificado' , 'group' => 'certificado'],
		['label' => 'View Certificado', 'name' => 'view-certificado' , 'group' => 'certificado'],
		['label' => 'Delete Empresa', 'name' => 'delete-empresa' , 'group' => 'empresa'],
		['label' => 'Update Empresa', 'name' => 'update-empresa' , 'group' => 'empresa'],
		['label' => 'Create Empresa', 'name' => 'create-empresa' , 'group' => 'empresa'],
		['label' => 'View Empresa', 'name' => 'view-empresa' , 'group' => 'empresa'],
		['label' => 'Delete Maquinaria', 'name' => 'delete-maquinaria' , 'group' => 'maquinaria'],
		['label' => 'Update Maquinaria', 'name' => 'update-maquinaria' , 'group' => 'maquinaria'],
		['label' => 'Create Maquinaria', 'name' => 'create-maquinaria' , 'group' => 'maquinaria'],
		['label' => 'View Maquinaria', 'name' => 'view-maquinaria' , 'group' => 'maquinaria'],
		['label' => 'Delete Machinery', 'name' => 'delete-machinery' , 'group' => 'machinery'],
		['label' => 'Update Machinery', 'name' => 'update-machinery' , 'group' => 'machinery'],
		['label' => 'Create Machinery', 'name' => 'create-machinery' , 'group' => 'machinery'],
		['label' => 'View Machinery', 'name' => 'view-machinery' , 'group' => 'machinery'],

    ];

    public static function all()
    {
        return array_merge(self::LIST,  self::modules());
    }

    private static function modules()
    {
        $permissions = [];

        if (Route::has('shortlink.link.index')) {
            $permissions[] = ['label' => 'View Shortlink', 'name' => 'view-shortlink', 'group' => 'Shortlink'];
        }

        if (Route::has('custom-form.forms.index')) {
            $permissions = array_merge($permissions, [
                ['label' => 'Create Custom Form', 'name' => 'create-custom-form', 'group' => 'CustomForm'],
                ['label' => 'Update Custom Form', 'name' => 'update-custom-form', 'group' => 'CustomForm'],
                ['label' => 'View Custom Form', 'name' => 'view-custom-form', 'group' => 'CustomForm'],
                ['label' => 'Delete Custom Form', 'name' => 'delete-custom-form', 'group' => 'CustomForm'],

                ['label' => 'Create Custom Form Record', 'name' => 'create-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'Update Custom Form Record', 'name' => 'update-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'View Custom Form Record', 'name' => 'view-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'Delete Custom Form Record', 'name' => 'delete-custom-form-record', 'group' => 'CustomForm'],
            ]);
        }

        return $permissions;
    }
}
