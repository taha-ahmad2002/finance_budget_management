import Form from '@/app/ui/expenses/edit-form';
import Breadcrumbs from '@/app/ui/expenses/breadcrumbs';
import { notFound } from 'next/navigation';
import {getExpenseById} from "@/app/lib/api";

export default async function Page(props: { params: Promise<{ id: number }> }) {

    const params= await props.params;
    const id=params.id;
    const expense= await getExpenseById(id);
    if (!expense) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Expenses', href: '/dashboard/expenses' },
                    {
                        label: 'Edit Expense',
                        href: `/dashboard/expenses/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form expense={expense} />
        </main>
    );
}