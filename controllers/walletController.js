// File: controllers/walletController.js
const User = require('../models/userModel');

// Add funds to wallet
exports.addFunds = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero' });

        const user = await User.findById(userId);
        user.balance += amount;
        user.transactionHistory.push({ amount, type: 'credit', description: 'Funds added' });

        await user.save();
        res.status(200).json({ message: 'Funds added successfully', balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error adding funds', error });
    }
};

// View wallet balance
exports.getBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance', error });
    }
};

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user.transactionHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history', error });
    }
};
