// File: src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import supabase from '../config/db';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const user = supabase.auth.user();
                const { data, error } = await supabase
                    .from('users')
                    .select('username, balance, eloRating, matchesPlayed, matchesWon')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Balance:</strong> ${user.balance.toFixed(2)}</p>
            <p><strong>Elo Rating:</strong> {user.eloRating}</p>
            <p><strong>Matches Played:</strong> {user.matchesPlayed}</p>
            <p><strong>Matches Won:</strong> {user.matchesWon}</p>
        </div>
    );
};

export default UserProfile;
