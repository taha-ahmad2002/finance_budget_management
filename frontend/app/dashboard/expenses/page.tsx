'use client';
import Search from '@/app/ui/search';
import Table from '@/app/ui/expenses/table';
import { CreateExpense } from '@/app/ui/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense, useEffect, useState } from 'react';
import { getExpenses } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function fetchExpenses() {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (err) {
            router.push('/authentication/login');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    if (loading) return <InvoicesTableSkeleton />;

    // Pie chart mock summary (replace with your real category data if available)
    const categories = [...new Set(expenses.map(e => e.category))];
    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Expense Breakdown ($)',
                data: categories.map(
                    c => expenses.filter(e => e.category === c).reduce((a, b) => a + b.amount, 0)
                ),
                backgroundColor: [
                    '#f87171', '#60a5fa', '#facc15', '#34d399', '#a78bfa',
                    '#fb923c', '#9ca3af', '#ec4899', '#22c55e', '#3b82f6', '#eab308'
                ],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#374151',
                    font: { size: 13 },
                },
            },
        },
    };

    return (
        <main className="p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <div>
                    <h1
                        className={`${lusitana.className} text-4xl font-bold text-gray-800 tracking-tight`}
                    >
                        Expense Tracker
                    </h1>
                    <p className="text-gray-500 mt-1">Manage, analyze, and visualize your spending</p>
                </div>
                <CreateExpense />
            </div>

            {/* Search Bar */}
            <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <Search placeholder="Search expenses..." />
                <p className="text-sm text-gray-500">
                    Total Records: <span className="font-semibold text-gray-800">{expenses.length}</span>
                </p>
            </div>

            {/* Table and Chart Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Expense List</h2>
                    <Suspense fallback={<InvoicesTableSkeleton />}>
                        <Table expenses={expenses} />
                    </Suspense>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
                    <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
                        Category Breakdown
                    </h2>
                    <div className="relative h-64 flex items-center justify-center">
                        <div className="w-56 h-56">
                            <Pie data={data} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
