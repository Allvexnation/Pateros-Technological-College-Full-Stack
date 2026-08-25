import { AdminNavbar, initAdminNavbar } from '../../components/admin/AdminNavbar.js';
import { Footer } from '../../components/Footer.js';
import { getAdminToken, getAdminData, saveAdminData } from '../../api/auth/token.js';
import { API_BASE_URL } from '../../api/server/api.js';
import { EditAdminProfileModal, initEditAdminProfileModal } from '../../components/modals/EditAdminProfile.js';
import { getDialogModalHTML } from '../../components/modals/DialogModal.js';

export function AdminDashboardPage() {
    return `
    ${AdminNavbar()}

    <main class="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1">
                <div class="p-6">
                    <div class="text-center mb-6">
                        <img src="" alt="Profile Photo" class="profile-photo w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-200 shadow-lg hidden" id="profilePhoto">
                        <div class="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center border-4 border-green-200" id="profilePlaceholder">
                            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>

                    <div class="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                        <h2 class="text-lg font-semibold text-green-800 mb-3">Profile Information</h2>
                        <div class="space-y-2">
                            <p class="flex items-center text-sm">
                                <svg class="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span class="text-gray-700"><strong>Username:</strong> <span id="username">Loading...</span></span>
                            </p>
                            <p class="flex items-center text-sm">
                                <svg class="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span class="text-gray-700"><strong>Email:</strong> <span id="email">Loading...</span></span>
                            </p>
                            <p class="flex items-center text-sm">
                                <svg class="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                                <span class="text-gray-700"><strong>Department:</strong> <span id="department">Loading...</span></span>
                            </p>
                        </div>
                    </div>

                    <button onclick="toggleEditForm()"
                        class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit Profile
                    </button>
                </div>
            </div>

            <div class="lg:col-span-2">
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-green-800 mb-6">Admin Dashboard</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                            <div class="text-3xl font-bold" id="totalAdmins">-</div>
                            <div class="text-sm opacity-90">Total Admins</div>
                        </div>
                        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                            <div class="text-3xl font-bold" id="totalDepartments">-</div>
                            <div class="text-sm opacity-90">Departments</div>
                        </div>
                        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                            <div class="text-3xl font-bold" id="activeSessions">-</div>
                            <div class="text-sm opacity-90">Active Sessions</div>
                        </div>
                    </div>

                    <h3 class="text-lg font-semibold text-green-800 mb-4">Quick Actions</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <button id="manageAdminsBtn" onclick="window.location.hash='#manageadmins'" class="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-4 text-center transition-colors">
                            <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Manage Admins</span>
                        </button>
                        <button class="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-4 text-center transition-colors">
                            <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">View Reports</span>
                        </button>
                        <button class="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-4 text-center transition-colors">
                            <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Settings</span>
                        </button>
                    </div>

                    <h3 class="text-lg font-semibold text-green-800 mb-4">Recent Activity</h3>
                    <div id="activityList" class="space-y-3">
                        <p class="text-gray-500">Loading activity...</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    ${EditAdminProfileModal()}

    ${Footer()}
    `;
}

export function initAdminDashboardPage() {
    const token = getAdminToken();
    const adminData = getAdminData() || {};

    if (!token) {
        window.location.hash = '#adminlogin';
        return;
    }

    document.body.classList.add('admin-page');

    initAdminNavbar();
    initEditAdminProfileModal();
    
    // Initialize DialogModal
    const dialogContainer = document.createElement('div');
    dialogContainer.innerHTML = getDialogModalHTML();
    document.body.appendChild(dialogContainer);

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const department = document.getElementById('department');
    const profilePhoto = document.getElementById('profilePhoto');
    const profilePlaceholder = document.getElementById('profilePlaceholder');

    if (username) username.textContent = adminData.username || 'Loading...';
    if (email) email.textContent = adminData.email || 'Loading...';
    if (department) department.textContent = adminData.department || 'Loading...';
    
    if (adminData.profilePhotoUrl) {
        if (profilePhoto) {
            profilePhoto.src = adminData.profilePhotoUrl;
            profilePhoto.classList.remove('hidden');
        }
        if (profilePlaceholder) profilePlaceholder.classList.add('hidden');
    }

    const manageAdminsBtn = document.getElementById('manageAdminsBtn');
    if (manageAdminsBtn && adminData.role !== 'superadmin') {
        manageAdminsBtn.classList.add('hidden');
    }

    loadDashboardData(token);
    
}

async function loadDashboardData(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('totalAdmins').textContent = data.stats.totalAdmins || 0;
            document.getElementById('totalDepartments').textContent = data.stats.totalDepartments || 0;
            document.getElementById('activeSessions').textContent = data.stats.activeSessions || 0;

            const activityList = document.getElementById('activityList');
            if (data.activities && data.activities.length > 0) {
                activityList.innerHTML = data.activities.map(activity => `
                    <div class="bg-white border border-gray-200 rounded-lg p-3 flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span class="text-sm text-gray-700">${activity.description}</span>
                    </div>
                `).join('');
            } else {
                activityList.innerHTML = `
                    <div class="bg-white border border-gray-200 rounded-lg p-3 flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span class="text-sm text-gray-700">Welcome to Pateros Technological College Admin Portal</span>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-3 flex items-center">
                        <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span class="text-sm text-gray-700">Your admin session has been started successfully</span>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}









