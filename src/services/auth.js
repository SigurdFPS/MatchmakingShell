// File: src/services/auth.js
import supabase from './api';

export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
};

export const register = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
    });
    if (error) throw error;
    return data;
};
