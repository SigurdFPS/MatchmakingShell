// File: src/services/auth.js
import api from './api';

export const login = async (username, password) => {
    return api.post('/auth/login', { username, password });
};

export const register = async (username, email, password) => {
    return api.post('/auth/register', { username, email, password });
};
