// File: src/components/AddFunds.js
import React, { useState } from 'react';
import api from '../services/api';

const AddFunds = () => {
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

    const handleAddFunds = async () => {
        try {
            const response = await api.post('/wallet/add-funds', { amount });
            setMessage(`Funds added successfully! New balance: $${response.data.balance}`);
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
