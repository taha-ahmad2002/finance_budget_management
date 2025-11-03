import Form from '@/app/ui/transfers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page() {


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Transfers', href: '/dashboard/transfers' },
                    {
                        label: 'Create Transfer',
                        href: '/dashboard/transfers/create',
                        active: true,
                    },
                ]}
            />
            <Form  />
        </main>
    );
}