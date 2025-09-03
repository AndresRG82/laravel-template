import React, { useEffect, useState } from 'react'
    // Estado para mostrar/ocultar los campos de maquinaria
    const [showMaquinaria, setShowMaquinaria] = useState(false);
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
        const { name, value, type, checked } = event.target;
        if (name === 'empresa_nombre') {
            // Buscar la empresa seleccionada
            const empresa = props.empresas.find((e) => String(e.id) === String(value));
            if (empresa) {
                setData({
                    ...data,
                    empresa_nombre: empresa.id,
                    empresa_direccion: empresa.direccion || '',
                    empresa_rut: empresa.rut || '',
                    empresa_telefono: empresa.telefono || '',
                    empresa_email: empresa.email || '',
                });
            } else {
                setData({
                    ...data,
                    empresa_nombre: '',
                    empresa_direccion: '',
                    empresa_rut: '',
                    empresa_telefono: '',
                    empresa_email: '',
                });
            }
            return;
        }
        if (name === 'maquinaria_vin') {
            // Buscar la maquinaria seleccionada
            const maquinaria = props.maquinarias.find((m) => String(m.id) === String(value));
            if (maquinaria) {
                setData({
                    ...data,
                    maquinaria_vin: maquinaria.id,
                    maquinaria_marca: maquinaria.marca || '',
                    maquinaria_modelo: maquinaria.modelo || '',
                    maquinaria_anio: maquinaria.anio || '',
                    maquinaria_numero_motor: maquinaria.numero_motor || '',
                    maquinaria_ppu: maquinaria.ppu || '',
                    maquinaria_kilometraje: maquinaria.kilometraje || '',
                });
            } else {
                setData({
                    ...data,
                    maquinaria_vin: '',
                    maquinaria_marca: '',
                    maquinaria_modelo: '',
                    maquinaria_anio: '',
                    maquinaria_numero_motor: '',
                    maquinaria_ppu: '',
                    maquinaria_kilometraje: '',
                });
            }
            return;
        }
        setData(
            name,
            type === 'checkbox'
                ? checked
                    ? 1
                    : 0
                : value
        );
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
        const certificado = modalState.data
        if (certificado !== null) {
            put(route('certificados.update', certificado), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('certificados.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const certificado = modalState.data
        if (isEmpty(certificado) === false) {
            setData(certificado)
            return
        }
    }, [modalState])

    return (
        <Modal isOpen={modalState.isOpen} onClose={handleClose} title={'Certificado'}>
            <div className="form-control space-y-2.5">
                <TextInput
                    name="orden_trabajo"
                    value={data.orden_trabajo}
                    onChange={handleOnChange}
                    label="Orden de Trabajo"
                    placeholder="Ingrese el orden de trabajo"
                    error={errors.orden_trabajo}
                />

                 {/* Select para empresa */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="empresa_nombre">
                        Empresa
                    </label>
                    <select
                        id="empresa_nombre"
                        name="empresa_nombre"
                        value={data.empresa_nombre || ''}
                        onChange={handleOnChange}
                        className={`input ${errors.empresa_nombre ? 'input-error' : ''}`}
                    >
                        <option value="">Seleccione tipo</option>
                        {props.empresas &&
                            props.empresas.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}>
                                    {empresa.nombre}
                                </option>
                            ))}
                    </select>
                    {errors.empresa_nombre && (
                        <div className="text-red-500 text-xs mt-1">{errors.empresa_nombre}</div>
                    )}
                </div>
                <TextInput
                    name="empresa_rut"
                    value={data.empresa_rut || ''}
                    onChange={handleOnChange}
                    label="RUT de Empresa"
                    placeholder="Ingrese el RUT de la empresa"
                    error={errors.empresa_rut}
                />

                {/* Grupo colapsable de maquinaria */}
                <div className="border rounded-md p-2 bg-gray-50">
                    <button
                        type="button"
                        className="w-full flex justify-between items-center font-semibold text-sm py-2 px-2 focus:outline-none"
                        onClick={() => setShowMaquinaria((prev) => !prev)}
                    >
                        <span>Datos de Maquinaria</span>
                        <span>{showMaquinaria ? '▲' : '▼'}</span>
                    </button>
                    {showMaquinaria && (
                        <div className="space-y-2 mt-2">
                            {/* Select para Maquinaria */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="maquinaria_vin">
                                    Maquinaria
                                </label>
                                <select
                                    id="maquinaria_vin"
                                    name="maquinaria_vin"
                                    value={data.maquinaria_vin || ''}
                                    onChange={handleOnChange}
                                    className={`input ${errors.maquinaria_vin ? 'input-error' : ''}`}
                                >
                                    <option value="">Seleccione tipo</option>
                                    {props.maquinarias &&
                                        props.maquinarias.map((maquinaria) => (
                                            <option key={maquinaria.id} value={maquinaria.id}>
                                                {maquinaria.marca} - {maquinaria.modelo} - {maquinaria.ppu}
                                            </option>
                                        ))}
                                </select>
                                {errors.maquinaria_vin && (
                                    <div className="text-red-500 text-xs mt-1">{errors.maquinaria_vin}</div>
                                )}
                            </div>
                            <TextInput
                                name="maquinaria_marca"
                                value={data.maquinaria_marca || ''}
                                onChange={handleOnChange}
                                label="Marca de Maquinaria"
                                placeholder="Ingrese la marca de la maquinaria"
                                error={errors.maquinaria_marca}
                            />
                            <TextInput
                                name="maquinaria_modelo"
                                value={data.maquinaria_modelo || ''}
                                onChange={handleOnChange}
                                label="Modelo de Maquinaria"
                                placeholder="Ingrese el modelo de la maquinaria"
                                error={errors.maquinaria_modelo}
                            />
                            <TextInput
                                name="maquinaria_anio"
                                value={data.maquinaria_anio || ''}
                                onChange={handleOnChange}
                                label="Año de Maquinaria"
                                placeholder="Ingrese el año de la maquinaria"
                                error={errors.maquinaria_anio}
                            />
                            <TextInput
                                name="maquinaria_numero_motor"
                                value={data.maquinaria_numero_motor || ''}
                                onChange={handleOnChange}
                                label="Número de Motor"
                                placeholder="Ingrese el número de motor"
                                error={errors.maquinaria_numero_motor}
                            />
                            <TextInput
                                name="maquinaria_ppu"
                                value={data.maquinaria_ppu || ''}
                                onChange={handleOnChange}
                                label="PPU de Maquinaria"
                                placeholder="Ingrese el PPU de la maquinaria"
                                error={errors.maquinaria_ppu}
                            />
                            <TextInput
                                name="maquinaria_kilometraje"
                                value={data.maquinaria_kilometraje || ''}
                                onChange={handleOnChange}
                                label="Kilometraje de Maquinaria"
                                placeholder="Ingrese el kilometraje de la maquinaria"
                                error={errors.maquinaria_kilometraje}
                            />
                        </div>
                    )}
                </div>


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
