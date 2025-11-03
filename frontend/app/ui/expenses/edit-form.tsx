'use client';

import {ExpenseForm} from '@/app/lib/definitions';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {updateExpense} from "@/app/lib/api";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

function getFormattedDate() {
    const date = new Date();
    const iso = date.toISOString(); // e.g. 2025-10-31T12:03:25.969Z
    return iso.substring(0, iso.length - 1) + '000'; // remove 'Z', add 000
}

export default function EditInvoiceForm({
  expense,
}: {
  expense: ExpenseForm;
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
            name:"Social Life"
        },
        {
            id:2,
            name: "Food"
        },
        {
            id:3,
            name: "bills"
        },
        {
            id:4,
            name: "loan payment"
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
            const created_at = getFormattedDate();
            await updateExpense({
                id: expense.id,
                amount: amount || expense.amount,
                description: description || expense.description,
                note: note || expense.note,
                category: category || expense.category,
                account: account || expense.account,
                created_at: getFormattedDate(),
            });

            console.log('Expense successfully updated');
            router.push('/dashboard/expenses');
        } catch (err) {
            console.error('Error updating expense:', err);
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
              defaultValue={expense.account}
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
                      defaultValue={expense.category}
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
                defaultValue={expense.amount}
                placeholder="Enter USD amount"
                onChange={event => setAmount(event.target.value)}
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
                          defaultValue={expense.note}
                          placeholder="Enter a note"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          onChange={(e) => setNote(e.target.value)}
                      />
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
                          defaultValue={expense.description}
                          placeholder="Enter a description"
                          onChange={(e) => setDescription(e.target.value)}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        <Button type="submit">Edit Expense</Button>
      </div>
    </form>
  );
}
