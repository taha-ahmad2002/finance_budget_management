'use client'
import Link from 'next/link';
import {
    CurrencyDollarIcon,
    UserCircleIcon,
    PaperClipIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {useRouter} from "next/navigation";
import {useState} from "react";
import {createTransfer} from "@/app/lib/api";


function getFormattedDate() {
    const date = new Date();
    const iso = date.toISOString(); // e.g. 2025-10-31T12:03:25.969Z
    return iso.substring(0, iso.length - 1) + '000'; // remove 'Z', add 000
}
export default function Form() {

    const router = useRouter();

    const [from,setFrom]=useState("");
    const [amount,setAmount]=useState("");
    const [description,setDescription]=useState("");
    const [note,setNote]=useState("");
    const [to,setTo]=useState("");

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            const created_at =getFormattedDate();
            await createTransfer({
                from_: from.toString(),
                to: to.toString(),
                amount: parseFloat(amount),
                description,
                note,
                created_at,
            });
            router.push('/dashboard/transfers');
        } catch (err) {
            console.error(err);
        }
    }


    const from_ =[
        {
            id:1,
            name:"Card"
        },
        {
            id:2,
            name: "Cash"
        },
        {
            id:3,
            name: "Accounts"
        }
    ];
    const to_=[
        {
            id:1,
            name:"Card"
        },
        {
            id:2,
            name: "Cash"
        },
        {
            id:3,
            name: "Accounts"
        }
    ]
    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Category Name */}
                <div className="mb-4">
                    <label htmlFor="from" className="mb-2 block text-sm font-medium">
                        Choose "From" account
                    </label>
                    <div className="relative">
                        <select
                            id="from"
                            name="from"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a "From" account
                            </option>
                            {from_.map((acc) => (
                                <option key={acc.id} value={acc.name}>
                                    {acc.name}
                                </option>
                            ))}
                        </select>

                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                {/* Account Name */}
                <div className="mb-4">
                    <label htmlFor="to" className="mb-2 block text-sm font-medium">
                        Choose "To" account
                    </label>
                    <div className="relative">
                        <select
                            id="account"
                            name="account"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a "To" account
                            </option>
                            {to_.map((acc) => (
                                <option key={acc.id} value={acc.name}>
                                    {acc.name}
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
                                placeholder="Enter USD amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Invoice Note */}
                <div className="mb-4">
                    <label htmlFor="note" className="mb-2 block text-sm font-medium">
                        Give the note
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="note"
                                name="note"
                                type="text"
                                step="0.01"
                                placeholder="Enter the note"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <PaperClipIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Invoice description */}
                <div className="mb-4">
                    <label htmlFor="note" className="mb-2 block text-sm font-medium">
                        Give the description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="description"
                                name="description"
                                type="text"
                                step="0.01"
                                placeholder="Enter the description"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <PaperClipIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/transfers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Transfer</Button>
            </div>
        </form>
    );
}
