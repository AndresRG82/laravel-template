import React, { useState } from 'react';
import { useForm, Head  } from '@inertiajs/react';
import CustomLayout from '@/layouts/default/custom-layout';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => {
                setSuccess('¡Mensaje enviado correctamente!');
                reset();
            },
            onError: () => setSuccess(''),
        });
    };

    return (
        <CustomLayout>

            <Head title="Mecánica Valdebenito E.I.R.L. | Mantenimiento y Reparación de Maquinaria" />
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="max-w-7xl w-full p-8 shadow-2xl rounded-3xl bg-base-100">

                        <h1 className="text-3xl font-bold mb-6 text-center">Contáctanos</h1>
                        {success && (
                            <div className="alert alert-success mb-4">
                                <span>{success}</span>
                            </div>
                        )}
                        {Object.keys(errors).length > 0 && (
                            <div className="alert alert-error mb-4">
                                <ul className="list-disc pl-5">
                                    {Object.values(errors).map((error, i) => (
                                        <li key={i}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label htmlFor="name" className="label">
                                    <span className="label-text font-medium">Nombre</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="input input-bordered w-full"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email" className="label">
                                    <span className="label-text font-medium">Correo electrónico</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="input input-bordered w-full"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="message" className="label">
                                    <span className="label-text font-medium">Mensaje</span>
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    className="textarea textarea-bordered w-full"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={processing}
                            >
                                {processing ? 'Enviando...' : 'Enviar'}
                            </button>
                        </form>

                </div>
            </div>
        </CustomLayout>
    );
}
