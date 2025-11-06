'use client';
import Search from '@/app/ui/search';
import Table from '@/app/ui/incomes/table';
import { CreateIncome } from '@/app/ui/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense, useEffect, useState } from 'react';
import { getIncomes } from '@/app/lib/api';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function fetchIncomes() {
        try {
            const data = await getIncomes();
            setIncomes(data);
        } catch {
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
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header Section */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1
                        className={`${lusitana.className} text-4xl font-bold text-gray-800 tracking-tight`}
                    >
                        Incomes
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Review and manage all your income sources here
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <CreateIncome />
                </div>
            </header>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <Search placeholder="Search incomes..." />
            </div>

            {/* Table Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <Suspense fallback={<InvoicesTableSkeleton />}>
                    <Table incomes={incomes} />
                </Suspense>
            </section>

            {/* Summary / Footer */}
            <footer className="mt-10 text-center text-sm text-gray-400">
                <p>💰 Keep track of your earnings effortlessly.</p>
            </footer>
        </main>
    );
}
