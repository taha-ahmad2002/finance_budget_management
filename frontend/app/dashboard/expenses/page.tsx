'use client'
import Pagination from '@/app/ui/expenses/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/expenses/table';
import {CreateExpense} from '@/app/ui/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import {Suspense, useEffect, useState} from 'react';
import {getExpenses} from "@/app/lib/api";
import { useRouter } from "next/navigation";


export default function Page() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');
    const router = useRouter();

    // const searchParams = await props.searchParams;
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    async function fetchExpenses() {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (err) {
            // setError('Unauthorized — please log in again.');
            router.push('/authentication/login');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchExpenses();
    }, []);

    if (loading) return <InvoicesTableSkeleton />;
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Expenses</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search expenses..." />
                <CreateExpense />
            </div>
            <Suspense fallback={<InvoicesTableSkeleton />}>
                <Table expenses={expenses} />
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