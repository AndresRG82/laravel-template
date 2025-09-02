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
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Nombre"
                    placeholder="Ingrese el nombre"
                    error={errors.name}
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
