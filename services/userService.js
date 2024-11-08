// File: services/userService.js
const supabase = require('../config/db');

exports.updateBalance = async (userId, amount) => {
    const { data: user, error } = await supabase
        .from('users')
        .update({ balance: supabase.raw(`balance + ${amount}`) })
        .eq('id', userId)
        .select();

    if (error) throw error;
    return user[0];
};

exports.checkBalance = async (userId, wagerAmount) => {
    const { data: user, error } = await supabase
        .from('users')
        .select('balance')
        .eq('id', userId)
        .single();

    if (error || !user) throw new Error('User not found');
    return user.balance >= wagerAmount;
};
