export function AdminStripBar() {
    const currentHash = window.location.hash || '#admindashboard';
    
    return `
    <div id="admin-tab-strip" class="absolute bg-white w-full left-0 overflow-hidden transition-all duration-300 ease-in-out" style="max-height: 0;">
        <div class="flex items-center">
            <button id="admin-scroll-left" class="flex-shrink-0 px-2 py-3 hover:bg-gray-100 text-gray-600 transition-colors md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div id="admin-tabs-container" class="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide" style="-ms-overflow-style: none; scrollbar-width: none;">
                <div class="flex inline-flex">
                    <a href="#admindashboard" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#admindashboard' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Dashboard</a>
                    <a href="#admission" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#admission' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Admission</a>
                    <a href="#students" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#students' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Students</a>
                    <a href="#subjects" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#subjects' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Subjects</a>
                    <a href="#grades" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#grades' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Grades</a>
                    <a href="#teachers" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#teachers' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Teachers</a>
                    <a href="#announcements" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#announcements' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Announcements</a>
                    <a href="#admins" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#admins' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Admins</a>
                    <a href="#manageadmins" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#manageadmins' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Manage Admins</a>
                    <a href="#settings" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap ${currentHash === '#settings' ? 'bg-green-100 text-green-700 border-b-2 border-green-700' : ''}">Settings</a>
                </div>
            </div>
            <button id="admin-scroll-right" class="flex-shrink-0 px-2 py-3 hover:bg-gray-100 text-gray-600 transition-colors md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
    `;
}
