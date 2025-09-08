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
        const maquinaria = modalState.data
        if (maquinaria !== null) {
            put(route('maquinarias.update', maquinaria), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('maquinarias.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const maquinaria = modalState.data
        if (isEmpty(maquinaria) === false) {
            setData(maquinaria)
            return
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'Maquinaria'}>
            <div className="form-control space-y-2.5">
                <TextInput
                    name="numero_interno"
                    value={data.numero_interno}
                    onChange={handleOnChange}
                    label="Numero interno"
                    placeholder="Ingrese el Numero interno"
                    error={errors.numero_interno}
                />
                <TextInput
                    name="ppu"
                    value={data.ppu}
                    onChange={handleOnChange}
                    label="PPU"
                    placeholder="Ingrese el PPU"
                    error={errors.ppu}
                />
                {/* Select para tipos_maquinaria */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="tipo_maquinaria_id">
                        Tipo
                    </label>
                    <select
                        id="tipo_maquinaria_id"
                        name="tipo_maquinaria_id"
                        value={data.tipo_maquinaria_id || ''}
                        onChange={handleOnChange}
                        className={`input ${errors.tipo_maquinaria_id ? 'input-error' : ''}`}
                    >
                        <option value="">Seleccione tipo</option>
                        {props.tipos_maquinaria &&
                            props.tipos_maquinaria.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                    </select>
                    {errors.tipo_maquinaria_id && (
                        <div className="text-red-500 text-xs mt-1">{errors.tipo_maquinaria_id}</div>
                    )}
                </div>
                <TextInput
                    name="anio"
                    value={data.anio}
                    onChange={handleOnChange}
                    label="Año"
                    placeholder="Ingrese el año"
                    error={errors.anio}
                />
                <TextInput
                    name="marca"
                    value={data.marca}
                    onChange={handleOnChange}
                    label="Marca"
                    placeholder="Ingrese el Marca"
                    error={errors.marca}
                />
                <TextInput
                    name="modelo"
                    value={data.modelo}
                    onChange={handleOnChange}
                    label="Modelo"
                    placeholder="Ingrese el modelo"
                    error={errors.modelo}
                />
                <TextInput
                    name="numero_motor"
                    value={data.numero_motor}
                    onChange={handleOnChange}
                    label="Numero de motor"
                    placeholder="Ingrese el numero de motor"
                    error={errors.numero_motor}
                />
                <TextInput
                    name="vin"
                    value={data.vin}
                    onChange={handleOnChange}
                    label="VIN"
                    placeholder="Ingrese el VIN"
                    error={errors.vin}
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
