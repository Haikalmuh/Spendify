import * as Crypto from "expo-crypto";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loadTransactions, saveTransactions } from "../services/storage";
import { Transaction } from "../types";

type ContextType = {
  transactions: Transaction[];
  load: () => Promise<void>;
  addTransaction: (tx: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (id: string, patch: Partial<Transaction>) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
};

export const TransactionsContext = createContext<ContextType>({
  transactions: [],
  load: async () => {},
  addTransaction: async () => {},
  updateTransaction: async () => {},
  removeTransaction: async () => {},
});

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const load = async () => {
    const arr = await loadTransactions();
    setTransactions(arr);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    // persist on every change
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = async (tx: Omit<Transaction, "id">) => {
    const newTx = { id: Crypto.randomUUID(), ...tx };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const updateTransaction = async (id: string, patch: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  const removeTransaction = async (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        load,
        addTransaction,
        updateTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const ctx = useContext(TransactionsContext);

  if (!ctx) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return ctx;
}
