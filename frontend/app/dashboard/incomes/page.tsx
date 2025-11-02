'use client'
import Pagination from '@/app/ui/expenses/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/incomes/table';
import { CreateIncome } from '@/app/ui/expenses/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import {Suspense, useEffect, useState} from 'react';
import {getIncomes} from "@/app/lib/api";
import { useRouter } from "next/navigation";


export default function Page() {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');
    const router = useRouter();

    // const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    async function fetchIncomes() {
        try {
            const data = await getIncomes();
            setIncomes(data);
        } catch (err) {
            // setError('Unauthorized — please log in again.');
            router.push('/authentication/login');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchIncomes();
    }, []);

    if (loading) return <InvoicesTableSkeleton />;
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Incomes</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search incomes..." />
                <CreateIncome />
            </div>
            <Suspense fallback={<InvoicesTableSkeleton />}>
                <Table incomes={incomes} />
            </Suspense>
            {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={7} />
            </div>
        </div>
    );
}