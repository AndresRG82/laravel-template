<?php

namespace App\Constants;

class SettingConstant
{
    public static function all()
    {
        return [
            ['key' => 'app_name', 'value' => 'Mecanica Valdebenito', 'type' => 'text'],
            ['key' => 'app_logo', 'value' => '', 'type' => 'image'],
            ['key' => 'welcome_img', 'value' => '', 'type' => 'image'],
        ];
    }
}
