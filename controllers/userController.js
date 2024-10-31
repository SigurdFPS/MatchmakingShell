// File: controllers/userController.js
const User = require('../models/userModel');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');  // Exclude password
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// Get top users by Elo rating
exports.getLeaderboard = async (req, res) => {
    try {
        const leaders = await User.find()
            .sort({ eloRating: -1 })
            .limit(10)
            .select('username eloRating');
        res.status(200).json(leaders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};