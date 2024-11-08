// File: src/components/AddFunds.js
import React, { useState } from 'react';
import supabase from '../config/db';

const AddFunds = () => {
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

    const handleAddFunds = async () => {
        try {
            const user = supabase.auth.user();
            const { data, error } = await supabase
                .from('users')
                .update({ balance: supabase.raw(`balance + ${amount}`) })
                .eq('id', user.id)
                .select('balance');

            if (error) throw error;
            setMessage(`Funds added successfully! New balance: $${data[0].balance}`);
        } catch (error) {
            setMessage('Error adding funds. Please try again.');
        }
    };

    return (
        <div>
            <h3>Add Funds</h3>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <button onClick={handleAddFunds}>Add Funds</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddFunds;
