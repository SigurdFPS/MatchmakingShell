// File: tests/match.test.js
const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');
const Match = require('../models/matchModel');
const mongoose = require('mongoose');

beforeEach(async () => {
    await mongoose.connection.dropDatabase();
});

describe('POST /api/matches/create', () => {
    it('should create a new match if user has enough balance', async () => {
        const user = await User.create({ username: 'testuser', balance: 50 });
        const response = await request(app)
            .post('/api/matches/create')
            .send({ userId: user._id, format: 2, wager: 20, game: 'Warzone' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('format', 2);
    });

    it('should fail if user balance is insufficient', async () => {
        const user = await User.create({ username: 'lowbalance', balance: 10 });
        const response = await request(app)
            .post('/api/matches/create')
            .send({ userId: user._id, format: 1, wager: 20, game: 'Warzone' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Insufficient balance');
    });
});
