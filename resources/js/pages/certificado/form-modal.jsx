import React, { useEffect, useState } from 'react'
// Estado para mostrar/ocultar los campos de maquinaria
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import CaratulaQr from './caratula-qr'
import { Button, TextInput } from '@/components/index'

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
                    empresa_nombre: empresa.nombre,
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
        <>
            {/* DaisyUI Modal */}
            <input type="checkbox" className="modal-toggle" checked={modalState.isOpen} readOnly />
            <div className={`modal ${modalState.isOpen ? 'modal-open' : ''}`}>
                <div className="modal-box max-w-6xl w-full p-0">
                    <div className='flex w-full flex-col lg:flex-row'>
                        <div className='card bg-base-100 rounded-none w-full lg:w-1/2 flex items-start justify-center'>
                            <div className="form-control p-6 w-full mt-4">
                                <h2 className="font-bold text-xl mb-4 text-center">Certificado</h2>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="orden_trabajo">
                                        Orden de Trabajo
                                    </label>
                                    <input
                                        type="text"
                                        id="orden_trabajo"
                                        name="orden_trabajo"
                                        value={data.orden_trabajo || ''}
                                        onChange={handleOnChange}
                                        placeholder="Type here"
                                        className={`input w-full ${errors.orden_trabajo ? 'input-error' : ''}`}
                                    />
                                    {errors.orden_trabajo && (
                                        <div className="text-red-500 text-xs mt-1">{errors.orden_trabajo}</div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="servicio">
                                        Servicio
                                    </label>
                                    <input
                                        type="text"
                                        id="servicio"
                                        name="servicio"
                                        value={data.servicio || ''}
                                        onChange={handleOnChange}
                                        placeholder="Type here"
                                        className={`input w-full ${errors.servicio ? 'input-error' : ''}`}
                                    />
                                    {errors.servicio && (
                                        <div className="text-red-500 text-xs mt-1">{errors.servicio}</div>
                                    )}
                                </div>
                                {/* DatePicker para fecha_emision */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="fecha_emision">
                                        Fecha de Emisión
                                    </label>
                                    <input
                                        type="date"
                                        id="fecha_emision"
                                        name="fecha_emision"
                                        value={data.fecha_emision || ''}
                                        onChange={handleOnChange}
                                        className={`input w-full ${errors.fecha_emision ? 'input-error' : ''}`}
                                    />
                                    {errors.fecha_emision && (
                                        <div className="text-red-500 text-xs mt-1">{errors.fecha_emision}</div>
                                    )}
                                </div>
                                {/* DatePicker para fecha_emision */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="fecha_emision">
                                        Fecha de Servicio
                                    </label>
                                    <input
                                        type="date"
                                        id="fecha_servicio"
                                        name="fecha_servicio"
                                        value={data.fecha_servicio || ''}
                                        onChange={handleOnChange}
                                        className={`input w-full ${errors.fecha_servicio ? 'input-error' : ''}`}
                                    />
                                    {errors.fecha_servicio && (
                                        <div className="text-red-500 text-xs mt-1">{errors.fecha_servicio}</div>
                                    )}
                                </div>
                                {/* Select para empresa */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="empresa_nombre">
                                        Empresa
                                    </label>
                                    <select
                                        id="empresa_nombre"
                                        name="empresa_nombre"
                                        value={data.empresa_nombre || ''}
                                        onChange={handleOnChange}
                                        className={`input w-full ${errors.empresa_nombre ? 'input-error' : ''}`}
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
                                <input
                                    type="text"
                                    id="empresa_rut"
                                    name="empresa_rut"
                                    value={data.empresa_rut || ''}
                                    onChange={handleOnChange}
                                    placeholder="Type here"
                                    className={`input w-full hidden ${errors.empresa_rut ? 'input-error' : ''}`}
                                />

                                {/* Grupo de maquinaria (sin colapsar) */}
                                <div className="">
                                    {/* Select para Maquinaria */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1" htmlFor="maquinaria_vin">
                                            Maquinaria
                                        </label>
                                        <select
                                            id="maquinaria_vin"
                                            name="maquinaria_vin"
                                            value={data.maquinaria_vin || ''}
                                            onChange={handleOnChange}
                                            className={`input w-full ${errors.maquinaria_vin ? 'input-error' : ''}`}
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

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1" htmlFor="maquinaria_kilometraje">
                                            Kilometraje de la maquinaria
                                        </label>
                                        <input
                                            type="text"
                                            id="maquinaria_kilometraje"
                                            name="maquinaria_kilometraje"
                                            value={data.maquinaria_kilometraje || ''}
                                            onChange={handleOnChange}
                                            placeholder="Type here"
                                            className={`input w-full ${errors.maquinaria_kilometraje ? 'input-error' : ''}`}
                                        />
                                        {errors.maquinaria_kilometraje && (
                                            <div className="text-red-500 text-xs mt-1">{errors.maquinaria_kilometraje}</div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        id="maquinaria_marca"
                                        name="maquinaria_marca"
                                        value={data.maquinaria_marca || ''}
                                        onChange={handleOnChange}
                                        placeholder="Type here"
                                        className={`input w-full hidden ${errors.maquinaria_marca ? 'input-error' : ''}`}
                                    />
                                    <input
                                        type="text"
                                        id="maquinaria_modelo"
                                        name="maquinaria_modelo"
                                        value={data.maquinaria_modelo || ''}
                                        onChange={handleOnChange}
                                        placeholder="Type here"
                                        className={`input w-full hidden ${errors.maquinaria_modelo ? 'input-error' : ''}`}
                                    />
                                    <input
                                        type="text"
                                        id="maquinaria_anio"
                                        name="maquinaria_anio"
                                        value={data.maquinaria_anio || ''}
                                        onChange={handleOnChange}
                                        placeholder="Type here"
                                        className={`input w-full hidden ${errors.maquinaria_anio ? 'input-error' : ''}`}
                                    />
                                    <input
                                        type="text"
                                        id="maquinaria_numero_motor"
                                        name="maquinaria_numero_motor"
                                        value={data.maquinaria_numero_motor || ''}
                                        onChange={handleOnChange}
                                        placeholder="Type here"
                                        className={`input w-full hidden ${errors.maquinaria_numero_motor ? 'input-error' : ''}`}
                                    />
                                    <input
                                        type="text"
                                        id="maquinaria_ppu"
                                        name="maquinaria_ppu"
                                        value={data.maquinaria_ppu || ''}
                                        onChange={handleOnChange}
                                        placeholder="Type here"
                                        className={`input w-full hidden ${errors.maquinaria_ppu ? 'input-error' : ''}`}
                                    />

                                </div>

                                <div className="flex flex-col items-center space-y-2 mt-4">
                                    <div className="flex items-center space-x-2">
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
                            </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className='card bg-base-100 rounded-none w-full lg:w-1/2'>
                            <div className="col-span-1 hidden lg:flex justify-center items-start p-4">
                                <CaratulaQr certificado={data} />
                            </div>
                        </div>
                    </div>
                </div>
                <label className="modal-backdrop" onClick={handleClose}></label>
            </div>
        </>
    )
}
