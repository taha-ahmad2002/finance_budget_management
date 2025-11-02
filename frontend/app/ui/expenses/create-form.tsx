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
import {createExpense} from "@/app/lib/api";


function getFormattedDate() {
    const date = new Date();
    const iso = date.toISOString(); // e.g. 2025-10-31T12:03:25.969Z
    return iso.substring(0, iso.length - 1) + '000'; // remove 'Z', add 000
}
export default function Form() {

    const router = useRouter();

    const [category,setCategory]=useState("");
    const [amount,setAmount]=useState("");
    const [description,setDescription]=useState("");
    const [note,setNote]=useState("");
    const [account,setAccount]=useState("");

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            const created_at =getFormattedDate();
            console.log(created_at);
            await createExpense({
                category: category.toString(),         // Ensure correct type
                account: account.toString(),           // or rename to account_id if backend expects that
                amount: parseFloat(amount),            // Ensure float
                description,
                note,
                created_at,
            });
            console.log('Expense successfully created');
            router.push('/dashboard/expenses');
        } catch (err) {
            console.error(err);
        }
    }


    const categories =[
        {
            id:1,
            name:"Social Life"
        },
        {
            id:2,
            name: "Food"
        },
        {
            id:3,
            name: "Apparal"
        },
        {
            id:4,
            name: "Health"
        },
        {
            id:5,
            name: "Culture"
        },
        {
            id:6,
            name: "Gift"
        },
        {
            id:7,
            name: "Household"
        },
        {
            id:8,
            name: "Transport"
        },
        {
            id:9,
            name: "Pets"
        },
        {
            id:10,
            name: "Education"
        }
    ];
    const accounts=[
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
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose Category
          </label>
          <div className="relative">
              <select
                  id="category"
                  name="category"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
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
          {/* Account Name */}
          <div className="mb-4">
              <label htmlFor="account" className="mb-2 block text-sm font-medium">
                  Choose account
              </label>
              <div className="relative">
                  <select
                      id="account"
                      name="account"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      required
                  >
                      <option value="" disabled>
                          Select an account
                      </option>
                      {accounts.map((acc) => (
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
          href="/dashboard/expenses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Expense</Button>
      </div>
    </form>
  );
}
