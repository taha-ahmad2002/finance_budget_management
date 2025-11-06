'use client';
import { Suspense, useEffect, useState } from "react";
import CardWrapper from "@/app/ui/dashboard/cards";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { lusitana } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";
import {
    getDayExpenseAmount,
    getDayIncomeAmount,
    getDayTransferAmount, getMonthCategoryExpenseAmount, getMonthCategoryIncomeAmount,
    getMonthExpenseAmount,
    getMonthIncomeAmount,
    getMonthTransferAmount,
    getTodayCategoryExpenseAmount,
    getTodayCategoryIncomeAmount,
} from "@/app/lib/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {
    const router = useRouter();
    const [today_expenses_graph, setTodayExpenses_graph] = useState<number[]>([]);
    const [today_income_graph, setTodayIncome_graph] = useState<number[]>([]);
    const [month_expenses_graph, setMonthExpenses_graph] = useState<number[]>([]);
    const [month_income_graph, setMonthIncome_graph] = useState<number[]>([]);
    const [expenses, setExpenses] = useState(0);
    const [incomes, setIncomes] = useState(0);
    const [transfers, setTransfer] = useState(0);
    const [expensesMonth, setExpensesMonth] = useState(0);
    const [incomesMonth, setIncomesMonth] = useState(0);
    const [transfersMonth, setTransferMonth] = useState(0);

    const expenseLabels = [
        'Social Life', 'Food', 'Apparel', 'Health', 'Culture',
        'Gift', 'Household', 'Transport', 'Pets', 'Education', 'Other'
    ];
    const incomeLabels = ["Allowance", "Salary", "Bonus", "Petty Cash", "Other"];

    const chartBaseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    font: { size: 1 },
                    color: "#374151",
                },
            },
        },
    };

    const today_expenseData = {
        labels: expenseLabels,
        datasets: [
            {
                label: "Expenses ($)",
                data: today_expenses_graph,
                backgroundColor: [
                    "#f87171", "#60a5fa", "#facc15", "#34d399", "#a78bfa",
                    "#fb923c", "#9ca3af", "#ec4899", "#22c55e", "#3b82f6", "#eab308"
                ],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };
    const month_expenseData = {
        labels: expenseLabels,
        datasets: [
            {
                label: "Expenses ($)",
                data: month_expenses_graph,
                backgroundColor: [
                    "#f87171", "#60a5fa", "#facc15", "#34d399", "#a78bfa",
                    "#fb923c", "#9ca3af", "#ec4899", "#22c55e", "#3b82f6", "#eab308",
                ],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    const today_incomeData = {
        labels: incomeLabels,
        datasets: [
            {
                label: "Incomes ($)",
                data: today_income_graph,
                backgroundColor: [
                    "#4ade80", "#38bdf8", "#fbbf24", "#a78bfa", "#f87171"
                ],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    const month_incomeData = {
        labels: incomeLabels,
        datasets: [
            {
                label: "Incomes ($)",
                data: month_income_graph,
                backgroundColor: [
                    "#4ade80", "#38bdf8", "#fbbf24", "#a78bfa", "#f87171"
                ],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    async function getIncomesByCategory() {
        try {
            const incomeValues: number[] = [];
            const todayIncome = await getTodayCategoryIncomeAmount();
            for (const income of todayIncome) {
                incomeValues.push(
                    income["Allowance"] || 0,
                    income["Salary"] || 0,
                    income["Bonus"] || 0,
                    income["Petty Cash"] || 0,
                    income["Other"] || 0
                );
            }
            setTodayIncome_graph(incomeValues);

            const monthIncome = await getMonthCategoryIncomeAmount();
            const monthIncomeValues: number[] = [];

            for (const income of monthIncome) {
                monthIncomeValues.push(
                    income["Allowance"] || 0,
                    income["Salary"] || 0,
                    income["Bonus"] || 0,
                    income["Petty Cash"] || 0,
                    income["Other"] || 0
                );
            }
            setMonthIncome_graph(monthIncomeValues);

        } catch {
            router.push("/authentication/login");
        }
    }

    async function getExpensesByCategory() {
        try {
            const expenseValues: number[] = [];
            const todayExpenses = await getTodayCategoryExpenseAmount();
            for (const expense of todayExpenses) {
                expenseValues.push(
                    expense["Social Life"] || 0,
                    expense["Food"] || 0,
                    expense["Apparel"] || 0,
                    expense["Health"] || 0,
                    expense["Culture"] || 0,
                    expense["Gift"] || 0,
                    expense["Household"] || 0,
                    expense["Transport"] || 0,
                    expense["Pets"] || 0,
                    expense["Education"] || 0,
                    expense["Other"] || 0
                );
            }
            setTodayExpenses_graph(expenseValues);

            const monthExpense = await getMonthCategoryExpenseAmount();
            const monthExpenseValues: number[] = [];

            for (const expense of monthExpense) {
                monthExpenseValues.push(
                    expense["Social Life"] || 0,
                    expense["Food"] || 0,
                    expense["Apparel"] || 0,
                    expense["Health"] || 0,
                    expense["Culture"] || 0,
                    expense["Gift"] || 0,
                    expense["Household"] || 0,
                    expense["Transport"] || 0,
                    expense["Pets"] || 0,
                    expense["Education"] || 0,
                    expense["Other"] || 0
                );
            }
            setMonthExpenses_graph(monthExpenseValues);



        } catch {
            router.push("/authentication/login");
        }
    }

    async function fetchAllData() {
        try {
            const [
                dayExpense,
                monthExpense,
                dayIncome,
                monthIncome,
                dayTransfer,
                monthTransfer,
            ] = await Promise.all([
                getDayExpenseAmount(),
                getMonthExpenseAmount(),
                getDayIncomeAmount(),
                getMonthIncomeAmount(),
                getDayTransferAmount(),
                getMonthTransferAmount(),
            ]);

            setExpenses(dayExpense);
            setExpensesMonth(monthExpense);
            setIncomes(dayIncome);
            setIncomesMonth(monthIncome);
            setTransfer(dayTransfer);
            setTransferMonth(monthTransfer);
        } catch(error) {
            router.push("/authentication/login");
        }
    }

    useEffect(() => {
        fetchAllData();
        getExpensesByCategory();
        getIncomesByCategory();
    }, []);

    return (
        <main className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1
                    className={`${lusitana.className} text-4xl font-bold text-gray-800 tracking-tight`}
                >
                    Dashboard Overview
                </h1>
                <p className="text-gray-500 mt-1">A snapshot of your financial activity</p>
            </div>

            {/* Day Summary */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Today</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <CardWrapper expenses={expenses} incomes={incomes} transfers={transfers} />
                    </Suspense>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-center font-semibold text-gray-700 mb-3">
                            Expenses by Category
                        </h3>
                        <div className="relative h-64">
                            <Pie data={today_expenseData} options={chartBaseOptions} />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-center font-semibold text-gray-700 mb-3">
                            Incomes by Category
                        </h3>
                        <div className="relative h-64">
                            <Pie data={today_incomeData} options={chartBaseOptions} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Month Summary */}
            <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">This Month</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <CardWrapper
                            expenses={expensesMonth}
                            incomes={incomesMonth}
                            transfers={transfersMonth}
                        />
                    </Suspense>
                </div>
                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-center font-semibold text-gray-700 mb-3">
                            Expenses by Category
                        </h3>
                        <div className="relative h-64">
                            <Pie data={month_expenseData} options={chartBaseOptions} />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-center font-semibold text-gray-700 mb-3">
                            Incomes by Category
                        </h3>
                        <div className="relative h-64 flex items-center justify-center">
                            <div className="w-56 h-56">
                                <Pie data={month_incomeData} options={chartBaseOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
