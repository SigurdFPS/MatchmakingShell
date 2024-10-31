// File: src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const response = await api.get('/user/leaderboard');
            setLeaders(response.data);
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaders.map((user, index) => (
                    <li key={user._id}>
                        #{index + 1} {user.username} - Elo: {user.eloRating}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
