const STUDENT_AUTH_API_BASE_URL = 'https://pateros-technological-college-full-stack.onrender.com/api/auth';

export async function login(email, password) {
    try {
        const response = await fetch(`${STUDENT_AUTH_API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (data.success) {
            return { success: true, token: data.token, user: data.user };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error occurred' };
    }
}
