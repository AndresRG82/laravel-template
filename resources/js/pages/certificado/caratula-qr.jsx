import React from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { usePage } from '@inertiajs/react'

const CaratulaQr = React.forwardRef(function CaratulaQr(props, ref) {
    const { certificado: certificadoProp, app_logo: appLogoProp } = props;
    const validCertificado = certificadoProp || {};
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
    // Si no se pasa app_logo como prop, usar usePage
    let app_logo = appLogoProp;
    if (typeof app_logo === 'undefined') {
        try {
            const { props: { app: { app_logo: logoFromPage } } } = usePage();
            app_logo = logoFromPage;
        } catch (e) {
            app_logo = undefined;
        }
    }


    return (
        <div
            ref={ref}
            className="bg-white mx-auto"
            style={{
                fontFamily: 'Times New Roman, Times, serif',
                width: '794px', // A4 width at 96dpi
              //  minHeight: '1123px', // A4 height at 96dpi
                background: '#fff',
                color: '#222',
                boxShadow: 'none',
                border: 'none',
                padding: '40px',
                margin: '0 auto',
                boxSizing: 'border-box',
            }}
        >
            {/* Encabezado */}
            <div
                className="flex justify-between items-center mb-2 pb-2"
                style={{
                    borderBottom: '1px solid #222',
                    boxShadow: 'none',
                    padding: 0,
                    marginBottom: '24px',
                    alignItems: 'flex-end',
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <div style={{textAlign: 'left', width: 'auto', flex: 1}}>
                    <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px'}} className="text-2xl font-bold uppercase">Mecánica Valdebenito EIRL</h1>
                    <p style={{fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '2px'}} className="text-sm italic">Especialista en Mantención y Reparación de Vehículos</p>
                    <p style={{fontSize: '1.05rem', marginBottom: '2px'}} className="text-sm">RUT: 76.938.678-5</p>
                </div>
                {app_logo && (
                    <img
                        src={route('file.show', app_logo)}
                        alt="Logo Mecánica Valdebenito"
                        width={180}
                        height={120}
                        style={{objectFit: 'contain', marginLeft: '16px', flexShrink: 0}}
                        className="object-contain"
                    />
                )}
            </div>

            {/* Destinatario */}
            {(validCertificado.empresa_nombre || validCertificado.empresa_rut) && (
                <div className="w-full" style={{marginBottom: '18px'}}>
                    <p style={{marginBottom: '2px', fontSize: '1.1rem'}} className="mb-0"><strong>Señores:</strong></p>
                    {validCertificado.empresa_nombre && (
                        <p style={{marginBottom: '2px', fontSize: '1.1rem'}} className="text-base mb-0">{validCertificado.empresa_nombre}</p>
                    )}
                    {validCertificado.empresa_rut && (
                        <p style={{fontSize: '1.1rem'}} className="text-base">{validCertificado.empresa_rut}</p>
                    )}
                </div>
            )}

            {/* Cuerpo */}
            <p className="w-full" style={{fontSize: '1.1rem', marginBottom: '12px'}}>
                Según Orden de Trabajo Nº <strong>{validCertificado.orden_trabajo}</strong>, el vehículo
                individualizado fue sometido a una mantención preventiva en nuestro servicio técnico.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-2 w-full" style={{padding: 0, marginBottom: '12px'}}>
                <div style={{fontSize: '1.1rem', lineHeight: '1.7'}}>
                    <p><strong>Marca:</strong> {validCertificado.maquinaria_marca}</p>
                    <p><strong>Modelo:</strong> {validCertificado.maquinaria_modelo}</p>
                    <p><strong>Año:</strong> {validCertificado.maquinaria_anio}</p>
                    <p><strong>Chasis:</strong> {validCertificado.maquinaria_numero_motor}</p>
                    <p><strong>Patente:</strong> {validCertificado.maquinaria_ppu}</p>
                    <p><strong>Kilometraje:</strong> {validCertificado.maquinaria_kilometraje} kms</p>
                    <p><strong>Fecha de servicio:</strong> {formatFecha(validCertificado.fecha_servicio)}</p>
                    <p><strong>Tipo de servicio:</strong> {validCertificado.servicio}</p>
                </div>
                <div className="flex justify-center items-center">
                    <QRCodeCanvas
                        value={route('certificado.qr', { id: validCertificado.id })}
                        size={110}
                        style={{ border: 'none', boxShadow: 'none', padding: 0 }}
                    />
                </div>
            </div>

            <p className="w-full" style={{fontSize: '1.1rem', marginBottom: '12px'}}>
                Certifica que a la fecha, el vehículo descrito se encuentra en óptimas condiciones mecánicas y eléctricas, cumpliendo los estándares exigidos para su operación segura.
            </p>

            {/* Pie */}
            <div style={{ width: '100%', marginTop: '40px', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                {/* Columna izquierda: texto */}
                <div style={{ textAlign: 'left', fontSize: '1.1rem', flex: 1 }}>
                    <p style={{ marginBottom: '8px' }}><strong>Certificado emitido:</strong> {formatFecha(validCertificado.fecha_emision)}</p>
                    <p style={{ marginTop: '32px', marginBottom: '0' }}>Sin otro particular, saluda atentamente:</p>
                </div>
                {/* Columna derecha: firma */}
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <img
                        src={route('image', { filename: 'firma_sin_fondo.png' })}
                        alt="Firma"
                        width={120}
                        height={48}
                        style={{ objectFit: 'contain', margin: '0 auto', display: 'block' }}
                        className="mx-auto object-contain"
                    />
                    <p style={{ fontFamily: 'Times New Roman, Times, serif', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '8px', marginBottom: 0 }}>Sebastian Valdebenito</p>
                    <p style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '1rem', marginTop: 0 }}>Representante Legal</p>
                </div>
            </div>
    </div>
    );
});

export default CaratulaQr;
