// File: src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import supabase from '../config/db';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('username, eloRating')
                .order('eloRating', { ascending: false })
                .limit(10);
            if (error) console.error(error);
            else setLeaders(data);
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaders.map((user, index) => (
                    <li key={user.id}>
                        #{index + 1} {user.username} - Elo: {user.eloRating}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
