// File: src/components/MatchFinder.js
import React, { useState, useEffect } from 'react';
import supabase from '../config/db';

const MatchFinder = () => {
    const [matches, setMatches] = useState([]);
    const [filters, setFilters] = useState({ game: '', format: '', maxWager: '' });

    const fetchMatches = async () => {
        try {
            const { data, error } = await supabase
                .from('matches')
                .select('*')
                .eq('status', 'open')
                .eq(filters.game && 'game', filters.game)
                .eq(filters.format && 'format', filters.format)
                .lte('wager', filters.maxWager || Infinity);

            if (error) throw error;
            setMatches(data);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, [filters]);

    return (
        <div>
            <h2>Find a Match</h2>
            <div>
                <input
                    type="text"
                    placeholder="Game"
                    value={filters.game}
                    onChange={(e) => setFilters({ ...filters, game: e.target.value })}
                />
                <select onChange={(e) => setFilters({ ...filters, format: e.target.value })}>
                    <option value="">Any format</option>
                    <option value="1">1v1</option>
                    <option value="2">2v2</option>
                    <option value="3">3v3</option>
                </select>
                <input
                    type="number"
                    placeholder="Max Wager"
                    value={filters.maxWager}
                    onChange={(e) => setFilters({ ...filters, maxWager: e.target.value })}
                />
            </div>
            <button onClick={fetchMatches}>Search</button>

            <div>
                {matches.map((match) => (
                    <div key={match.id}>
                        <h3>{match.game} - {match.format}v{match.format}</h3>
                        <p>Wager: ${match.wager}</p>
                        <p>Status: {match.status}</p>
                        <button onClick={() => joinMatch(match.id)}>Join Match</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const joinMatch = async (matchId) => {
    try {
        const { error } = await supabase
            .from('match_participants')
            .insert({ match_id: matchId, team_b_id: "YOUR_TEAM_ID" });

        if (error) throw error;
        alert('Joined match successfully!');
    } catch (error) {
        alert('Error joining match');
    }
};

export default MatchFinder;
