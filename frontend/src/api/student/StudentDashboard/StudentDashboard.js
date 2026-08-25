import { getCurrentUser, isAuthenticated } from '../../auth/auth.js';

const STUDENT_DASHBOARD_API_BASE_URL = 'https://pateros-technological-college-full-stack.onrender.com/api/home';

export let editUploadedPhotoUrl = '';

export async function fetchUserData(userId) {
    try {
        const response = await fetch(`${STUDENT_DASHBOARD_API_BASE_URL}/user/${userId}`);
        const data = await response.json();
        
        if (data.success) {
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Fetch user error:', error);
        return { success: false, message: 'Network error occurred' };
    }
}

export async function updateUser(userId, username, email, profilePhotoUrl) {
    try {
        const response = await fetch(`${STUDENT_DASHBOARD_API_BASE_URL}/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, profilePhotoUrl }),
        });

        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Update user error:', error);
        return { success: false, message: 'Network error occurred' };
    }
}

export function displayUserInfo() {
    const user = getCurrentUser();
    if (!user) {
        window.location.hash = '#login';
        return;
    }
    
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    const profilePhotoElement = document.getElementById('profilePhoto');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    const navUsernameElement = document.getElementById('navUsername');
    
    if (usernameElement) {
        usernameElement.textContent = user.username;
    }
    if (emailElement) {
        emailElement.textContent = user.email;
    }
    if (navUsernameElement) {
        navUsernameElement.textContent = 'Welcome, ' + user.username;
    }
    
    if (profilePhotoElement && profilePlaceholder) {
        if (user.profilePhotoUrl) {
            profilePhotoElement.src = user.profilePhotoUrl;
            profilePhotoElement.classList.remove('hidden');
            profilePlaceholder.classList.add('hidden');
        } else {
            profilePhotoElement.classList.add('hidden');
            profilePlaceholder.classList.remove('hidden');
        }
    }
    
    fetchUserData(user.id).then(result => {
        if (result.success) {
            const updatedUser = result.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            if (usernameElement) {
                usernameElement.textContent = updatedUser.username;
            }
            if (emailElement) {
                emailElement.textContent = updatedUser.email;
            }
            if (navUsernameElement) {
                navUsernameElement.textContent = 'Welcome, ' + updatedUser.username;
            }
            
            if (profilePhotoElement && profilePlaceholder) {
                if (updatedUser.profilePhotoUrl) {
                    profilePhotoElement.src = updatedUser.profilePhotoUrl;
                    profilePhotoElement.classList.remove('hidden');
                    profilePlaceholder.classList.add('hidden');
                } else {
                    profilePhotoElement.classList.add('hidden');
                    profilePlaceholder.classList.remove('hidden');
                }
            }
        }
    });
}

export function toggleEditForm() {
    const editModal = document.getElementById('editModal');
    const user = getCurrentUser();
    
    if (editModal.classList.contains('hidden')) {
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editEmail').value = user.email;
        
        const editPhotoPreview = document.getElementById('editPhotoPreview');
        if (user.profilePhotoUrl) {
            editPhotoPreview.innerHTML = `<img src="${user.profilePhotoUrl}" alt="Current photo" class="w-full h-full object-cover">`;
            editUploadedPhotoUrl = user.profilePhotoUrl;
        } else {
            editPhotoPreview.innerHTML = '<span class="text-gray-400 text-sm">No photo</span>';
            editUploadedPhotoUrl = '';
        }
        
        editModal.classList.remove('hidden');
        editModal.classList.add('flex');
    } else {
        editModal.classList.add('hidden');
        editModal.classList.remove('flex');
    }
}

export async function saveProfile() {
    const user = getCurrentUser();
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;
    const messageDiv = document.getElementById('editMessage');
    
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';
    
    const result = await updateUser(user.id, username, email, editUploadedPhotoUrl);
    
    if (result.success) {
        messageDiv.textContent = 'Profile updated successfully!';
        messageDiv.classList.add('success');
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            toggleEditForm();
            displayUserInfo();
        }, 1000);
    } else {
        messageDiv.textContent = 'Failed to update profile: ' + result.message;
        messageDiv.classList.add('error');
        messageDiv.style.display = 'block';
    }
}

export function initializeStudentDashboard() {
    if (!isAuthenticated()) {
        window.location.hash = '#login';
        return;
    }
    
    displayUserInfo();
}
