"use client";
import React, { useState } from "react";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import TransactionFilters from "../components/TransactionFilters";

type Transaction = {
  id: number;
  date: string;
  amount: string;
  type: string;
  details: string;
};

type FilterType = 'date' | 'query' | 'type';

const TransactionsPage: React.FC = () => {
  // Mock data
  const transactions = [
    {
      id: 1,
      date: "2023-01-10",
      amount: "150.00",
      type: "Withdrawal",
      details: "Groceries",
    },
    {
      id: 2,
      date: "2023-01-12",
      amount: "2000.00",
      type: "Deposit",
      details: "Salary",
    },
    {
      id: 3,
      date: "2023-01-15",
      amount: "100.00",
      type: "Withdrawal",
      details: "Internet Bill",
    },
  ];

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [filterCriteria, setFilterCriteria] = useState({
    date: "",
    type: "",
    query: "",
  });

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleFilterChange = (filterType: FilterType, value: string) => {
    setFilterCriteria((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    // Implement filtering logic based on filterCriteria
    return (
      transaction.type.includes(filterCriteria.type) &&
      transaction.details
        .toLowerCase()
        .includes(filterCriteria.query.toLowerCase())
    );
  });

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Transaction History
      </h1>
      <TransactionFilters onFilterChange={handleFilterChange} />
      <TransactionList
        transactions={filteredTransactions}  // Pass filteredTransactions here
        onClick={handleTransactionClick}
      />
      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
  
};

export default TransactionsPage;
