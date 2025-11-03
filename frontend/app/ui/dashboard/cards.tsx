
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

       <Card1 title="Expenses" value={expenses} type="expenses" />
      <Card2 title="Incomes" value={incomes} type="incomes" />
      <Card3 title="Transfers" value={transfers} type="transfers" />
      <Card4
        title="Total"
        value={incomes-expenses}
        type="total"
      />
    </>
  );
}

export function Card1({
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
    <div className="rounded-xl bg-red-300 p-2 shadow-sm">
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


export function Card2({
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
        <div className="rounded-xl bg-green-200 p-2 shadow-sm">
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


export function Card3({
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
        <div className="rounded-xl bg-purple-200 p-2 shadow-sm">
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


export function Card4({
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
        <div className="rounded-xl bg-blue-100 p-2 shadow-sm">
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
