// File: tests/match.test.js
const request = require('supertest');
const supabase = require('../src/services/api');

beforeEach(async () => {
    await supabase.from('matches').delete().neq('id', 0);
    await supabase.from('users').delete().neq('id', 0);
});

describe('POST /api/matches/create', () => {
    it('should create a new match if user has enough balance', async () => {
        const { data: user } = await supabase
            .from('users')
            .insert([{ username: 'testuser', balance: 50 }])
            .select();

        const response = await request(supabase)
            .post('/api/matches/create')
            .send({ userId: user[0].id, format: 2, wager: 20, game: 'Warzone' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('format', 2);
    });

    it('should fail if user balance is insufficient', async () => {
        const { data: user } = await supabase
            .from('users')
            .insert([{ username: 'lowbalance', balance: 10 }])
            .select();

        const response = await request(supabase)
            .post('/api/matches/create')
            .send({ userId: user[0].id, format: 1, wager: 20, game: 'Warzone' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Insufficient balance');
    });
});
