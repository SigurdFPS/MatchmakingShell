// File: models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }], // References team IDs
    eloRating: { type: Number, default: 1000 }, // Default Elo rating
    matchesPlayed: { type: Number, default: 0 },
    matchesWon: { type: Number, default: 0 },
    balance: { type: Number, default: 0 }, // Wallet balance
    transactionHistory: [transactionSchema], // Array of transactions
}, { timestamps: true });

// Hash password before saving to ensure security
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true }, // 'credit' for deposits, 'debit' for bets
    date: { type: Date, default: Date.now },
    description: { type: String },
});

// Method to compare hashed passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
