import { showToast } from '@/utils'
import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { Toaster } from 'sonner'
import { themeChange } from 'theme-change'

export default function CustomLayout({ children }) {
    const {
        props: { flash },
    } = usePage()

    // Maneja la inicialización del cambio de tema
    useEffect(() => {
        themeChange(false)
        // El parámetro 'false' es crucial para proyectos de React
    }, [])

    // Muestra notificaciones flash
    useEffect(() => {
        if (flash?.message?.message && flash?.message?.type) {
            showToast(flash.message.message, flash.message.type)
        }
    }, [flash])

    return (
        <div className="min-h-screen flex flex-col">
            {children}
            {/* Componente Toaster para mostrar notificaciones */}
            <Toaster
                theme="system"
                richColors={true}
                toastOptions={{
                    duration: 3000,
                    dismissible: true,
                }}
            />
        </div>
    )
}
