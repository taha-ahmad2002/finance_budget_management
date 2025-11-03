'use client'
import {Suspense, useEffect, useState} from "react";
import CardWrapper from "@/app/ui/dashboard/cards";
import {CardsSkeleton} from "@/app/ui/skeletons";
import {lusitana} from "@/app/ui/fonts";
import {useRouter} from "next/navigation";
import {getExpenses, getIncomes, getTransfers} from "@/app/lib/api";

export default function Page() {

    const [expenses, setExpenses] = useState(0);
    const router = useRouter();
    const [incomes, setIncomes] = useState(0);
    const [transfers, setTransfer] = useState(0);

    async function fetchExpenses() {
        try {
            let count=0;
            const data = await getExpenses();
            for (let index = 0; index < data.length; index++) {
                count=count+data[index].amount;
            }
            setExpenses(count);
        } catch (err) {
            // setError('Unauthorized — please log in again.');
            router.push('/authentication/login');
        }
    }

    async function fetchIncomes() {
        try {
            let count=0;
            const data = await getIncomes();
            for (let index = 0; index < data.length; index++) {
                count=count+data[index].amount;
            }
            setIncomes(count);
        } catch (err) {
            // setError('Unauthorized — please log in again.');
            router.push('/authentication/login');
        }
    }

    async function fetchTransfer() {
        try {
            let count=0;
            const data = await getTransfers();
            for (let index = 0; index < data.length; index++) {
                count=count+data[index].amount;
            }
            setTransfer(count);
        } catch (err) {
            // setError('Unauthorized — please log in again.');
            router.push('/authentication/login');
        }
    }

    useEffect(() => {
        fetchExpenses();
        fetchIncomes();
        fetchTransfer();
    }, []);

    return (

        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper expenses={expenses} incomes={incomes} transfers={transfers}/>
                </Suspense>
            </div>
        </main>
    );
}