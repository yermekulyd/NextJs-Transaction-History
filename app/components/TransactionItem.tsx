// components/TransactionItem.tsx
import React from "react";

type TransactionProps = {
  transaction: {
    id: number;
    date: string;
    amount: string;
    type: string;
    details: string;
  };
  onClick: (transaction: TransactionProps["transaction"]) => void;
};

const TransactionItem: React.FC<TransactionProps> = ({
  transaction,
  onClick,
}) => {
  return (
    <div
      className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick(transaction)}
    >
      <div>Date: {transaction.date}</div>
      <div>Amount: {transaction.amount}</div>
      <div>Type: {transaction.type}</div>
      <div>Details: {transaction.details}</div>
    </div>
  );
};

export default TransactionItem;
