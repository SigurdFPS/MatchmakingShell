// File: tests/wallet.test.js
const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');
const mongoose = require('mongoose');

beforeEach(async () => {
    await mongoose.connection.dropDatabase();
});

describe('Wallet API', () => {
    let token;

    beforeAll(async () => {
        const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123', balance: 50 });
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'password123' });
        token = response.body.token;
    });

    it('should add funds to user wallet', async () => {
        const response = await request(app)
            .post('/api/wallet/add-funds')
            .send({ amount: 20 })
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.balance).toBe(70); // Initial balance 50 + 20 added
    });

    it('should return user balance', async () => {
        const response = await request(app)
            .get('/api/wallet/balance')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.balance).toBe(70);
    });

    it('should fetch transaction history', async () => {
        const response = await request(app)
            .get('/api/wallet/transactions')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});