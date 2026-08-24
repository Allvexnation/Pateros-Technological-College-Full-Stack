const API_BASE = 'http://localhost:8080/api/admin';

export async function adminLogin(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

export async function adminLogout(token) {
    const response = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function verifyAdminToken(token) {
    const response = await fetch(`${API_BASE}/verify`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function getAdminToken() {
    const data = localStorage.getItem('admin_token');
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem('admin_token');
        return null;
    }
    return parsed.token;
}
