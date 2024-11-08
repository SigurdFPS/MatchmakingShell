// File: controllers/userController.js

exports.getUserProfile = async (req, res) => {
    try {
        // Fetch the user profile from Supabase, excluding the password field
        const { data: user, error } = await req.supabase
            .from('users')
            .select('id, username, email, balance, eloRating, matchesPlayed, matchesWon')  // Exclude sensitive data like password
            .eq('id', req.user.id)
            .single();

        if (error) {
            throw error;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// Get top users by Elo rating
exports.getLeaderboard = async (req, res) => {
    try {
        // Fetch top 10 users sorted by Elo rating in descending order
        const { data: leaders, error } = await req.supabase
            .from('users')
            .select('username, eloRating')
            .order('eloRating', { ascending: false })
            .limit(10);

        if (error) {
            throw error;
        }

        res.status(200).json(leaders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};
