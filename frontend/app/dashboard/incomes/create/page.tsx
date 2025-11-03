import Form from '@/app/ui/incomes/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page() {


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Incomes', href: '/dashboard/incomes' },
                    {
                        label: 'Create Income',
                        href: '/dashboard/incomes/create',
                        active: true
                    },
                ]}
            />
            <Form  />
        </main>
    );
}