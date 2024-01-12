"use client";
import React, { useState } from "react";

import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import TransactionFilters from "../components/TransactionFilters";
import { Transaction } from "../types";
import { FilterType } from "../types";
import TransactionChart from "../components/TransactionChart";

type TransactionChartData = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

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

  const filterTransactions = (
    transactions: Transaction[],
    criteria: typeof filterCriteria
  ) => {
    return transactions.filter((transaction) => {
      return (
        transaction.type.includes(criteria.type) &&
        transaction.details.toLowerCase().includes(criteria.query.toLowerCase())
      );
    });
  };

  const filteredTransactions = filterTransactions(transactions, filterCriteria);

  //Calculate Char Data
  const calculateChartData = (transactions: Transaction[]) => {
    const dataMap = new Map<string, number>();

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      const currentAmount = dataMap.get(transaction.type) || 0;
      dataMap.set(transaction.type, currentAmount + amount);
    });

    const chartData: TransactionChartData = {
      labels: Array.from(dataMap.keys()),
      datasets: [
        {
          data: Array.from(dataMap.values()),
          backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
          borderColor: ["#ffffff"],
          borderWidth: 1,
        },
      ],
    };

    return chartData;
  };

  const calculateTotals = (transactions: Transaction[]) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === "Deposit") {
        totalIncome += amount;
      } else if (transaction.type === "Withdrawal") {
        totalExpense += amount;
      }
    });

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  };

  const chartData = calculateChartData(transactions);
  const { totalIncome, totalExpense, balance } = calculateTotals(transactions);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Transaction History
      </h1>
      <TransactionFilters onFilterChange={handleFilterChange} />
      <TransactionList
        transactions={filteredTransactions}
        onClick={handleTransactionClick}
      />
      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
      
      {/* Totals */}
      <div className="mt-8 p-4 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Financial Summary</h2>
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expense: ${totalExpense.toFixed(2)}</p>
        <p>Balance: ${balance.toFixed(2)}</p>
      </div>

      {/* Chart */}
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Transaction Overview</h2>
        <TransactionChart chartData={chartData} />
      </div>
    </div>
  );
};

export default TransactionsPage;
