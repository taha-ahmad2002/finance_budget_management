'use client';

import {InvoiceForm} from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditInvoiceForm({
  invoice,
}: {
  invoice: InvoiceForm;
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
  return (
    <form>
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
              defaultValue={invoice.customer_id}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
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
                      defaultValue={invoice.customer_id}
                  >
                      <option value="" disabled>
                          Select a customer
                      </option>
                      {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
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
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
