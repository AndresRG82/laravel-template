import React, { useEffect, useState } from 'react'
import { router, Head, Link, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import { Card, Button, TextInput } from '@/components/index'

export default function Form(props) {
    const {
        props: { errors },
    } = usePage()
    const { machinery } = props

    const [processing, setProcessing] = useState(false)

    const [name, set_name] = useState('')

    const handleSubmit = () => {
        const payload = {
            name: name,
        }
        if (isEmpty(machinery) === false) {
            router.put(
                route('machineries.update', machinery),
                payload,
                {
                    onStart: () => setProcessing(true),
                    onFinish: (e) => {
                        setProcessing(false)
                    },
                }
            )
            return
        }
        router.post(
            route('machineries.store'),
            payload,
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            }
        )
    }

    useEffect(() => {
        if (!isEmpty(machinery)) {
            set_name(machinery.name)
        }
    }, [machinery])

    return (
        <AuthenticatedLayout
            title={'Machinery'}
            breadcumbs={[
                { name: 'Dashboard', href: route('dashboard') },
                { name: 'Machinery', href: route('machineries.index') },
                {
                    name: 'Form',
                    href: machinery
                        ? route('machineries.edit', machinery)
                        : route('machineries.create'),
                },
            ]}
        >
            <Head title="Maquinaria" />

            <div>
                <Card>
                    <div className="flex flex-col gap-2 justify-between">
                        <TextInput
                            name="nombre"
                            value={name}
                            onChange={(e) => set_name(e.target.value)}
                            label="Nombre"
                            error={errors.name}
                        />
                        <div className="flex items-center">
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSubmit}
                                    processing={processing}
                                    type="primary"
                                >
                                    Guardar
                                </Button>
                                <Link href={route('machineries.index')}>
                                    <Button type="secondary">
                                        Kembali
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
