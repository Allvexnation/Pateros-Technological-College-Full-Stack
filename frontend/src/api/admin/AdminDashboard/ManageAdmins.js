import { API_BASE_URL } from '../../server/api.js';

const API_BASE = `${API_BASE_URL}/api/admin`;

export async function getAllAdmins(token) {
    const response = await fetch(`${API_BASE}/admins`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function createAdmin(token, adminData) {
    const response = await fetch(`${API_BASE}/admins`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(adminData)
    });
    return response.json();
}

export async function updateAdmin(token, adminId, adminData) {
    const response = await fetch(`${API_BASE}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(adminData)
    });
    return response.json();
}

export async function deleteAdmin(token, adminId, credentials) {
    const response = await fetch(`${API_BASE}/admins/${adminId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
}
