import { initStepForm } from '../../utils/steps.js';

export function getAddAdminModalHTML() {
    return `
    <div class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" id="addAdminModal">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-green-800">Add New Admin</h2>
                <button onclick="closeAddAdminModal()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-green-800" id="stepDescription">Basic Information</h3>
            </div>

            <form id="addAdminForm">
                <div data-step="1">
                    <div class="mb-4">
                        <label for="newAdminUsername" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input type="text" id="newAdminUsername" name="newAdminUsername"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                    <div class="mb-4">
                        <label for="newAdminEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" id="newAdminEmail" name="newAdminEmail"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                </div>

                <div data-step="2" class="hidden">
                    <div class="mb-4">
                        <label for="newAdminPassword" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input type="password" id="newAdminPassword" name="newAdminPassword"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                    <div class="mb-4">
                        <label for="newAdminDepartment" class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <input type="text" id="newAdminDepartment" name="newAdminDepartment"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                    </div>
                    <div class="mb-4">
                        <label for="newAdminRole" class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <select id="newAdminRole" name="newAdminRole"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
                    </div>
                </div>

                <div class="button-group flex gap-3 mt-6">
                    <button type="button" data-action="prev" onclick="closeAddAdminModal()"
                        class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors hidden">
                        Previous
                    </button>
                    <button type="button" data-action="next"
                        class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                        Next
                    </button>
                    <button type="button" data-action="submit" onclick="createNewAdmin()"
                        class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors hidden">
                        Create Admin
                    </button>
                </div>
            </form>
            <div class="message hidden mt-4 p-3 rounded-lg text-sm" id="addAdminMessage"></div>
        </div>
    </div>
    `;
}

export function initAddAdminModal(loadAdminsListCallback) {
    window.loadAdminsList = loadAdminsListCallback;
    
    initStepForm('addAdminForm', 2);
}

export function openAddAdminModal() {
    const modal = document.getElementById('addAdminModal');
    document.getElementById('newAdminUsername').value = '';
    document.getElementById('newAdminEmail').value = '';
    document.getElementById('newAdminPassword').value = '';
    document.getElementById('newAdminDepartment').value = '';
    document.getElementById('newAdminRole').value = 'admin';
    
    initStepForm('addAdminForm', 2);
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

export function closeAddAdminModal() {
    document.getElementById('addAdminModal').classList.add('hidden');
    document.getElementById('addAdminModal').classList.remove('flex');
}

export async function createNewAdmin() {
    const token = localStorage.getItem('adminToken');
    const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
    
    if (adminData.role !== 'superadmin') {
        alert('Only superadmins can create new admins');
        return;
    }
    
    const username = document.getElementById('newAdminUsername').value;
    const email = document.getElementById('newAdminEmail').value;
    const password = document.getElementById('newAdminPassword').value;
    const department = document.getElementById('newAdminDepartment').value;
    const role = document.getElementById('newAdminRole').value;
    
    const messageDiv = document.getElementById('addAdminMessage');
    
    if (!username || !email || !password || !department) {
        messageDiv.textContent = 'Please fill in all required fields';
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8080/api/admin/admins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, email, password, department, role })
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageDiv.textContent = 'Admin created successfully!';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-green-100 border border-green-300 text-green-700';
            messageDiv.classList.remove('hidden');
            
            if (window.loadAdminsList) {
                window.loadAdminsList(token);
            }
            
            setTimeout(() => {
                closeAddAdminModal();
                messageDiv.classList.add('hidden');
            }, 1500);
        } else {
            messageDiv.textContent = data.message || 'Failed to create admin';
            messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
            messageDiv.classList.remove('hidden');
        }
    } catch (error) {
        messageDiv.textContent = 'Error creating admin: ' + error.message;
        messageDiv.className = 'mt-4 p-3 rounded-lg text-sm bg-red-100 border border-red-300 text-red-700';
        messageDiv.classList.remove('hidden');
    }
}

window.openAddAdminModal = openAddAdminModal;
window.closeAddAdminModal = closeAddAdminModal;
window.createNewAdmin = createNewAdmin;
