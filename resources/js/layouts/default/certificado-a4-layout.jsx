import { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { themeChange } from 'theme-change';
import { Toaster } from 'sonner';
import { showToast } from '@/utils';

export default function CertificadoA4Layout({ children, title = 'Certificado' },ref) {
    const {
        props: {
            flash,
            app: { app_name, app_logo },
        },
    } = usePage();

    useEffect(() => {
        if (flash.message !== null) {
            showToast(flash.message.message, flash.message.type);
        }
    }, [flash]);

    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <div
            ref={ref}
            className="min-h-screen flex flex-col items-center justify-center bg-base-300 py-8"
        >
            <Head title={title} />
            <div
                className="flex flex-col items-center"
                style={{
                    width: '800px',
                    minWidth: '800px',
                    padding: '40px',
                    boxSizing: 'border-box',
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                {children}
            </div>
            <Toaster
                theme="system"
                richColors="true"
                toastOptions={{
                    duration: 3000,
                    dismissible: true,
                }}
            />
        </div>
    );
}
