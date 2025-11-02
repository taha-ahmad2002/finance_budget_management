import Form from '@/app/ui/expenses/create-form';
import Breadcrumbs from '@/app/ui/expenses/breadcrumbs';

export default async function Page() {


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Expenses', href: '/dashboard/expenses' },
                    {
                        label: 'Create Expense',
                        href: '/dashboard/expenses/create',
                        active: true,
                    },
                ]}
            />
            <Form  />
        </main>
    );
}