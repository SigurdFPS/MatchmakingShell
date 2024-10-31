// File: controllers/teamController.js
const Team = require('../models/teamModel');
const User = require('../models/userModel');

// Create a new team
exports.createTeam = async (req, res) => {
    try {
        const { name, members } = req.body;
        if (members.length > 3) return res.status(400).json({ message: 'Team size cannot exceed 3 members' });

        const newTeam = new Team({ name, members, maxSize: members.length });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
};

// Add a member to an existing team
exports.addMember = async (req, res) => {
    try {
        const { teamId, userId } = req.body;
        const team = await Team.findById(teamId);
        if (team.members.length >= team.maxSize) return res.status(400).json({ message: 'Team is full' });

        team.members.push(userId);
        await team.save();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to team', error });
    }
};
