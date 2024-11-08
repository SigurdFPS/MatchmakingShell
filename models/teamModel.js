// File: models/teamModel.js

// In Supabase, use the SQL editor to create the following schema:

/*
CREATE TABLE teams (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    maxSize INT CHECK (maxSize IN (1, 2, 3)),
    members BIGINT[] -- Array of user IDs
);
*/

// This file can be removed, as the database schema is now managed directly in Supabase.
