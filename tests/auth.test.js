// File: tests/auth.test.js
const request = require('supertest');
const supabase = require('../src/services/api');

beforeEach(async () => {
    await supabase.from('users').delete().neq('id', 0);  // Clear users table
});

describe('Auth API', () => {
    it('should register a new user', async () => {
        const response = await request(supabase)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should log in a user', async () => {
        await request(supabase)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        const response = await request(supabase)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('session');
    });
});
