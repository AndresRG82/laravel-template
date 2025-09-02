import React from 'react'
import { Head, useForm } from '@inertiajs/react'

import GuestLayout from '@/layouts/default/guest-layout'
import { TextInput, Button } from '@/components/index'

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.email'))
    }

    return (
        <GuestLayout>
            <Head title="Olvidé mi contraseña" />

            <div className="mb-4 text-sm text-gray-600">
                ¿Olvidaste tu contraseña? No hay problema. Simplemente indícanos tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña y así podrás elegir una nueva.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    label="Correo electrónico"
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={onHandleChange}
                    error={errors.email}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="ml-4"
                        processing={processing}
                        onClick={submit}
                    >
                        Enviar enlace para restablecer contraseña
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
