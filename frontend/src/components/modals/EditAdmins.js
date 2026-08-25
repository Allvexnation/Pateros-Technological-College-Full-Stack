import { initStepForm } from '../../utils/steps.js';
import { getDialogModalHTML, initDialogModal, showConfirmDialog } from './DialogModal.js';
import { API_BASE_URL } from '../../api/server/api.js';

export function getEditAdminModalHTML() {
    return `
    <div class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" id="editAdminModal">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-green-800">Edit Admin</h2>
                <button onclick="closeEditAdminModal()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-green-800" id="stepDescription">Basic Information</h3>
            </div>

            <form id="editAdminForm">
                <input type="hidden" id="editAdminId">
                
                <div data-step="1">
                    <div class="mb-4">
                        <label for="editAdminUsername" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input type="text" id="editAdminUsername" name="editAdminUsername"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                    <div class="mb-4">
                        <label for="editAdminEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" id="editAdminEmail" name="editAdminEmail"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                </div>

                <div data-step="2" class="hidden">
                    <div class="mb-4">
                        <label for="editAdminDepartment" class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <input type="text" id="editAdminDepartment" name="editAdminDepartment"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                    <div class="mb-4">
                        <label for="editAdminRole" class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <select id="editAdminRole" name="editAdminRole"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
                    </div>
                </div>

                <div data-step="3" class="hidden">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                        <div class="photo-upload text-center">
                            <div class="photo-preview w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300" id="editAdminPhotoPreview">
                                <span class="text-gray-400 text-sm">No photo</span>
                            </div>
                            <input type="file" id="editAdminPhotoInput" accept="image/*" class="hidden">
                            <button type="button" onclick="document.getElementById('editAdminPhotoInput').click()"
                                class="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                Change Photo
                            </button>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="editAdminNewPassword" class="block text-sm font-medium text-gray-700 mb-2">New Password (leave blank to keep current)</label>
                        <input type="password" id="editAdminNewPassword" name="editAdminNewPassword"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                </div>

                <div class="button-group flex gap-3 mt-6">
                    <button type="button" data-action="prev" onclick="closeEditAdminModal()"
                        class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors hidden">
                        Previous
                    </button>
                    <button type="button" data-action="next"
                        class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                        Next
                    </button>
                    <button type="button" data-action="submit" onclick="checkPasswordChange()"
                        class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors hidden">
                        Save Changes
                    </button>
                </div>
            </form>
            <div class="message hidden mt-4 p-3 rounded-lg text-sm" id="editAdminMessage"></div>
        </div>
    </div>

    <div class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" id="passwordConfirmModal">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-green-800">Confirm Password Change</h2>
                <button onclick="closePasswordConfirmModal()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="mb-4">
                <p class="text-gray-700">You are changing an admin's password. Please enter your password to confirm.</p>
            </div>
            <div class="mb-4">
                <label for="confirmSuperadminPassword" class="block text-sm font-medium text-gray-700 mb-2">Your Password</label>
                <input type="password" id="confirmSuperadminPassword" name="confirmSuperadminPassword"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
            </div>
            <div class="button-group flex gap-3">
                <button onclick="closePasswordConfirmModal()"
                    class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Cancel
                </button>
                <button onclick="confirmPasswordAndSave()"
                    class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Confirm & Save
                </button>
            </div>
            <div class="message hidden mt-4 p-3 rounded-lg text-sm" id="passwordConfirmMessage"></div>
        </div>
    </div>

    ${getDialogModalHTML()}
    `;
}

export function initEditAdminModal(loadAdminsListCallback) {
    window.editAdminUploadedPhotoUrl = null;
    window.editAdminPhotoFile = null;
    window.loadAdminsList = loadAdminsListCallback;
    
    window.closeEditAdminModal = closeEditAdminModal;
    window.closePasswordConfirmModal = closePasswordConfirmModal;
    window.checkPasswordChange = checkPasswordChange;
    window.confirmPasswordAndSave = confirmPasswordAndSave;
    
    initStepForm('editAdminForm', 3);
    
    initDialogModal();
    
    const editAdminPhotoInput = document.getElementById('editAdminPhotoInput');
    if (editAdminPhotoInput) {
        editAdminPhotoInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                window.editAdminPhotoFile = file;
                const preview = document.getElementById('editAdminPhotoPreview');
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    preview.innerHTML = `<img src="${event.target.result}" alt="Profile photo" class="w-full h-full object-cover">`;
                };
                reader.readAsDataURL(file);
            }
        };
    }
}

