
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'CASH' | 'BANK' | 'CREDIT_CARD' | 'DIGITAL_WALLET';
  balance: number;
  currency: string;
  lastUpdate: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  accountId: string;
  date: string;
  description: string;
  tags: string[];
  isRecurring: boolean;
  paymentMethod: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  limit: number;
  spent: number;
  period: 'MONTHLY' | 'WEEKLY' | 'ANNUAL';
}

export interface FinancialInsight {
  title: string;
  description: string;
  type: 'WARNING' | 'OPPORTUNITY' | 'TIPS';
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  TRANSACTIONS = 'TRANSACTIONS',
  ACCOUNTS = 'ACCOUNTS',
  BUDGETS = 'BUDGETS',
  ANALYTICS = 'ANALYTICS',
  SETTINGS = 'SETTINGS',
  AI_INSIGHTS = 'AI_INSIGHTS'
}
