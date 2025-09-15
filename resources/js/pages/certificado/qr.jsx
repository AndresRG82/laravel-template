import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import CaratulaQr from './caratula-qr';
import Guest from '@/layouts/default/guest-layout';
import CertificadoA4Layout from '@/layouts/default/certificado-a4-layout';
import { Card } from '@/components/index';

export default function CertificadoQr({ certificado, orden_trabajo, error }) {
    const [orden, setOrden] = useState(orden_trabajo || '');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        router.get(route('certificado.validate'), { orden_trabajo: orden }, {
            preserveState: false,
            replace: true,
            onFinish: () => setSubmitting(false)
        });
    };

    if (certificado) {
        return (
            <CertificadoA4Layout title="Certificado">
                <CaratulaQr certificado={certificado}/>
            </CertificadoA4Layout>
        );
    }

    return (
        <Guest>
            <div className="w-full flex justify-center">
                <div className="w-full" style={{ maxWidth: '1000px' }}>
                    <Head title="Validador de Certificado" />
                    <div>
                        <h2 className="text-xl font-bold mb-4">Validador de Certificado</h2>
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <label className="block mb-2 font-semibold">Ingrese N° Orden de Trabajo:</label>
                            <input
                                type="text"
                                className="input input-bordered w-full mb-4"
                                value={orden}
                                onChange={e => setOrden(e.target.value)}
                                placeholder="Ej: 12345"
                                required
                            />
                            {error && <div className="text-red-600 mb-2">{error}</div>}
                            <button
                                type="submit"
                                className={`btn btn-primary w-full${submitting || !orden ? ' btn-disabled' : ''}`}
                                disabled={submitting || !orden}
                            >
                                {submitting ? 'Buscando...' : 'Buscar Certificado'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Guest>
    );
}
