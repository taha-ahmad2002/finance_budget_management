'use client';
import Search from '@/app/ui/search';
import Table from '@/app/ui/transfers/table';
import { CreateTransfer } from '@/app/ui/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense, useEffect, useState } from 'react';
import { getTransfers } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function fetchTransfers() {
        try {
            const data = await getTransfers();
            setTransfers(data);
        } catch (err) {
            router.push('/authentication/login');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTransfers();
    }, []);

    if (loading) return <InvoicesTableSkeleton />;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header Section */}
            <div className="flex w-full items-center justify-between mb-6">
                <div>
                    <h1 className={`${lusitana.className} text-3xl font-bold text-gray-800`}>
                        Transfers
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Review and manage all your account transfers here
                    </p>
                </div>
                <CreateTransfer />
            </div>

            {/* Search Bar */}
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search transfers..." />
            </div>

            {/* Table Section */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <Suspense fallback={<InvoicesTableSkeleton />}>
                    <Table transfers={transfers} />
                </Suspense>
            </div>

            {/* Footer Message */}
            <div className="mt-8 flex justify-center text-gray-500 text-sm items-center gap-2">
                <ArrowLeftIcon className="h-5 w-5 text-blue-500" />
                <span>Track and manage your transfers effortlessly.</span>
            </div>
        </div>
    );
}
