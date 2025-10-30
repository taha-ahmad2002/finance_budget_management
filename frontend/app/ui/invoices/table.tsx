import { UpdateIncome, DeleteIncome } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

export default async function InvoicesTable() {
    const invoices = [
        {
            id: '1',
            category: 'Social Life',
            account: 'Card',
            amount: 250.75,
            date: '2025-10-01',
            note: 'I drank a coffee',
            description:'No Description'
        },
        {
            id: '2',
            category: 'Social Life',
            account: 'Card',
            amount: 250.75,
            date: '2025-10-01',
            note: 'I drank a coffee',
            description:'No Description'
        },
        {
            id: '3',
            category: 'Social Life',
            account: 'Card',
            amount: 250.75,
            date: '2025-10-01',
            note: 'I drank a coffee',
            description:'No Description'
        },
        {
            id: '4',
            category: 'Social Life',
            account: 'Card',
            amount: 250.75,
            date: '2025-10-06',
            note: 'I drank a coffee',
            description:'No Description'
        },
        {
            id: '5',
            category: 'Social Life',
            account: 'Card',
            amount: 250.75,
            date: '2025-10-02',
            note: 'I drank a coffee',
            description:'No Description'
        },
    ];

    const getRowColor = (date: string) => {
        // A small, pretty color palette (light shades)
        const colorPalette = [
            'bg-pink-100 hover:bg-pink-200',
            'bg-purple-100 hover:bg-purple-200',
            'bg-blue-100 hover:bg-blue-200',
            'bg-green-100 hover:bg-green-200',
            'bg-yellow-100 hover:bg-yellow-200',
            'bg-orange-100 hover:bg-orange-200',
            'bg-teal-100 hover:bg-teal-200',
        ];

        // Simple hash to make the same date always map to the same index
        const hash = Array.from(date).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colorIndex = hash % colorPalette.length;

        return colorPalette[colorIndex];
    };


    return (
        <div className="mt-8 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 shadow-lg">
                    {/* Mobile view */}
                    <div className="md:hidden p-3 space-y-4">
                        {invoices?.map((invoice) => (
                            <div
                                key={invoice.id}
                                className={`w-full rounded-xl border shadow-sm transition-all duration-200 ${getRowColor(invoice.date)}`}
                            >
                                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">{invoice.note}</p>
                                        <p className="text-sm text-gray-500">{invoice.description}</p>
                                    </div>
                                    <InvoiceStatus status={invoice.account} />
                                </div>
                                <div className="flex w-full items-center justify-between px-4 py-3">
                                    <div>
                                        <p className="text-xl font-bold text-gray-800">{formatCurrency(invoice.amount)}</p>
                                        <p className="text-sm text-gray-500">{formatDateToLocal(invoice.date)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateIncome id={invoice.id} />
                                        <DeleteIncome id={invoice.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop view */}
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="bg-gradient-to-r from-indigo-100 to-pink-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-4">Account</th>
                            <th scope="col" className="px-3 py-4">Category</th>
                            <th scope="col" className="px-3 py-4">Amount</th>
                            <th scope="col" className="px-3 py-4">Date</th>
                            <th scope="col" className="px-3 py-4">Note</th>
                            <th scope="col" className="py-3 pl-6 pr-3 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoices?.map((invoice) => (
                            <tr
                                key={invoice.id}
                                className={`transition-all duration-200 border-b border-gray-200 ${getRowColor(invoice.date)}`}
                            >
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center text-white font-bold">
                                        {invoice.category.charAt(0)}
                                    </div>
                                    <span>{invoice.account}</span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 text-gray-700">{invoice.category}</td>
                                <td className="whitespace-nowrap px-3 py-3 font-semibold">{formatCurrency(invoice.amount)}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-gray-600">{formatDateToLocal(invoice.date)}</td>
                                <td className="whitespace-nowrap px-3 py-3">
                                     {invoice.note}
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3 text-right">
                                    <div className="flex justify-end gap-3">
                                        <UpdateIncome id={invoice.id} />
                                        <DeleteIncome id={invoice.id} />
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
