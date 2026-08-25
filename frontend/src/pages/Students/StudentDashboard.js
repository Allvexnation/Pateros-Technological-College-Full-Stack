import { StudentNavbar, initStudentNavbar } from '../../components/student/StudentNavbar.js';
import { Footer } from '../../components/Footer.js';
import { initStudentAnimation } from '../../provider/Student/StudentAnimation.js';
import { isAuthenticated, getCurrentUser, logout } from '../../api/auth/auth.js';
import { EditStudentProfileModal, initEditStudentProfileModal } from '../../components/modals/EditStudentProfile.js';
import { getDialogModalHTML } from '../../components/modals/DialogModal.js';
import { fetchUserData } from '../../api/student/StudentDashboard/StudentDashboard.js';

export function StudentDashboardPage() {
    return `
    ${StudentNavbar()}

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
                    <h2 class="text-2xl font-bold text-green-800 mb-6">Student Dashboard</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                            <div class="text-3xl font-bold">1</div>
                            <div class="text-sm opacity-90">Active Courses</div>
                        </div>
                        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                            <div class="text-3xl font-bold">95%</div>
                            <div class="text-sm opacity-90">Attendance Rate</div>
                        </div>
                        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                            <div class="text-3xl font-bold">3.8</div>
                            <div class="text-sm opacity-90">GPA</div>
                        </div>
                    </div>

                    <h3 class="text-lg font-semibold text-green-800 mb-4">Quick Actions</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <button class="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-4 text-center transition-colors">
                            <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Courses</span>
                        </button>
                        <button class="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-4 text-center transition-colors">
                            <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Grades</span>
                        </button>
                        <button class="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-4 text-center transition-colors">
                            <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Schedule</span>
                        </button>
                        <button class="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-4 text-center transition-colors">
                            <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Announcements</span>
                        </button>
                    </div>

                    <h3 class="text-lg font-semibold text-green-800 mb-4">Recent Activity</h3>
                    <div class="space-y-3">
                        <div class="bg-white border border-gray-200 rounded-lg p-3 flex items-center">
                            <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span class="text-sm text-gray-700">Welcome to Pateros Technological College Student Portal</span>
                        </div>
                        <div class="bg-white border border-gray-200 rounded-lg p-3 flex items-center">
                            <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span class="text-sm text-gray-700">Your account has been created successfully</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    ${EditStudentProfileModal()}

    ${Footer()}
    `;
}

export function initStudentDashboardPage() {
    if (!isAuthenticated()) {
        window.location.hash = '#studentlogin';
        return;
    }

    document.body.classList.add('student-page');
    
    initStudentAnimation();
    initStudentNavbar();
    initEditStudentProfileModal();
    
    // Initialize DialogModal
    const dialogContainer = document.createElement('div');
    dialogContainer.innerHTML = getDialogModalHTML();
    document.body.appendChild(dialogContainer);
    
    const userData = getCurrentUser();
    if (userData) {
        // Fetch fresh data from API
        fetchUserData(userData.id).then(result => {
            if (result.success) {
                const updatedUser = result.user;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                const username = document.getElementById('username');
                const email = document.getElementById('email');
                const profilePhoto = document.getElementById('profilePhoto');
                const profilePlaceholder = document.getElementById('profilePlaceholder');
                
                if (username) username.textContent = updatedUser.username;
                if (email) email.textContent = updatedUser.email;
                
                if (updatedUser.profilePhotoUrl && profilePhoto && profilePlaceholder) {
                    profilePhoto.src = updatedUser.profilePhotoUrl + '?t=' + Date.now();
                    profilePhoto.classList.remove('hidden');
                    profilePlaceholder.classList.add('hidden');
                }
            }
        }).catch(error => {
            console.error('Error fetching user data:', error);
        });
    }
}

