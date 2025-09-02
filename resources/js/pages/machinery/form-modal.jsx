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
        const machinery = modalState.data
        if (machinery !== null) {
            put(route('machineries.update', machinery), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('machineries.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const machinery = modalState.data
        if (isEmpty(machinery) === false) {
            setData(machinery)
            return
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'Machinery'}>
            <div className="form-control space-y-2.5">
                <TextInput
                    name="nombre"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Nombre"
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
                        Batal
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
