import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function ({ status }) {
    const title = {
        503: '503: Servicio no disponible',
        500: '500: Error del servidor',
        404: '404: Página no encontrada',
        403: '403: Prohibido',
    }[status]

    const description = {
        503: 'Lo sentimos, estamos realizando tareas de mantenimiento. Por favor, vuelve a intentarlo pronto.',
        500: 'Ups, algo salió mal en nuestros servidores.',
        404: 'Lo sentimos, la página que buscas no se pudo encontrar.',
        403: 'Lo sentimos, no tienes permiso para acceder a esta página.',
    }[status]

    return (
        <div
            style={{
                color: 'red',
                padding: '20px',
                backgroundColor: '#ffe6e6',
            }}
            className="flex flex-row gap-2"
        >
            <Link
                href={route('dashboard')}
                className="flex flex-row items-center gap-2"
            >
                <ArrowLeft />
                    Regresar
            </Link>
            <div className="border-l-2 pl-2 border-red-400">
                <h1>{title}</h1>
                <div>{description}</div>
            </div>
        </div>
    )
}
