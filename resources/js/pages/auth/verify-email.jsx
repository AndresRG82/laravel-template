import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

import GuestLayout from '@/layouts/default/guest-layout'
import { Button } from '@/components/index'

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm()

    const submit = (e) => {
        e.preventDefault()

        post(route('verification.send'))
    }

    return (
        <GuestLayout>
            <Head title="Verificación de correo electrónico" />

            <div className="mb-4 text-sm text-gray-600">
                ¡Gracias por registrarte! Antes de comenzar, ¿puedes verificar tu dirección de correo electrónico haciendo clic en el enlace que te acabamos de enviar? Si no recibiste el correo, con gusto te enviaremos otro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionaste durante el registro.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button processing={processing} onClick={submit}>
                        Reenviar correo de verificación
                    </Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    )
}
