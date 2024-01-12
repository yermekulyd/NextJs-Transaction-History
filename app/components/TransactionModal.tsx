import React from 'react';

type Transaction = {
    id: number;
    date: string;
    amount: string;
    type: string;
    details: string;
  };
  
  type TransactionModalProps = {
    transaction: Transaction;
    onClose: () => void;
  };

  const TransactionModal: React.FC<TransactionModalProps> = ({ transaction, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Transaction Details</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">Date: {transaction.date}</p>
                        <p className="text-sm text-gray-500">Amount: {transaction.amount}</p>
                        <p className="text-sm text-gray-500">Type: {transaction.type}</p>
                        <p className="text-sm text-gray-500">Details: {transaction.details}</p>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button id="ok-btn" className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-5/12 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionModal;
