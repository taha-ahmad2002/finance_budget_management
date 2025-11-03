// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


export type Expense = {
  id: number;
  user_id: number;
  amount: number;
  created_at: string;
  description: string;
  note: string;
  account: string;
  category: string;
};

export type Income = {
    id: number;
    user_id: number;
    amount: number;
    created_at: string;
    description: string;
    note: string;
    account: string;
    category: string;
};

export type Transfer = {
    id: number;
    user_id: number;
    amount: number;
    created_at: string;
    description: string;
    note: string;
    to: string;
    from_: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};



export type ExpenseForm = {
  id: number;
  user_id: number;
  amount: number;
  category: string;
  created_at: string;
  note: string;
  account: string;
  description: string;
};

export type IncomeForm = {
    id: number;
    user_id: number;
    amount: number;
    category: string;
    created_at: string;
    note: string;
    account: string;
    description: string;
};

export type TransferForm = {
    id: number;
    user_id: number;
    amount: number;
    from_: string;
    created_at: string;
    note: string;
    to: string;
    description: string;
};
