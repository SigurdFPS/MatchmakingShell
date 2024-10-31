// File: models/teamModel.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array of user IDs
    maxSize: { type: Number, required: true, enum: [1, 2, 3] },  // 1 for solo, 2 for duo, 3 for trio
});

module.exports = mongoose.model('Team', teamSchema);
