import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const url = new URL("http://localhost:3000/transactions");

    if (query) {
      url.searchParams.append("q", query);
    }

    const response = await fetch(url);
    const data = await response.json();

    //sort by latest
    data.sort((a: Transaction, b: Transaction) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateB.getTime() - dateA.getTime();
    });

    setTransactions(data);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      try {
        const response = await fetch("http://localhost:3000/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: data.description,
            price: data.price,
            category: data.category,
            type: data.type,
            createdAt: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          setTransactions((state) => [responseData, ...state]);
        } else {
          console.error("Erro ao criar transação. Status:", response.status);
        }
      } catch (error) {
        console.error("Ocorreu um erro ao criar a transação:", error);
      }
    },
    []
  );

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
