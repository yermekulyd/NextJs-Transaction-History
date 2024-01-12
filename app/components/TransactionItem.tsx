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
      className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
      onClick={() => onClick(transaction)}
    >
      <div>
        <div className="font-medium">{transaction.date}</div>
        <div className="text-sm text-gray-600">{transaction.details}</div>
      </div>
      <div
        className={`font-semibold ${
          transaction.type === "Deposit" ? "text-green-500" : "text-red-500"
        }`}
      >
        {transaction.amount}
      </div>
    </div>
  );
};

export default TransactionItem;
