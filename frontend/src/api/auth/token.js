const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY = 'admin_data';
const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000;

export function saveToken(token) {
    const data = {
        token: token,
        expiresAt: Date.now() + ONE_YEAR_IN_MS
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
}

export function getToken() {
    const data = localStorage.getItem(TOKEN_KEY);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    if (Date.now() > parsed.expiresAt) {
        removeToken();
        return null;
    }
    return parsed.token;
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function saveUserData(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserData() {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

export function removeUserData() {
    localStorage.removeItem(USER_KEY);
}

export function saveAdminToken(token) {
    const data = {
        token: token,
        expiresAt: Date.now() + ONE_YEAR_IN_MS
    };
    localStorage.setItem(ADMIN_TOKEN_KEY, JSON.stringify(data));
}

export function getAdminToken() {
    const data = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    if (Date.now() > parsed.expiresAt) {
        removeAdminToken();
        return null;
    }
    return parsed.token;
}

export function removeAdminToken() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function saveAdminData(admin) {
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
}

export function getAdminData() {
    const adminData = localStorage.getItem(ADMIN_USER_KEY);
    return adminData ? JSON.parse(adminData) : null;
}

export function removeAdminData() {
    localStorage.removeItem(ADMIN_USER_KEY);
}

export function isAuthenticated() {
    return !!getToken();
}

export function isAdminAuthenticated() {
    return !!getAdminToken();
}

export function logout() {
    removeToken();
    removeUserData();
    window.location.hash = '#home';
}

export function adminLogout() {
    removeAdminToken();
    removeAdminData();
    window.location.hash = '#adminlogin';
}
