import React, { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import { useModal } from '@/hooks';
import jsPDF from 'jspdf';
import CertificadoA4Layout from '@/layouts/default/certificado-a4-layout';
import HasPermission from '@/components/common/has-permission';
import AuthenticatedLayout from '@/layouts/default/authenticated-layout';
import html2canvas from 'html2canvas-pro';


import { Pagination, ModalConfirm, SearchInput, Button, Dropdown, Card } from '@/components/index';
import FormModal from './form-modal';
import CaratulaQr from './caratula-qr';

import { usePage } from '@inertiajs/react';

export default function Index(props) {
    const { app: { app_logo } } = usePage().props;
    const {
        data: { links, data },
    } = props;

    const [search, setSearch] = useState('');


    const confirmModal = useModal();
    const formModal = useModal();
    const [certificadoToPrint, setCertificadoToPrint] = useState(null);
    const [showHidden, setShowHidden] = useState(false);
    const [loadingPdf, setLoadingPdf] = useState(false);
    const hiddenRef = useRef(null);
    const params = {};

    const toggleFormModal = (certificado = null) => {
        formModal.setData(certificado);
        formModal.toggle();
    };

    const handleDeleteClick = (certificado) => {
        confirmModal.setData(certificado);
        confirmModal.toggle();
    };

    const onDelete = () => {
        const certificado = confirmModal.data;
        // Implement delete logic here
        confirmModal.toggle();
    };

    const handleDownloadPdf = (certificado) => {
        setCertificadoToPrint(certificado);
        setShowHidden(true);
        setLoadingPdf(true);
    };

    useEffect(() => {
        const exportPdf = async () => {
            if (showHidden && hiddenRef.current) {
                setTimeout(async () => {
                    const node = hiddenRef.current;
                    if (node) {
                        try {
                            const canvas = await html2canvas(node, { scale: 3 });
                            const imgData = canvas.toDataURL('image/png');
                            const pdf = new jsPDF('p', 'mm', 'a4');
                            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                            pdf.save(`certificado_${certificadoToPrint?.id || 'certificado'}.pdf`);
                        } catch (err) {
                            alert('Error al generar el PDF');
                        }
                    }
                    setShowHidden(false);
                    setCertificadoToPrint(null);
                    setLoadingPdf(false);
                }, 500);
            }
        };
        exportPdf();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showHidden]);

    return (
        <>
            <AuthenticatedLayout
                title={'Certificado'}
                breadcumbs={[{ name: 'Inicio', href: route('dashboard') }, { name: 'Certificado', href: route('certificados.index') }]}
            >
                <Head title="Certificado" />
                <div>
                    <Card>
                        <div className="flex justify-between mb-4">
                            <HasPermission p="create-certificado">
                                <Button
                                    size="sm"
                                    onClick={() => toggleFormModal()}
                                    type="primary"
                                >
                                    Nuevo
                                </Button>
                            </HasPermission>
                            <div className="flex items-center">
                                <SearchInput
                                    id="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    placeholder="Buscar por N° Orden"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table mb-4">
                                <thead>
                                    <tr>
                                        <th>Orden de Trabajo</th>
                                        <th>Empresa</th>
                                        <th>Servicio</th>
                                        <th>Maquinaria</th>
                                        <th>Fecha de Emisión</th>
                                        <th>Acciones</th>
                                        <th>Descargar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((certificado) => (
                                        <tr key={certificado.id}>
                                            <td>{certificado.orden_trabajo}</td>
                                            <td>{certificado.empresa_nombre}</td>
                                            <td>{certificado.servicio}</td>
                                            <td>{certificado.maquinaria_marca} - {certificado.maquinaria_modelo} - {certificado.maquinaria_ppu}</td>
                                            <td>{certificado.fecha_emision}</td>
                                            <td className="text-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleDownloadPdf(certificado)}
                                                    disabled={loadingPdf}
                                                >
                                                    {loadingPdf ? (
                                                        <span className="flex items-center justify-center">
                                                            <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                            </svg>
                                                            Generando...
                                                        </span>
                                                    ) : (
                                                        'Descargar PDF'
                                                    )}
                                                </button>
                                            </td>
                                            <td className="text-end">
                                                <Dropdown>
                                                    <HasPermission p="update-certificado">
                                                        <Dropdown.Item
                                                            onClick={() => toggleFormModal(certificado)}
                                                        >
                                                            <div className="flex space-x-1 items-center">
                                                                <Pencil className='w-4 h-4' />
                                                                <div>Editar</div>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </HasPermission>
                                                    <HasPermission p="delete-certificado">
                                                        <Dropdown.Item
                                                            onClick={() => handleDeleteClick(certificado)}
                                                        >
                                                            <div className="flex space-x-1 items-center">
                                                                <Trash className='w-4 h-4' />
                                                                <div>Eliminar</div>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </HasPermission>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full overflow-x-auto flex lg:justify-center">
                            <Pagination links={links} params={params} />
                        </div>
                    </Card>
                </div>
                <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
                <FormModal modalState={formModal} empresas={props.empresas} maquinarias={props.maquinarias} />
            </AuthenticatedLayout>
            {/* Render hidden printable certificate layout for PDF export */}
            {showHidden && (
                <div
                    ref={hiddenRef}
                    style={{
                        position: 'fixed',
                        top: '-9999px',
                        width: '794px',
                        minHeight: '1123px',
                        zIndex: -1,
                        background: '#fff',
                    }}
                    className="pdf-export"
                >
                    <CaratulaQr certificado={certificadoToPrint} app_logo={app_logo}/>
                </div>
            )}
        </>
    );
}
