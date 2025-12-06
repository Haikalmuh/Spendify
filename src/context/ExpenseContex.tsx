import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction } from '../types';
import uuid from 'react-native-uuid';

// Type definisi untuk context
interface ExpenseContextType {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, data: Partial<Transaction>) => void;
}

// Context
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Provider
export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const newItem: Transaction = {
      id: uuid.v4().toString(),
      ...data,
    };
    setTransactions((prev) => [newItem, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id: string, data: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  return (
    <ExpenseContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, updateTransaction }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Hook
export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within ExpenseProvider');
  }
  return context;
};
