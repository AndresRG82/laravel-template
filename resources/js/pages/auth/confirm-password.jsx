import React, { useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'

import GuestLayout from '@/layouts/default/guest-layout'
import { TextInput, Button } from '@/components/index'

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.confirm'))
    }

    return (
        <GuestLayout>
            <Head title="Confirmar contraseña" />

            <div className="mb-4 text-sm text-gray-600">
                Esta es un área segura de la aplicación. Por favor, confirma tu contraseña antes de continuar.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <TextInput
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onHandleChange}
                        error={errors.password}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="ml-4"
                        processing={processing}
                        onClick={submit}
                    >
                        Confirmar
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
