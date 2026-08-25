import { StudentStripBar } from './StudentStripbar.js';
import { getCurrentUser, logout } from '../../api/auth/auth.js';

export function StudentNavbar() {
    return `
    <nav class="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <img src="public/logo-ptc.png" alt="PTC Logo" class="h-10 w-auto mr-3">
                    <span class="font-bold text-lg hidden md:block">Pateros Technological College - Student LMS</span>
                    <span class="font-bold text-lg md:hidden">PTC - Student LMS</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-sm hidden md:block" id="navUsername">Welcome, Student</span>
                    <div class="md:hidden flex items-center space-x-2">
                        <img src="" alt="Profile" class="w-8 h-8 rounded-full object-cover border-2 border-green-400 hidden" id="navProfilePhoto">
                        <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center" id="navProfilePlaceholder">
                            <i data-lucide="user" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <button id="logoutBtn" class="bg-green-600 hover:bg-green-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hidden md:flex items-center gap-2">
                        <span>Logout</span>
                    </button>
                    <button id="logoutBtnMobile" class="bg-green-600 hover:bg-green-800 p-2 rounded-lg transition-colors md:hidden">
                        <i data-lucide="log-out" class="w-5 h-5"></i>
                    </button>
                    <button id="student-hamburger-menu" class="text-white hover:bg-green-600 p-2 rounded-lg transition-colors">
                        <svg id="student-hamburger-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg id="student-close-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        ${StudentStripBar()}
    </nav>

    <div id="logoutModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-[100]">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h3>
            <p class="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div class="flex gap-3 justify-end">
                <button id="cancelLogout" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors">
                    No
                </button>
                <button id="confirmLogout" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors">
                    Yes
                </button>
            </div>
        </div>
    </div>
    `;
}

export function initStudentNavbar() {
    const userData = getCurrentUser() || {};

    const navUsername = document.getElementById('navUsername');
    const navProfilePhoto = document.getElementById('navProfilePhoto');
    const navProfilePlaceholder = document.getElementById('navProfilePlaceholder');
    if (navUsername) navUsername.textContent = `Welcome, ${userData.username || 'Student'}`;
    
    if (userData.profilePhotoUrl && navProfilePhoto && navProfilePlaceholder) {
        navProfilePhoto.src = userData.profilePhotoUrl;
        navProfilePhoto.classList.remove('hidden');
        navProfilePlaceholder.classList.add('hidden');
    }

    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBtnMobile = document.getElementById('logoutBtnMobile');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutBtn && logoutModal) {
        logoutBtn.addEventListener('click', () => {
            logoutModal.classList.remove('hidden');
            logoutModal.classList.add('flex');
        });
    }

    if (logoutBtnMobile && logoutModal) {
        logoutBtnMobile.addEventListener('click', () => {
            logoutModal.classList.remove('hidden');
            logoutModal.classList.add('flex');
        });
    }

    if (cancelLogout && logoutModal) {
        cancelLogout.addEventListener('click', () => {
            logoutModal.classList.add('hidden');
            logoutModal.classList.remove('flex');
        });
    }

    if (confirmLogout && logoutModal) {
        confirmLogout.addEventListener('click', () => {
            logout();
            logoutModal.classList.add('hidden');
            logoutModal.classList.remove('flex');
        });
    }

    if (logoutModal) {
        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) {
                logoutModal.classList.add('hidden');
                logoutModal.classList.remove('flex');
            }
        });
    }

    const hamburgerMenu = document.getElementById('student-hamburger-menu');
    const hamburgerIcon = document.getElementById('student-hamburger-icon');
    const closeIcon = document.getElementById('student-close-icon');
    const tabStrip = document.getElementById('student-tab-strip');

    if (hamburgerMenu && tabStrip) {
        const stripBarState = localStorage.getItem('studentStripBarState');
        const mainContent = document.querySelector('main');
        
        if (stripBarState === 'expanded') {
            tabStrip.style.maxHeight = tabStrip.scrollHeight + 'px';
            hamburgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            if (mainContent) mainContent.style.paddingTop = 'calc(2rem + ' + tabStrip.scrollHeight + 'px)';
        } else {
            tabStrip.style.maxHeight = '0px';
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            if (mainContent) mainContent.style.paddingTop = '2rem';
        }

        hamburgerMenu.addEventListener('click', () => {
            const isExpanded = tabStrip.style.maxHeight !== '0px' && tabStrip.style.maxHeight !== '';
            const mainContent = document.querySelector('main');
            
            if (isExpanded) {
                tabStrip.style.maxHeight = '0px';
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                localStorage.setItem('studentStripBarState', 'collapsed');
                if (mainContent) mainContent.style.paddingTop = '2rem';
            } else {
                tabStrip.style.maxHeight = tabStrip.scrollHeight + 'px';
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                localStorage.setItem('studentStripBarState', 'expanded');
                if (mainContent) mainContent.style.paddingTop = 'calc(2rem + ' + tabStrip.scrollHeight + 'px)';
            }
        });
    }

    const scrollLeft = document.getElementById('student-scroll-left');
    const scrollRight = document.getElementById('student-scroll-right');
    const tabsContainer = document.getElementById('student-tabs-container');

    if (scrollLeft && scrollRight && tabsContainer) {
        scrollLeft.addEventListener('click', () => {
            tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });

        scrollRight.addEventListener('click', () => {
            tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
