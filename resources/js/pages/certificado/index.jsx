import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Pencil, Trash } from 'lucide-react'
import { useModal } from '@/hooks'

import HasPermission from '@/components/common/has-permission'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    Pagination,
    ModalConfirm,
    SearchInput,
    Button,
    Dropdown,
    Card
} from '@/components/index'
import FormModal from './form-modal'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()
    const formModal = useModal()

    const toggleFormModal = (certificado = null) => {
        formModal.setData(certificado)
        formModal.toggle()
    }

    const handleDeleteClick = (certificado) => {
        confirmModal.setData(certificado)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('certificados.destroy', confirmModal.data.id))
        }
    }

    const params = { q: search }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AuthenticatedLayout
            title={'Certificado'}
            breadcumbs={[
                { name: 'Inicio', href: route('dashboard') },
                { name: 'Certificado', href: route('certificados.index') },
            ]}
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
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                placeholder="Buscar por nombre..."
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
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((certificado, index) => (
                                    <tr key={certificado.id}>
                                        <td>{certificado.orden_trabajo}</td>
                                        <td>{certificado.empresa_nombre}</td>
                                        <td>{certificado.servicio}</td>
                                        <td>{certificado.maquinaria_marca} - {certificado.maquinaria_modelo} - {certificado.maquinaria_ppu} </td>
                                        <td>{certificado.fecha_emision}</td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <HasPermission p="update-certificado">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                certificado
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Pencil className='w-4 h-4'/>
                                                            <div>Editar</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-certificado">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                certificado
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Trash className='w-4 h-4'/>
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
            <FormModal modalState={formModal}  empresas={props.empresas} maquinarias={props.maquinarias}/>
        </AuthenticatedLayout>
    )
}
