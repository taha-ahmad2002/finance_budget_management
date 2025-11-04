'use client'
import Search from '@/app/ui/search';
import Table from '@/app/ui/transfers/table';
import { CreateTransfer } from '@/app/ui/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import {Suspense, useEffect, useState} from 'react';
import { getTransfers} from "@/app/lib/api";
import { useRouter } from "next/navigation";


export default function Page() {
    const [transfers, setTransfer] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');
    const router = useRouter();

    // const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    async function fetchTransfer() {
        try {
            const data = await getTransfers();
            setTransfer(data);
        } catch (err) {
            // setError('Unauthorized — please log in again.');
            router.push('/authentication/login');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchTransfer();
    }, []);

    if (loading) return <InvoicesTableSkeleton />;
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Trasnfers</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search tranfers..." />
                <CreateTransfer />
            </div>
            <Suspense fallback={<InvoicesTableSkeleton />}>
                <Table transfers={transfers} />
            </Suspense>
        </div>
    );
}