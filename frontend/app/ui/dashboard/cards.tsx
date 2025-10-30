import {
  BanknotesIcon,
  ClockIcon,
    PlusIcon,
    CurrencyRupeeIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  expenses: BanknotesIcon,
  incomes: CurrencyRupeeIcon,
  transfers: ClockIcon,
  total: PlusIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

       <Card title="Expenses" value={5} type="expenses" />
      <Card title="Incomes" value={5} type="incomes" />
      <Card title="Transfers" value={5} type="transfers" />
      <Card
        title="Total"
        value={6}
        type="total"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'expenses' | 'incomes' | 'transfers' | 'total';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
