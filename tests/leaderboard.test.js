// File: tests/leaderboard.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeEach(async () => {
    await mongoose.connection.dropDatabase();
});

describe('Leaderboard API', () => {
    it('should return a list of top players by Elo rating', async () => {
        const response = await request(app).get('/api/user/leaderboard');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
