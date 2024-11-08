// File: tests/wallet.test.js
const request = require('supertest');
const supabase = require('../src/services/api');

beforeEach(async () => {
    await supabase.from('users').delete().neq('id', 0);
});

describe('Wallet API', () => {
    let token;

    beforeAll(async () => {
        const { data: user } = await supabase
            .from('users')
            .insert([{ username: 'testuser', email: 'test@example.com', password: 'password123', balance: 50 }])
            .select();
        
        const { data } = await supabase.auth.signInWithPassword({
            email: 'test@example.com',
            password: 'password123',
        });
        token = data.session.access_token;
    });

    it('should add funds to user wallet', async () => {
        const response = await request(supabase)
            .post('/api/wallet/add-funds')
            .send({ amount: 20 })
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.balance).toBe(70);  // Initial balance 50 + 20 added
    });

    it('should return user balance', async () => {
        const response = await request(supabase)
            .get('/api/wallet/balance')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.balance).toBe(70);
    });

    it('should fetch transaction history', async () => {
        const response = await request(supabase)
            .get('/api/wallet/transactions')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
