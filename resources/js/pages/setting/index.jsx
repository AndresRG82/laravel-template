import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    Card,
    TextInput,
    Button,
    FormFile,
    TextareaInput,
} from '@/components/index'

const extractValue = (set, key) => {
    const find = set.find((s) => s.key === key)
    if (isEmpty(find) === false) {
        if (find.type === 'image') {
            return find?.url
        }
        return find?.value
    }
    return ''
}

export default function Setting(props) {
    const { setting } = props

    const app_logo_url = extractValue(setting, 'app_logo')
    const welcome_img_url = extractValue(setting, 'welcome_img')
    const { data, setData, post, processing, errors } = useForm({
        app_name: extractValue(setting, 'app_name'),
        app_logo: '',
        welcome_img: '',
    })

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleSubmit = () => {
        post(route('setting.update'))
    }

    return (
        <AuthenticatedLayout
            title={'Configuración'}
            breadcumbs={[
                { name: 'Dashboard', href: route('dashboard') },
                { name: 'Configuración', href: route('setting.index') },
            ]}
        >
            <Head title="Configuración" />

            <div>
                <Card>
                    <div className="text-xl font-bold mb-4 text-base-content">
                        Configuración
                    </div>
                    <TextInput
                        name="Nombre de la Aplicación"
                        value={data.app_name}
                        onChange={handleOnChange}
                        label="Nombre de la Aplicación"
                        error={errors.app_name}
                    />
                    <FormFile
                        label={'Logo de la Aplicación'}
                        onChange={(file_path) => setData('app_logo', file_path)}
                        error={errors.app_logo}
                        url={app_logo_url}
                            filemimes="image/jpg,image/jpeg,image/png,image/svg+xml,image/webp"
                    />
                    <FormFile
                        label={'Imagen de Bienvenida'}
                        onChange={(file_path) => setData('welcome_img', file_path)}
                        error={errors.welcome_img}
                        url={welcome_img_url}
                            filemimes="image/jpg,image/jpeg,image/png,image/svg+xml,image/webp"
                    />

                    <div className="mt-4">
                        <Button
                            onClick={handleSubmit}
                            processing={processing}
                            type="primary"
                        >
                            Guardar
                        </Button>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
