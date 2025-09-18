import { Head, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/index';
import React from 'react';
import CustomLayout from '@/layouts/default/custom-layout';
// Importa íconos de Heroicons si los estás usando, o directamente emojis
import { Phone, FileCheck2, LogIn } from 'lucide-react'; // Iconos Lucide
// Componente para la sección de héroe
const HeroSection = () => {
    const {
        props: {
            app: { app_name, app_logo, welcome_img },
        },
    } = usePage();

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-8 lg:p-16">
            {/* Contenido de texto y botones */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left md:w-1/2 mb-8 md:mb-0">
                {/* Logo de la aplicación */}
                <img
                    src={route('file.show', app_logo)}
                    alt={`${app_name} logo`}
                    className="h-24 md:h-32 mb-4 object-contain" // 'object-contain' para asegurar que el logo se vea completo
                />

                {/* Título principal */}
                <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 text-primary">
                    Mecánica Valdebenito E.I.R.L.
                </h1>

                {/* Subtítulo descriptivo */}
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-secondary">
                    Confianza y rendimiento en cada mantención.
                </h2>

                {/* Descripción de la empresa */}
                <p className="mb-6 text-lg text-base-content">
                    Especialistas en maquinaria. Brindamos un servicio integral de mantención y reparación para asegurar seguridad, potencia y desempeño en cada kilómetro recorrido.
                </p>

                {/* Botones de acción principal */}
                <div className="flex flex-col md:flex-row gap-4">
                    <Link className="btn btn-primary btn-lg" href={route('contact.show')}>
                        <Phone className="h-6 w-6 mr-2" /> Contáctanos
                    </Link>
                    <Link className="btn btn-outline btn-secondary btn-lg" href={route('certificado.validate')}>
                        <FileCheck2 className="h-6 w-6 mr-2" /> Validar Certificado
                    </Link>
                </div>


            </div>

            {/* Imagen principal - con alt descriptivo y optimización */}
            <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
                <img
                    src={welcome_img ? route('file.show', welcome_img) : '/images/hero/hero-1.webp'} // Sugerencia de WebP
                    alt="Motor limpio de maquinaria industrial en taller moderno, simbolizando mantenimiento y rendimiento de Mecánica Valdebenito." // Alt descriptivo para SEO y accesibilidad
                    className="rounded-3xl shadow-2xl object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
            </div>
        </div>
    );
};

// Página de bienvenida
export default function Welcome() {
    return (
        <CustomLayout>
            {/* Head optimizado para SEO */}
            <div className="absolute top-6 left-6 flex items-center space-x-4  mb-4">
                <Link href={route('login')} className="btn btn-ghost btn-sm" as="a">
                    <LogIn className="h-5 w-5 mr-2" /> Iniciar Sesión
                </Link>
            </div>
            <Head title="Mecánica Valdebenito E.I.R.L. | Mantenimiento y Reparación de Maquinaria" />
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="max-w-7xl w-full p-8 shadow-2xl rounded-3xl bg-base-100">
                    <HeroSection />
                </div>
            </div>
        </CustomLayout>
    );
}
