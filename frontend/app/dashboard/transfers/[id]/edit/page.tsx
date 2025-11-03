'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Form from '@/app/ui/transfers/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import {getTransferById} from '@/app/lib/api';

export default function Page() {
    const { id } = useParams(); // ✅ get dynamic route param
    const [transfer, setTransfer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTransfer() {
            try {
                const data = await getTransferById(Number(id));
                setTransfer(data);
            } catch (error) {
                console.error('Failed to fetch transfer:', error);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchTransfer();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!transfer) return <p>Transfer not found</p>;

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Transfers', href: '/dashboard/transfers' },
                    {
                        label: 'Edit Transfer',
                        href: `/dashboard/transfers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form transfer={transfer} />
        </main>
    );
}
