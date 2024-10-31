// File: models/matchModel.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    format: { type: Number, required: true, enum: [1, 2, 3] },  // 1v1, 2v2, or 3v3
    wager: { type: Number, required: true },  // Amount wagered
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    status: { type: String, default: 'open', enum: ['open', 'in-progress', 'completed'] },
    game: { type: String, required: true }  // Game type (e.g., "Call of Duty")
});

module.exports = mongoose.model('Match', matchSchema);
