import { formatDateToLocal } from '@/app/lib/utils';
import {Transfer} from "@/app/lib/definitions";
import { TrashIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {deleteTransfer} from "@/app/lib/api";
import { UpdateTransfer} from "@/app/ui/buttons";

export default function Table({transfers}: {
    transfers: Transfer[];
}) {
    const router = useRouter();

    const getRowColor = (date: string) => {
        // Extract just the YYYY-MM-DD part so all same-day entries match
        const dateKey = date.split('T')[0];

        const colorPalette = [
            'bg-pink-100 hover:bg-pink-200',
            'bg-purple-100 hover:bg-purple-200',
            'bg-blue-100 hover:bg-blue-200',
            'bg-green-100 hover:bg-green-200',
            'bg-yellow-100 hover:bg-yellow-200',
            'bg-orange-100 hover:bg-orange-200',
            'bg-teal-100 hover:bg-teal-200',
        ];

        // Simple stable hash
        const hash = Array.from(dateKey).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colorIndex = hash % colorPalette.length;

        return colorPalette[colorIndex];
    };

    async function deleteTransfer_(id: number) {
        try {
            await deleteTransfer(id);
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mt-8 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 shadow-lg">
                    {/* Mobile view */}
                    <div className="md:hidden p-3 space-y-4">
                        {transfers?.map((transfer) => (
                            <div
                                key={transfer.id}
                                className={`w-full rounded-xl border shadow-sm transition-all duration-200 ${getRowColor(transfer.created_at)}`}
                            >
                                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">{transfer.note}</p>
                                        <p className="text-sm text-gray-500">{transfer.description}</p>
                                    </div>
                                    {/*<InvoiceStatus status={income.account} />*/}
                                </div>
                                <div className="flex w-full items-center justify-between px-4 py-3">
                                    <div>
                                        <p className="text-xl font-bold text-gray-800">${transfer.amount}</p>
                                        <p className="text-sm text-gray-500">{formatDateToLocal(transfer.created_at)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateTransfer id={transfer.id}/>


                                        <button onClick={() => deleteTransfer(transfer.id)}
                                                type="submit" className="rounded-md border p-2 hover:bg-gray-100">
                                            <span className="sr-only">Delete</span>
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop view */}
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="bg-gradient-to-r from-indigo-100 to-pink-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-4">To</th>
                            <th scope="col" className="px-3 py-4">From</th>
                            <th scope="col" className="px-3 py-4">Amount</th>
                            <th scope="col" className="px-3 py-4">Date</th>
                            <th scope="col" className="px-3 py-4">Note</th>
                            <th scope="col" className="py-3 pl-6 pr-3 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transfers?.map((transfer) => (
                            <tr
                                key={transfer.id}
                                className={`transition-all duration-200 border-b border-gray-200 ${getRowColor(transfer.created_at)}`}
                            >
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 font-medium text-gray-900 flex items-center gap-3">
                                    <span>{transfer.to}</span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 text-gray-700">{transfer.from_}</td>
                                <td className="whitespace-nowrap px-3 py-3 font-semibold">${transfer.amount}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-gray-600">{formatDateToLocal(transfer.created_at)}</td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {transfer.note}
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3 text-right">
                                    <div className="flex justify-end gap-3">
                                        <UpdateTransfer id={transfer.id}/>

                                        <button onClick={()=>deleteTransfer_(transfer.id)} className="rounded-md border p-2 hover:bg-gray-100">
                                            <span className="sr-only">Delete</span>
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
