// File: models/matchModel.js

// In Supabase, use the SQL editor to create the following schema:

/*
CREATE TABLE matches (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    format INT CHECK (format IN (1, 2, 3)),
    wager DECIMAL NOT NULL,
    teamA_id BIGINT REFERENCES teams(id),
    teamB_id BIGINT REFERENCES teams(id),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'completed')),
    game VARCHAR(50) NOT NULL
);
*/

// This file can be removed, as the database schema is now managed directly in Supabase.
