'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Form from '@/app/ui/incomes/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {getIncomeById} from '@/app/lib/api';

export default function Page() {
    const { id } = useParams(); // ✅ get dynamic route param
    const [income, setIncome] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIncome() {
            try {
                const data = await getIncomeById(Number(id));
                setIncome(data);
            } catch (error) {
                console.error('Failed to fetch income:', error);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchIncome();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!income) return <p>Income not found</p>;

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Incomes', href: '/dashboard/incomes' },
                    {
                        label: 'Edit Income',
                        href: `/dashboard/incomes/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form income={income} />
        </main>
    );
}
