// File: src/components/CreateMatch.js
import React, { useState } from 'react';
import supabase from '../config/db';

const CreateMatch = () => {
    const [game, setGame] = useState('Warzone');
    const [format, setFormat] = useState(1);
    const [wager, setWager] = useState(0);

    const createMatch = async () => {
        try {
            const user = supabase.auth.user();
            const { error } = await supabase
                .from('matches')
                .insert([{ game, format, wager, teamA: user.id, status: 'open' }]);

            if (error) throw error;
            alert('Match created successfully!');
        } catch (error) {
            alert('Error creating match. Ensure you have enough balance.');
        }
    };

    return (
        <div>
            <h2>Create a Match</h2>
            <select onChange={(e) => setFormat(parseInt(e.target.value))}>
                <option value={1}>1v1</option>
                <option value={2}>2v2</option>
                <option value={3}>3v3</option>
            </select>
            <input
                type="number"
                placeholder="Wager Amount"
                value={wager}
                onChange={(e) => setWager(parseFloat(e.target.value))}
            />
            <button onClick={createMatch}>Create Match</button>
        </div>
    );
};

export default CreateMatch;
