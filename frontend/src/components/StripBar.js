export function StripBar() {
    return `
    <div id="tab-strip" class="absolute bg-white w-full left-0 overflow-hidden transition-all duration-300 ease-in-out" style="max-height: 0;">
        <div class="flex items-center">
            <button id="scroll-left" class="flex-shrink-0 px-2 py-3 hover:bg-gray-100 text-gray-600 transition-colors md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div id="tabs-container" class="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide" style="-ms-overflow-style: none; scrollbar-width: none;">
                <div class="flex inline-flex">
                    <a href="#about" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">About us</a>
                    <a href="#admission" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">Admission</a>
                    <a href="#campus-life" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">PTC Campus Life</a>
                    <a href="#president" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">College President</a>
                    <a href="#academic-affairs" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">Academic Affairs</a>
                    <a href="#administration" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">Administration</a>
                    <a href="#publication" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">Publication</a>
                    <a href="#news" class="px-4 py-3 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-800 whitespace-nowrap">News & Updates</a>
                </div>
            </div>
            <button id="scroll-right" class="flex-shrink-0 px-2 py-3 hover:bg-gray-100 text-gray-600 transition-colors md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
    `;
}
