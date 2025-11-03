'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Form from '@/app/ui/expenses/edit-form';
import Breadcrumbs from '@/app/ui/expenses/breadcrumbs';
import { getExpenseById } from '@/app/lib/api';

export default function Page() {
    const { id } = useParams(); // ✅ get dynamic route param
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExpense() {
            try {
                const data = await getExpenseById(Number(id));
                setExpense(data);
            } catch (error) {
                console.error('Failed to fetch expense:', error);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchExpense();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!expense) return <p>Expense not found</p>;

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
