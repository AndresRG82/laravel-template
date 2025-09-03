import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import { Modal, Button, TextInput } from '@/components/index'

export default function FormModal(props) {
    const { modalState } = props
    const formState = {
        name: '',
    }

    const { data, setData, post, put, processing, errors, clearErrors } =
        useForm(formState)

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleReset = () => {
        modalState.setData(null)
        setData(formState)
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        const empresa = modalState.data
        if (empresa !== null) {
            put(route('empresas.update', empresa), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('empresas.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const empresa = modalState.data
        if (isEmpty(empresa) === false) {
            setData(empresa)
            return
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'Empresa'}>
            <div className="form-control space-y-2.5">
                <TextInput
                    name="nombre"
                    value={data.nombre}
                    onChange={handleOnChange}
                    label="Nombre"
                    placeholder="Ingrese el nombre"
                    error={errors.nombre}
                />
                <TextInput
                    name="rut"
                    value={data.rut}
                    onChange={handleOnChange}
                    label="RUT"
                    placeholder="Ingrese el RUT"
                    error={errors.rut}
                />
                <TextInput
                    name="direccion"
                    value={data.direccion}
                    onChange={handleOnChange}
                    label="Direccion"
                    placeholder="Ingrese la direccion"
                    error={errors.direccion}
                />
                <TextInput
                    name="telefono"
                    value={data.telefono}
                    onChange={handleOnChange}
                    label="Telefono"
                    placeholder="Ingrese el telefono"
                    error={errors.telefono}
                />
                <TextInput
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    label="Email"
                    placeholder="Ingrese el email"
                    error={errors.email}
                />
                <div className="flex items-center space-x-2 mt-4">
                    <Button
                        onClick={handleSubmit}
                        processing={processing}
                        type="primary"
                    >
                        Guardar
                    </Button>
                    <Button onClick={handleClose} type="secondary">
                        Cancelar
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
