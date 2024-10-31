// File: controllers/matchFinderController.js

const User = require('../models/userModel'); // Assuming you have a user model

// Ensure user has enough balance to create or join a match
const validateBalance = async (userId, wager) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user.balance >= wager;
};

// Ensure team size matches the match format during joining
exports.joinMatch = async (req, res) => {
    try {
        const { matchId, teamBId } = req.body;
        const match = await Match.findById(matchId);
        const teamB = await Team.findById(teamBId);

        if (!match || match.status !== 'open') {
            return res.status(400).json({ message: 'Match not available' });
        }
        if (!teamB) {
            return res.status(400).json({ message: 'Team not found' });
        }

        // Validate team size against match format
        if (teamB.members.length !== match.format) {
            return res.status(400).json({ message: `Team size does not match ${match.format}v${match.format} format` });
        }

        // Proceed to join match if validation passes
        match.teamB = teamB._id;
        match.status = 'in-progress';
        await match.save();

        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Error joining match', error });
    }
};

// Find available matches based on filter
exports.findMatches = async (req, res) => {
    try {
        const { game, format, maxWager } = req.query;
        const query = { status: 'open' };

        if (game) query.game = game;
        if (format) query.format = format;
        if (maxWager) query.wager = { $lte: maxWager };

        const matches = await Match.find(query).populate('teamA');
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Error finding matches', error });
    }
};

// Ensure team size matches the match format during creation
exports.createMatch = async (req, res) => {
    try {
        const { format, wager, game, teamAId } = req.body;
        const teamA = await Team.findById(teamAId);

        if (!teamA) return res.status(400).json({ message: 'Team not found' });

        // Validate team size against match format
        if (teamA.members.length !== format) {
            return res.status(400).json({ message: `Team size does not match ${format}v${format} format` });
        }

        // Proceed to create match if validation passes
        const match = new Match({ format, wager, game, teamA: teamA._id, status: 'open' });
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Error creating match', error });
    }
};
