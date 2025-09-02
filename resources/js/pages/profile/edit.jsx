import React from 'react'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import { Card } from '@/components/index'
import UpdatePasswordForm from './partials/update-password-form'
import UpdateProfileInformationForm from './partials/update-profile-information-form'

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            title={'Perfil'}
            breadcumbs={[
                { name: 'Dashboard', href: route('dashboard') },
                { name: 'Perfil', href: route(route().current()) },
            ]}
        >
            <Head title="Perfil" />

            <div>
                <div className="mx-auto space-y-6">
                    <Card>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </Card>

                    <Card>
                        <UpdatePasswordForm className="max-w-xl" />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
