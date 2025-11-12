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



