// File: tests/leaderboard.test.js
const request = require('supertest');
const supabase = require('../src/services/api');

beforeEach(async () => {
    await supabase.from('users').delete().neq('id', 0);  // Clear users table
});

describe('Leaderboard API', () => {
    it('should return a list of top players by Elo rating', async () => {
        const response = await request(supabase).get('/api/user/leaderboard');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
