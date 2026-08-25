import { API_BASE_URL as SERVER_API_BASE_URL } from '../server/api.js';

const API_BASE_URL = `${SERVER_API_BASE_URL}/api/auth`;

export async function signup(username, email, password, profilePhotoUrl = '') {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, profilePhotoUrl }),
        });

        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, message: 'Network error occurred' };
    }
}

export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error occurred' };
    }
}

export async function logout() {
    try {
        await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Logout API error:', error);
    }
    localStorage.removeItem('user');
    window.location.hash = '#login';
}

export function getCurrentUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
}

export function isAuthenticated() {
    return getCurrentUser() !== null;
}
