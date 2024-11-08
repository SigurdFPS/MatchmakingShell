// File: src/components/WalletBalance.js
import React, { useState, useEffect } from 'react';
import supabase from '../config/db';

const WalletBalance = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const user = supabase.auth.user();
            const { data, error } = await supabase
                .from('users')
                .select('balance')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            setBalance(data.balance);
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
