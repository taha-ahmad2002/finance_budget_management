'use client';

import {IncomeForm} from '@/app/lib/definitions';
import {
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {updateIncome} from "@/app/lib/api";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

function getFormattedDate() {
    const date = new Date();
    const iso = date.toISOString(); // e.g. 2025-10-31T12:03:25.969Z
    return iso.substring(0, iso.length - 1) + '000'; // remove 'Z', add 000
}

export default function EditInvoiceForm({
                                            income,
                                        }: {
    income: IncomeForm;
}) {

    const accounts=[
        {
            id: 1,
            name: 'Cash'
        },
        {
            id:2,
            name: 'Card'
        },
        {
            id:3,
            name: 'Account'
        }
    ];
    const categories =[
        {
            id:1,
            name:"Allowance"
        },
        {
            id:2,
            name: "Salary"
        },
        {
            id:3,
            name: "Petty cash"
        },
        {
            id:4,
            name: "Bonus"
        },
        {
            id:5,
            name: "Other"
        }
    ];


    const router = useRouter();
    const [category,setCategory]=useState("");
    const [amount,setAmount]=useState("");
    const [description,setDescription]=useState("");
    const [note,setNote]=useState("");
    const [account,setAccount]=useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // ✅ prevent page reload
        try {
            await updateIncome({
                id: income.id,
                amount: amount || income.amount,
                description: description || income.description,
                note: note || income.note,
                category: category || income.category,
                account: account || income.account,
                created_at: getFormattedDate(),
            });

            router.push('/dashboard/incomes');
        } catch (err) {
            console.error('Error updating income:', err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Account Name */}
                <div className="mb-4">
                    <label htmlFor="accounts" className="mb-2 block text-sm font-medium">
                        Choose account
                    </label>
                    <div className="relative">
                        <select
                            id="accounts"
                            name="accounts"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={income.account}
                            onChange={e=>setAccount(e.target.value)}
                        >
                            <option value="" disabled>
                                Select an account
                            </option>
                            {accounts.map((account) => (
                                <option key={account.id} value={account.name}>
                                    {account.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>



                {/* Category Name */}
                <div className="mb-4">
                    <label htmlFor="category" className="mb-2 block text-sm font-medium">
                        Choose category
                    </label>
                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={income.category}
                            onChange={event => setCategory(event.target.value)}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>


                {/* Invoice Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={income.amount}
                                placeholder="Enter USD amount"
                                onChange={(event) => {
                                    let value = event.target.value;

                                    // Prevent spaces
                                    if (value.includes(' ')) return;

                                    // Prevent negative values
                                    const num = parseFloat(value);
                                    if (num < 0) return;

                                    setAmount(value);
                                }}
                                onKeyDown={(e) => {
                                    // Block spacebar key completely
                                    if (e.key === ' ') e.preventDefault();
                                }}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />

                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Invoice note */}
                <div className="mb-4">
                    <label htmlFor="note" className="mb-2 block text-sm font-medium">
                        Write a note
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="note"
                                name="note"
                                type="text"
                                step="0.01"
                                defaultValue={income.note}
                                placeholder="Enter a note"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                onChange={(e) => {
                                    let value = e.target.value.toLowerCase();
                                    // Capitalize first letter and letter after '. '
                                    value = value.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                                    setNote(value);
                                }}                              />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>


                {/* Invoice description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Write a description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="note"
                                name="note"
                                type="text"
                                step="0.01"
                                defaultValue={income.description}
                                placeholder="Enter a description"
                                onChange={(e) => {
                                    let value = e.target.value.toLowerCase();
                                    // Capitalize first letter and letter after '. '
                                    value = value.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                                    setDescription(value);
                                }}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/incomes"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Income</Button>
            </div>
        </form>
    );
}
