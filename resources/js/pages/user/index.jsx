import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Pencil, Trash } from 'lucide-react'

import HasPermission from '@/components/common/has-permission'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    Pagination,
    Dropdown,
    Card,
    ModalConfirm,
    SearchInput,
    Button,
} from '@/components/index'
import FormModal from './form-modal'
import { useModal } from '@/hooks'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()
    const formModal = useModal()

    const toggleFormModal = (user = null) => {
        formModal.setData(user)
        formModal.toggle()
    }

    const handleDeleteClick = (user) => {
        confirmModal.setData(user)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('users.destroy', confirmModal.data.id))
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
            title={'Usuarios'}
            breadcumbs={[
                { name: 'Panel principal', href: route('dashboard') },
                { name: 'Usuarios', href: route('users.index') },
            ]}
        >
            <Head title="Usuarios" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-user">
                            <Button
                                size="sm"
                                onClick={() => toggleFormModal()}
                                type="primary"
                            >
                                Nuevo
                            </Button>
                        </HasPermission>
                        <div>
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Rol</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>
                                            {user.role === null
                                                ? 'Sistema'
                                                : user.role?.name}
                                        </td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <HasPermission p="update-user">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Pencil className="w-4 h-4" />
                                                            <div>Editar</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-user">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <Trash className="w-4 h-4" />
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
                        <Pagination
                            links={links}
                            params={params}
                        />
                    </div>
                </Card>
            </div>
            <ModalConfirm
                onConfirm={onDelete}
                modalState={confirmModal}
            />
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
