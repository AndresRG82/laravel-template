import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head, Link } from '@inertiajs/react'
import { Pencil, Trash } from 'lucide-react'
import { useModal } from '@/hooks'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import HasPermission from '@/components/common/has-permission'
import {
    Pagination,
    ModalConfirm,
    SearchInput,
    Dropdown,
    Button,
    Card
} from '@/components/index'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()

    const handleDeleteClick = (machinery) => {
        confirmModal.setData(machinery)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('machineries.destroy', confirmModal.data.id))
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
            title={'Machinery'}
            breadcumbs={[
                { name: 'Dashboard', href: route('dashboard') },
                { name: 'Machinery', href: route('machineries.index') },
            ]}
        >
            <Head title="Maquinaria" />

            <div>
                <Card>
                    <div className="flex justify-between">
                        <HasPermission p="create-machinery">
                            <Link href={route('machineries.create')}>
                                <Button size="sm" type="primary">
                                    Nuevo
                                </Button>
                            </Link>
                        </HasPermission>

                        <div className="flex items-center">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((machinery, index) => (
                                    <tr key={machinery.id}>
                                        <td>{machinery.name}</td>
                                        <td className="text-right">
                                            <Dropdown>
                                                <HasPermission p="update-machinery">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'machineries.edit',
                                                                    machinery
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Pencil className='w-4 h-4'/>
                                                            <div>Editar</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-machinery">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                machinery
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
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </AuthenticatedLayout>
    )
}
