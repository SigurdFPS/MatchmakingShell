// File: services/authService.js
const supabase = require('../config/db');

exports.generateToken = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.session.access_token;
};

exports.verifyToken = async (token) => {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) throw new Error('Invalid token');
    return data.user;
};
