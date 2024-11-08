// File: server.js
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Import routes
const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchFinderRoutes');
const teamRoutes = require('./routes/teamRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Inject Supabase client into request object for routes to access
app.use((req, res, next) => {
    req.supabase = supabase;
    next();
});

// Route handling
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/user', userRoutes);

// Home route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
