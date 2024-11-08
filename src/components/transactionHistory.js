// File: src/components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import supabase from '../config/db';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const user = supabase.auth.user();
            const { data, error } = await supabase
                .from('transactionHistory')
                .select('*')
                .eq('userId', user.id)
                .order('date', { ascending: false });

            if (error) throw error;
            setTransactions(data);
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
