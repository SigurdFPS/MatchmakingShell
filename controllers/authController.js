// File: controllers/authController.js
const supabase = require('../config/db');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username }
            }
        });

        if (error) throw error;
        res.status(201).json({ message: 'User registered successfully', user: data.user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        res.status(200).json({ token: data.session.access_token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
