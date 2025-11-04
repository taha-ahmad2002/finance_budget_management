'use client'
import {Suspense, useEffect, useState} from "react";
import CardWrapper from "@/app/ui/dashboard/cards";
import {CardsSkeleton} from "@/app/ui/skeletons";
import {lusitana} from "@/app/ui/fonts";
import {useRouter} from "next/navigation";
import {
    getDayExpenseAmount,
    getDayIncomeAmount,
    getDayTransferAmount,
    getMonthExpenseAmount,
    getMonthIncomeAmount, getMonthTransferAmount
} from "@/app/lib/api";

export default function Page() {
    const router = useRouter();

    const [expenses, setExpenses] = useState(0);
    const [incomes, setIncomes] = useState(0);
    const [transfers, setTransfer] = useState(0);

    const [expensesMonth, setExpensesMonth] = useState(0);
    const [incomesMonth, setIncomesMonth] = useState(0);
    const [transfersMonth, setTransferMonth] = useState(0);


    async function fetchExpenses() {
        try {
            const dayExpense = await getDayExpenseAmount();
            const monthExpense = await getMonthExpenseAmount();
            setExpenses(dayExpense);
            setExpensesMonth(monthExpense);
        } catch (err) {
            router.push('/authentication/login');
        }
    }

    async function fetchIncomes() {
        try {
            const dayIncome = await getDayIncomeAmount();
            const monthIncome = await getMonthIncomeAmount();
            setIncomesMonth(monthIncome);
            setIncomes(dayIncome);
        } catch (err) {
            router.push('/authentication/login');
        }
    }

    async function fetchTransfers() {
        try {
            const dayTransfer = await getDayTransferAmount();
            const monthTransfer = await getMonthTransferAmount();
            setTransferMonth(monthTransfer);
            setTransfer(dayTransfer);
        } catch (err) {
            // setError('Unauthorized — please log in again.');
            router.push('/authentication/login');
        }
    }

    useEffect(() => {
        fetchExpenses();
        fetchIncomes();
        fetchTransfers();
    }, []);


    return (

        <main className="p-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-6">
                <h1
                    className={`${lusitana.className} text-3xl font-bold text-gray-800 mb-2 tracking-tight`}
                >
                    Dashboard
                </h1>
            </div>


            {/* DAY */}
            <div className="mb-6">
                <h2 className="text-lg text-gray-500 font-medium">Today</h2>
                <div className="h-1 w-16 bg-green-400 rounded-full mt-2"></div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper expenses={expenses} incomes={incomes} transfers={transfers} />
                </Suspense>
            </div>



            {/* MONTH */}
            <div className="mb-6">
                <h2 className="text-lg text-gray-500 font-medium">This Month</h2>
                <div className="h-1 w-16 bg-green-400 rounded-full mt-2"></div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper expenses={expensesMonth} incomes={incomesMonth} transfers={transfersMonth} />
                </Suspense>
            </div>

        </main>

    );
}