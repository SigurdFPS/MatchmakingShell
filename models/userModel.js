// File: models/userModel.js

// In Supabase, use the SQL editor to create the following schema:

/*
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    balance DECIMAL DEFAULT 0,
    eloRating INT DEFAULT 1000,
    matchesPlayed INT DEFAULT 0,
    matchesWon INT DEFAULT 0,
    transactionHistory JSONB -- Array of transactions as JSON
);
*/

// This file can be removed, as the database schema is now managed directly in Supabase.
