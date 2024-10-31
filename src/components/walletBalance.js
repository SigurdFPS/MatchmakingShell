// File: src/components/WalletBalance.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const WalletBalance = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const response = await api.get('/wallet/balance');
            setBalance(response.data.balance);
        };
        fetchBalance();
    }, []);

    return (
        <div>
            <h3>Wallet Balance</h3>
            <p>${balance.toFixed(2)}</p>
        </div>
    );
};

export default WalletBalance;