export function openEditAdminModal(id, username, email, department, role) {
    const modal = document.getElementById('editAdminModal');
    document.getElementById('editAdminId').value = id;
    document.getElementById('editAdminUsername').value = username;
    document.getElementById('editAdminEmail').value = email;
    document.getElementById('editAdminDepartment').value = department;
    document.getElementById('editAdminRole').value = role;
    document.getElementById('editAdminNewPassword').value = '';
    
    // Reset photo preview and file
    document.getElementById('editAdminPhotoPreview').innerHTML = '<span class="text-gray-400 text-sm">No photo</span>';
    window.editAdminUploadedPhotoUrl = null;
    window.editAdminPhotoFile = null;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

export function closeEditAdminModal() {
    document.getElementById('editAdminModal').classList.add('hidden');
    document.getElementById('editAdminModal').classList.remove('flex');
}

export function closePasswordConfirmModal() {
    document.getElementById('passwordConfirmModal').classList.add('hidden');
    document.getElementById('passwordConfirmModal').classList.remove('flex');
}

export function checkPasswordChange() {
    const newPassword = document.getElementById('editAdminNewPassword').value;
    const username = document.getElementById('editAdminUsername').value;
    const email = document.getElementById('editAdminEmail').value;
    const department = document.getElementById('editAdminDepartment').value;
    const messageDiv = document.getElementById('editAdminMessage');
    
    if (!username || !email || !department) {
        messageDiv.textContent = 'Please fill in all required fields';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
        return;
    }
    
    showConfirmDialog('Confirm Update', 'Are you sure you want to update this admin\'s details?', () => {
        if (newPassword && newPassword.length > 0) {
            document.getElementById('confirmSuperadminPassword').value = '';
            document.getElementById('passwordConfirmModal').classList.remove('hidden');
            document.getElementById('passwordConfirmModal').classList.add('flex');
        } else {
            saveEditedAdminWithoutPassword();
        }
    });
}

export async function confirmPasswordAndSave() {
    const superadminPassword = document.getElementById('confirmSuperadminPassword').value;
    const messageDiv = document.getElementById('passwordConfirmMessage');
    
    if (!superadminPassword) {
        messageDiv.textContent = 'Please enter your password';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
        return;
    }
    
    await saveEditedAdminWithPassword(superadminPassword);
}

export async function saveEditedAdminWithoutPassword() {
    const token = localStorage.getItem('adminToken');
    const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
    
    const id = document.getElementById('editAdminId').value;
    const username = document.getElementById('editAdminUsername').value;
    const email = document.getElementById('editAdminEmail').value;
    const department = document.getElementById('editAdminDepartment').value;
    const role = document.getElementById('editAdminRole').value;
    const messageDiv = document.getElementById('editAdminMessage');
    
    let profilePhotoUrl = window.editAdminUploadedPhotoUrl;
    
    try {
        // Upload photo to Cloudinary if a new file was selected
        if (window.editAdminPhotoFile) {
            const formData = new FormData();
            formData.append('file', window.editAdminPhotoFile);
            
            const uploadResponse = await fetch(`${API_BASE_URL}/api/admin/upload-photo`, {
                method: 'POST',
                body: formData
            });
            
            const uploadData = await uploadResponse.json();
            
            if (uploadData.success) {
                profilePhotoUrl = uploadData.photoUrl;
            } else {
                messageDiv.textContent = 'Failed to upload photo: ' + uploadData.message;
                messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
                messageDiv.classList.remove('hidden');
                return;
            }
        }
        
        const response = await fetch(`${API_BASE_URL}/api/admin/admins/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                username, 
                email, 
                department, 
                role,
                profilePhotoUrl,
                newPassword: null,
                superadminUsername: adminData.username
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageDiv.textContent = 'Admin updated successfully!';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-green-100 border border-green-300 text-green-700';
            messageDiv.classList.remove('hidden');
            
            if (window.loadAdminsList) {
                window.loadAdminsList(token);
            }
            
            setTimeout(() => {
                closeEditAdminModal();
                messageDiv.classList.add('hidden');
            }, 1500);
        } else {
            messageDiv.textContent = data.message || 'Failed to update admin';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
            messageDiv.classList.remove('hidden');
        }
    } catch (error) {
        messageDiv.textContent = 'Error updating admin: ' + error.message;
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
    }
}

export async function saveEditedAdminWithPassword(superadminPassword) {
    const token = localStorage.getItem('adminToken');
    const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
    
    const id = document.getElementById('editAdminId').value;
    const username = document.getElementById('editAdminUsername').value;
    const email = document.getElementById('editAdminEmail').value;
    const department = document.getElementById('editAdminDepartment').value;
    const role = document.getElementById('editAdminRole').value;
    const newPassword = document.getElementById('editAdminNewPassword').value;
    const messageDiv = document.getElementById('passwordConfirmMessage');
    
    let profilePhotoUrl = window.editAdminUploadedPhotoUrl;
    
    try {
        // Upload photo to Cloudinary if a new file was selected
        if (window.editAdminPhotoFile) {
            const formData = new FormData();
            formData.append('file', window.editAdminPhotoFile);
            
            const uploadResponse = await fetch(`${API_BASE_URL}/api/admin/upload-photo`, {
                method: 'POST',
                body: formData
            });
            
            const uploadData = await uploadResponse.json();
            
            if (uploadData.success) {
                profilePhotoUrl = uploadData.photoUrl;
            } else {
                messageDiv.textContent = 'Failed to upload photo: ' + uploadData.message;
                messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
                messageDiv.classList.remove('hidden');
                return;
            }
        }
        
        const response = await fetch(`${API_BASE_URL}/api/admin/admins/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                username, 
                email, 
                department, 
                role,
                profilePhotoUrl,
                newPassword,
                superadminEmail: adminData.email,
                superadminPassword,
                superadminUsername: adminData.username
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            closePasswordConfirmModal();
            
            closeEditAdminModal();
            
            if (window.loadAdminsList) {
                window.loadAdminsList(token);
            }
        } else {
            messageDiv.textContent = data.message || 'Failed to update admin';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
            messageDiv.classList.remove('hidden');
        }
    } catch (error) {
        messageDiv.textContent = 'Error updating admin: ' + error.message;
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
    }
}
