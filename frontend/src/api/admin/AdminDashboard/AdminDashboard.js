import { getAdminToken } from '../../auth/token.js';

const API_BASE = 'http://localhost:8080/api/admin';

export async function getAdminDashboardData() {
    const token = getAdminToken();
    const response = await fetch(`${API_BASE}/dashboard`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function getAllAdmins() {
    const token = getAdminToken();
    const response = await fetch(`${API_BASE}/admins`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function createAdmin(adminData) {
    const token = getAdminToken();
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

export async function updateAdmin(adminId, adminData) {
    const token = getAdminToken();
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

export async function deleteAdmin(adminId) {
    const token = getAdminToken();
    const response = await fetch(`${API_BASE}/admins/${adminId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
