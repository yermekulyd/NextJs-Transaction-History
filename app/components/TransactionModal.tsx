import React from "react";
import { Transaction } from "../types";

type TransactionModalProps = {
  transaction: Transaction;
  onClose: () => void;
};

const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900">
            Transaction Details
          </h3>
          <div className="mt-4 px-7 py-3">
            <p className="text-lg text-gray-600">Date: {transaction.date}</p>
            <p className="text-lg text-gray-600">
              Amount: {transaction.amount}
            </p>
            <p className="text-lg text-gray-600">Type: {transaction.type}</p>
            <p className="text-lg text-gray-600">
              Details: {transaction.details}
            </p>
          </div>
          <button
            className="absolute top-4 right-4 text-lg text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
