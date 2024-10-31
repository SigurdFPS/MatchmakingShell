// File: src/components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await api.get('/wallet/transactions');
            setTransactions(response.data);
        };
        fetchTransactions();
    }, []);

    return (
        <div>
            <h3>Transaction History</h3>
            <ul>
                {transactions.map((txn, index) => (
                    <li key={index}>
                        {txn.date}: {txn.type === 'credit' ? '+' : '-'}${txn.amount.toFixed(2)} - {txn.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
