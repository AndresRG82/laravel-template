import React from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { usePage } from '@inertiajs/react'

export default function CaratulaQr({ certificado  }) {
    console.log('Certificado data:', certificado);
    // Función para formatear fecha a DD/MM/YYYY sin desfase de día
    function formatFecha(fecha) {
        if (!fecha) return '';
        // Si el formato es YYYY-MM-DD, parsear como local
        const match = /^\d{4}-\d{2}-\d{2}$/.exec(fecha);
        if (match) {
            const [year, month, day] = fecha.split('-').map(Number);
            // month - 1 porque en JS los meses van de 0 a 11
            const d = new Date(year, month - 1, day);
            return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        }
        // Si no, usar el parseo normal
        const d = new Date(fecha);
        if (isNaN(d)) return fecha;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }
     const {
            props: {
                app: {  app_logo },
            },
        } = usePage()
    // Usar directamente los nombres snake_case del form
    certificado = certificado || {};
    // Importar la fuente Roboto Mono solo para este componente
    React.useEffect(() => {
        const id = 'roboto-mono-font';
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    return (
        <div
            className="bg-white p-8 mt-6 rounded-lg shadow-lg font-serif flex flex-col items-center"
            style={{
                fontFamily: 'Roboto Mono, monospace',
                width: '620px', // Más angosto, pero manteniendo proporción vertical
                minHeight: '900px', // Mantener proporción A4 pero más compacto
                boxSizing: 'border-box',
            }}
        >
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6 border-b pb-4 w-full">
                <div>
                    <h1 className="text-2xl font-bold uppercase">
                        Mecánica Valdebenito EIRL
                    </h1>
                    <p className="text-sm italic">
                        Especialista en Mantención y Reparación de Vehículos
                    </p>
                    <p className="text-sm">RUT: 76.938.678-5</p>
                </div>
                <img
                    src={route('file.show', app_logo)}
                    alt="Logo Mecánica Valdebenito"
                    width={160}
                    height={100}
                    className="object-contain"
                />
            </div>

            {/* Destinatario */}
            <div className="w-full mb-6">
                <p className="text-base mb-0">Señores:</p>
                <p className="text-base mb-0">{certificado.empresa_nombre}</p>
                <p className="text-base">{certificado.empresa_rut}</p>
            </div>

            {/* Cuerpo */}
            <p className="mb-4 w-full">
                Según Orden de Trabajo Nº <strong>{certificado.orden_trabajo}</strong>, el vehículo
                individualizado fue sometido a una mantención preventiva en nuestro servicio técnico.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                <div>
                    <p><strong>Marca:</strong> {certificado.maquinaria_marca}</p>
                    <p><strong>Modelo:</strong> {certificado.maquinaria_modelo}</p>
                    <p><strong>Año:</strong> {certificado.maquinaria_anio}</p>
                    <p><strong>Chasis:</strong> {certificado.maquinaria_numero_motor}</p>
                    <p><strong>Patente:</strong> {certificado.maquinaria_ppu}</p>
                    <p><strong>Kilometraje:</strong> {certificado.maquinaria_kilometraje} kms</p>
                    <p><strong>Fecha de servicio:</strong> {formatFecha(certificado.fecha_servicio)}</p>
                    <p><strong>Tipo de servicio:</strong> {certificado.servicio}</p>
                </div>
                <div className="flex justify-center items-center pl-8">
                    <QRCodeCanvas
                        value={route('certificado.qr', { id: certificado.id })}
                        size={128}
                        className="border p-2"
                    />
                </div>
            </div>

            <p className="mb-6 w-full">
                Certifica que a la fecha, el vehículo descrito se encuentra en óptimas condiciones mecánicas y eléctricas, cumpliendo los estándares exigidos para su operación segura.
            </p>

            {/* Pie */}
            <div className="flex justify-between items-end mt-12 w-full">
                {/* Columna izquierda */}
                <div className="w-1/2">
                    <p><strong>Certificado emitido:</strong> {formatFecha(certificado.fecha_emision)}</p>
                    <p className="mt-6">Sin otro particular, saluda atentamente:</p>
                </div>

                {/* Columna derecha (firma centrada dentro de su espacio) */}
                <div className="w-1/2 text-center">
                    <img
                        src={route('image', { filename: 'firma_sin_fondo.png' })}
                        alt="Firma"
                        width={150}
                        height={60}
                        className="mx-auto object-contain"
                    />
                    <p className="font-sans font-semibold mt-2">Sebastian Valdebenito</p>
                    <p className="text-sm font-sans">Representante Legal</p>
                </div>
            </div>
        </div>
    );
}
