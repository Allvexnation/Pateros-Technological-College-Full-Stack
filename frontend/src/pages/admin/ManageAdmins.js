import { getAddAdminModalHTML, initAddAdminModal, createNewAdmin } from '../../components/modals/AddAdmin.js';
import { getEditAdminModalHTML, initEditAdminModal, openEditAdminModal, checkPasswordChange, confirmPasswordAndSave } from '../../components/modals/EditAdmins.js';
import { getDialogModalHTML, initDialogModal, showConfirmDialog } from '../../components/modals/DialogModal.js';
import { AdminNavbar, initAdminNavbar } from '../../components/admin/AdminNavbar.js';
import { Footer } from '../../components/Footer.js';
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } from '../../api/admin/AdminDashboard/ManageAdmins.js';
import { getAdminToken, getAdminData } from '../../api/auth/token.js';

export function ManageAdminsPage() {
    return `
    ${AdminNavbar()}

    <main class="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div class="p-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 class="text-2xl font-bold text-green-800">Manage Admins</h2>
                <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div class="relative">
                        <input type="text" id="searchAdmins" placeholder="Search admins..." 
                            class="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <button onclick="openAddAdminModal()" class="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Add Admin
                    </button>
                </div>
            </div>
            <div id="adminsList" class="space-y-4">
                <p class="text-gray-500">Loading admins...</p>
            </div>
        </div>
    </main>

    ${getAddAdminModalHTML()}

    ${getEditAdminModalHTML()}

    ${getDialogModalHTML()}

    <div class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" id="deleteAdminModal">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-red-800">Delete Admin</h2>
                <button onclick="document.getElementById('deleteAdminModal').classList.add('hidden'); document.getElementById('deleteAdminModal').classList.remove('flex');" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <input type="hidden" id="deleteAdminId">
            <div class="mb-4">
                <p class="text-gray-700">Are you sure you want to delete admin <strong id="deleteAdminUsername"></strong>? This action cannot be undone.</p>
            </div>
            <div class="mb-4">
                <label for="deleteAdminSuperadminPassword" class="block text-sm font-medium text-gray-700 mb-2">Your Password (required for deletion)</label>
                <input type="password" id="deleteAdminSuperadminPassword" name="deleteAdminSuperadminPassword"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
            </div>
            <div class="button-group flex gap-3">
                <button onclick="document.getElementById('deleteAdminModal').classList.add('hidden'); document.getElementById('deleteAdminModal').classList.remove('flex');"
                    class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Cancel
                </button>
                <button onclick="confirmDeleteAdmin()"
                    class="flex-1 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Delete Admin
                </button>
            </div>
            <div class="message hidden mt-4 p-3 rounded-lg text-sm" id="deleteAdminMessage"></div>
        </div>
    </div>

    ${Footer()}
    `;
}

export function initManageAdminsPage() {
    const token = getAdminToken();
    const adminData = getAdminData() || {};

    if (!token) {
        window.location.hash = '#adminlogin';
        return;
    }

    if (adminData.role !== 'superadmin') {
        window.location.hash = '#admindashboard';
        return;
    }

    // Add admin-page class to body
    document.body.classList.add('admin-page');

    initAdminNavbar();
    loadAdminsList(token);
    initEditAdminModal(loadAdminsList);
    initAddAdminModal(loadAdminsList);
    initDialogModal();

    // Add search functionality
    const searchInput = document.getElementById('searchAdmins');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterAdmins(e.target.value);
        });
    }
}

// Store admins data globally for filtering
let allAdminsData = [];

async function loadAdminsList(token) {
    try {
        const data = await getAllAdmins(token);
        
        if (data.success) {
            allAdminsData = data.admins;
            renderAdminsList(allAdminsData);
        }
    } catch (error) {
        console.error('Error loading admins list:', error);
    }
}

