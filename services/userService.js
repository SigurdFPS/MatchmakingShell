// File: services/userService.js
const User = require('../models/userModel');

exports.updateBalance = async (userId, amount) => {
    const user = await User.findById(userId);
    if (user) {
        user.balance += amount;
        await user.save();
    }
    return user;
};

exports.checkBalance = async (userId, wagerAmount) => {
    const user = await User.findById(userId);
    return user && user.balance >= wagerAmount;
};
