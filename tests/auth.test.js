// File: tests/auth.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeEach(async () => {
    await mongoose.connection.dropDatabase();
});

describe('Auth API', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should log in a user', async () => {
        // Register a user first
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