function renderAdminsList(admins) {
    const adminsList = document.getElementById('adminsList');
    const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
    
    adminsList.innerHTML = admins.map(admin => {
        const isCurrentUser = admin.id === adminData.id;
        const roleBadge = admin.role === 'superadmin' 
            ? '<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">Super Admin</span>'
            : '<span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Admin</span>';
        
        const editInfo = admin.editedBy 
            ? `<p class="text-xs text-gray-500 mt-1">Last edited by: ${admin.editedBy} at ${new Date(admin.editedAt).toLocaleString()}</p>`
            : '';
        
        return `
            <div class="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4 overflow-hidden">
                        ${admin.profilePhotoUrl 
                            ? `<img src="${admin.profilePhotoUrl}" alt="${admin.username}" class="w-full h-full object-cover">`
                            : `<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>`
                        }
                    </div>
                    <div>
                        <div class="flex items-center">
                            <h4 class="font-semibold text-gray-800 mr-2">${admin.username}</h4>
                            ${roleBadge}
                        </div>
                        <p class="text-sm text-gray-600">${admin.email}</p>
                        <p class="text-sm text-gray-500">${admin.department}</p>
                        ${editInfo}
                    </div>
                </div>
                <div class="flex gap-2">
                    ${!isCurrentUser ? `
                        <button onclick="openEditAdminModal('${admin.id}', '${admin.username}', '${admin.email}', '${admin.department}', '${admin.role}')" 
                            class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                            Edit
                        </button>
                        <button onclick="openDeleteAdminModal('${admin.id}', '${admin.username}')" 
                            class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                            Delete
                        </button>
                    ` : `
                        <span class="text-xs text-gray-400 italic">Current user</span>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function filterAdmins(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        renderAdminsList(allAdminsData);
        return;
    }
    
    const filtered = allAdminsData.filter(admin => 
        admin.username.toLowerCase().includes(term) ||
        admin.email.toLowerCase().includes(term) ||
        admin.department.toLowerCase().includes(term)
    );
    
    renderAdminsList(filtered);
}

function openDeleteAdminModal(id, username) {
    // Show confirmation dialog before showing the delete modal
    showConfirmDialog('Delete Admin', `Are you sure you want to delete admin ${username}? This action cannot be undone.`, () => {
        const modal = document.getElementById('deleteAdminModal');
        document.getElementById('deleteAdminId').value = id;
        document.getElementById('deleteAdminUsername').textContent = username;
        document.getElementById('deleteAdminSuperadminPassword').value = '';
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });
}

async function confirmDeleteAdmin() {
    const token = getAdminToken();
    const adminData = getAdminData() || {};
    
    const id = document.getElementById('deleteAdminId').value;
    const superadminPassword = document.getElementById('deleteAdminSuperadminPassword').value;
    
    const messageDiv = document.getElementById('deleteAdminMessage');
    
    if (!superadminPassword) {
        messageDiv.textContent = 'Please enter your password to confirm deletion';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
        return;
    }
    
    try {
        const data = await deleteAdmin(token, id, {
            superadminEmail: adminData.email,
            superadminPassword: superadminPassword
        });
        
        if (data.success) {
            messageDiv.textContent = 'Admin deleted successfully!';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-green-100 border border-green-300 text-green-700';
            messageDiv.classList.remove('hidden');
            
            loadAdminsList(token);
            
            setTimeout(() => {
                document.getElementById('deleteAdminModal').classList.add('hidden');
                document.getElementById('deleteAdminModal').classList.remove('flex');
                messageDiv.classList.add('hidden');
            }, 1500);
        } else {
            messageDiv.textContent = data.message || 'Failed to delete admin';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
            messageDiv.classList.remove('hidden');
        }
    } catch (error) {
        messageDiv.textContent = 'Error deleting admin: ' + error.message;
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
    }
}

async function saveEditedAdmin() {
    const token = getAdminToken();
    const adminData = getAdminData() || {};
    
    const id = document.getElementById('editAdminId').value;
    const username = document.getElementById('editAdminUsername').value;
    const email = document.getElementById('editAdminEmail').value;
    const department = document.getElementById('editAdminDepartment').value;
    const role = document.getElementById('editAdminRole').value;
    const newPassword = document.getElementById('editAdminNewPassword').value;
    const superadminPassword = document.getElementById('editAdminSuperadminPassword').value;
    
    const messageDiv = document.getElementById('editAdminMessage');
    
    if (!username || !email || !department) {
        messageDiv.textContent = 'Please fill in all required fields';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
        return;
    }
    
    if (newPassword && newPassword.length > 0 && !superadminPassword) {
        messageDiv.textContent = 'Please enter your password to confirm password change';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
        return;
    }
    
    try {
        const requestBody = { 
            username, 
            email, 
            department, 
            role,
            newPassword: newPassword || null
        };
        
        if (newPassword && newPassword.length > 0) {
            requestBody.superadminEmail = adminData.email;
            requestBody.superadminPassword = superadminPassword;
        }
        
        const data = await updateAdmin(token, id, requestBody);
        
        if (data.success) {
            messageDiv.textContent = 'Admin updated successfully!';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-green-100 border border-green-300 text-green-700';
            messageDiv.classList.remove('hidden');
            
            loadAdminsList(token);
            
            setTimeout(() => {
                document.getElementById('editAdminModal').classList.add('hidden');
                document.getElementById('editAdminModal').classList.remove('flex');
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

window.openDeleteAdminModal = openDeleteAdminModal;
window.confirmDeleteAdmin = confirmDeleteAdmin;
window.saveEditedAdmin = saveEditedAdmin;
window.openEditAdminModal = openEditAdminModal;
window.checkPasswordChange = checkPasswordChange;
window.confirmPasswordAndSave = confirmPasswordAndSave;
