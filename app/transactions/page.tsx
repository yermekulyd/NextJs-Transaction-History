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
    {
      id: 4,
      date: "2023-01-18",
      amount: "50.00",
      type: "Withdrawal",
      details: "Transport",
    },
    {
      id: 5,
      date: "2023-01-20",
      amount: "500.00",
      type: "Deposit",
      details: "Freelance Work",
    },
    {
      id: 6,
      date: "2023-01-22",
      amount: "300.00",
      type: "Withdrawal",
      details: "House Rent",
    },
    {
      id: 7,
      date: "2023-01-25",
      amount: "120.00",
      type: "Withdrawal",
      details: "Utilities",
    },
    {
      id: 8,
      date: "2023-01-28",
      amount: "75.00",
      type: "Withdrawal",
      details: "Dining Out",
    },
    {
      id: 9,
      date: "2023-01-30",
      amount: "250.00",
      type: "Deposit",
      details: "Gift",
    },
    {
      id: 10,
      date: "2023-02-01",
      amount: "1000.00",
      type: "Deposit",
      details: "Bonus",
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
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Left side - Transaction History */}
        <div>
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
        </div>

        {/* Right side - Chart and Summary */}
        <div>
          {/* Chart */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Transaction Overview
            </h2>
            <TransactionChart chartData={chartData} />
          </div>

          {/* Financial Summary */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Financial Summary</h2>
            <p>Total Income: ${totalIncome.toFixed(2)}</p>
            <p>Total Expense: ${totalExpense.toFixed(2)}</p>
            <p>Balance: ${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
