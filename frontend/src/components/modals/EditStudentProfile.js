import { getCurrentUser } from '../../api/auth/auth.js';
import { API_BASE_URL } from '../../api/server/api.js';
import { initStepForm } from '../../utils/steps.js';
import { showConfirmDialog } from './DialogModal.js';

let editUploadedPhotoUrl = '';
let selectedPhotoFile = null;

export function EditStudentProfileModal() {
    return `
    <div class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" id="editModal">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-green-800">Edit Profile</h2>
                <button onclick="toggleEditForm()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-green-800" id="stepDescription">Basic Information</h3>
            </div>

            <form id="editStudentForm">
                <div data-step="1">
                    <div class="mb-4">
                        <label for="editUsername" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input type="text" id="editUsername" name="editUsername"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                    <div class="mb-4">
                        <label for="editEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" id="editEmail" name="editEmail"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                </div>

                <div data-step="2" class="hidden">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                        <div class="photo-upload text-center">
                            <div class="photo-preview w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300" id="editPhotoPreview">
                                <span class="text-gray-400 text-sm">No photo</span>
                            </div>
                            <input type="file" id="editPhotoInput" accept="image/*" class="hidden">
                            <button type="button" onclick="document.getElementById('editPhotoInput').click()"
                                class="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                Change Photo
                            </button>
                        </div>
                    </div>
                </div>

                <div class="button-group flex gap-3 mt-6">
                    <button type="button" data-action="prev" onclick="toggleEditForm()"
                        class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors hidden">
                        Previous
                    </button>
                    <button type="button" data-action="next"
                        class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                        Next
                    </button>
                    <button type="button" data-action="submit" onclick="confirmSaveProfile()"
                        class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors hidden">
                        Save Changes
                    </button>
                </div>
            </form>
            <div class="message hidden mt-4 p-3 rounded-lg text-sm" id="editMessage"></div>
        </div>
    </div>
    `;
}

export function initEditStudentProfileModal() {
    initStepForm('editStudentForm', 2);
    
    const editPhotoInput = document.getElementById('editPhotoInput');
    if (editPhotoInput) {
        editPhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                selectedPhotoFile = file;
                const preview = document.getElementById('editPhotoPreview');
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Profile photo preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    window.toggleEditForm = toggleEditForm;
    window.saveProfile = saveProfile;
    window.confirmSaveProfile = confirmSaveProfile;
}

function toggleEditForm() {
    const modal = document.getElementById('editModal');
    const userData = getCurrentUser() || {};
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        document.getElementById('editUsername').value = userData.username || '';
        document.getElementById('editEmail').value = userData.email || '';
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function confirmSaveProfile() {
    showConfirmDialog(
        'Save Changes',
        'Are you sure you want to save changes?',
        saveProfile
    );
}

async function saveProfile() {
    const userData = getCurrentUser() || {};
    const saveButton = document.querySelector('button[data-action="submit"]');
    
    if (!userData.id) {
        const messageDiv = document.getElementById('editMessage');
        messageDiv.textContent = 'Error: User data not found. Please login again.';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
        setTimeout(() => {
            window.location.hash = '#studentlogin';
        }, 2000);
        return;
    }
    
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;
    const messageDiv = document.getElementById('editMessage');
    
    let profilePhotoUrl = userData.profilePhotoUrl || '';
    
    if (selectedPhotoFile) {
        if (saveButton) {
            saveButton.textContent = 'Saving changes...';
            saveButton.disabled = true;
        }
        
        messageDiv.textContent = 'Uploading photo...';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-blue-100 border border-blue-300 text-blue-700';
        messageDiv.classList.remove('hidden');
        
        const formData = new FormData();
        formData.append('file', selectedPhotoFile);
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/upload-photo`, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                profilePhotoUrl = data.photoUrl;
            } else {
                messageDiv.textContent = 'Failed to upload photo: ' + data.message;
                messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
                
                if (saveButton) {
                    saveButton.textContent = 'Save Changes';
                    saveButton.disabled = false;
                }
                return;
            }
        } catch (error) {
            messageDiv.textContent = 'Error uploading photo: ' + error.message;
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
            
            if (saveButton) {
                saveButton.textContent = 'Save Changes';
                saveButton.disabled = false;
            }
            return;
        }
    }
    
    if (saveButton && !selectedPhotoFile) {
        saveButton.textContent = 'Saving changes...';
        saveButton.disabled = true;
    }
    
    messageDiv.textContent = 'Updating profile...';
    messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-blue-100 border border-blue-300 text-blue-700';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/home/user/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, profilePhotoUrl })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            
            document.getElementById('username').textContent = username;
            document.getElementById('email').textContent = email;
            
            if (profilePhotoUrl && profilePhotoUrl !== userData.profilePhotoUrl) {
                const profilePhoto = document.getElementById('profilePhoto');
                const profilePlaceholder = document.getElementById('profilePlaceholder');
                if (profilePhoto) {
                    profilePhoto.src = profilePhotoUrl;
                    profilePhoto.classList.remove('hidden');
                }
                if (profilePlaceholder) profilePlaceholder.classList.add('hidden');
            }
            
            messageDiv.textContent = 'Profile updated successfully!';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-green-100 border border-green-300 text-green-700';
            
            if (saveButton) {
                saveButton.textContent = 'Save Changes';
                saveButton.disabled = false;
            }
            
            selectedPhotoFile = null;
            editUploadedPhotoUrl = '';
            
            setTimeout(() => {
                toggleEditForm();
                messageDiv.classList.add('hidden');
            }, 1500);
        } else {
            messageDiv.textContent = data.message || 'Failed to update profile';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
            
            if (saveButton) {
                saveButton.textContent = 'Save Changes';
                saveButton.disabled = false;
            }
        }
    } catch (error) {
        messageDiv.textContent = 'Error updating profile: ' + error.message;
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        
        if (saveButton) {
            saveButton.textContent = 'Save Changes';
            saveButton.disabled = false;
        }
    }
}
