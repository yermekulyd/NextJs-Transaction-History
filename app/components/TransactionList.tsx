// components/TransactionList.tsx
import React from 'react';
import TransactionItem from './TransactionItem';

type Transaction = {
    id: number;
    date: string;
    amount: string;
    type: string;
    details: string;
};

type TransactionListProps = {
    transactions: Transaction[];
    onClick: (transaction: Transaction) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onClick }) => {
    return (
        <div>
            {transactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} onClick={onClick} />
            ))}
        </div>
    );
}

export default TransactionList;
