
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



export default function CardWrapper({expenses, incomes, transfers}: {
    expenses: number;
    incomes: number;
    transfers: number;
}) {

return (

    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}
        <Card title="Expenses" value={expenses} type="expenses" color="red"/>
      <Card1 title="Incomes" value={incomes} type="incomes" color="green" />
      <Card1
        title="Total"
        value={incomes-expenses}
        type="total"
        color="gray"
      />
        <Card title="Transfers" value={transfers} type="transfers" color="blue"/>
    </>
  );
}

export function Card({
  title,
  value,
  type,
    color
}: {
  title: string;
  value: number | string;
  type: 'expenses' | 'incomes' | 'transfers' | 'total';
  color: string;
}) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-xl bg-${color}-300 p-2 shadow-sm`}>
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-green-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        $ {value}
      </p>
    </div>
  );
}


export function Card1({
                         title,
                         value,
                         type,
                         color
                     }: {
    title: string;
    value: number | string;
    type: 'expenses' | 'incomes' | 'transfers' | 'total';
    color: string;
}) {
    const Icon = iconMap[type];

    return (
        <div className={`rounded-xl bg-${color}-200 p-2 shadow-sm`}>
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-green-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                $ {value}
            </p>
        </div>
    );
}