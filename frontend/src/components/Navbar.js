import { StripBar } from './StripBar.js';

export function Navbar() {
    return `
    <nav class="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <img src="public/logo-ptc.png" alt="PTC Logo" class="h-10 w-auto mr-3">
                    <span class="font-bold text-lg">Pateros Technological College</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#login" class="bg-green-600 hover:bg-green-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                        Login
                    </a>
                    <button id="hamburger-menu" class="text-white hover:bg-green-600 p-2 rounded-lg transition-colors">
                        <svg id="hamburger-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        ${StripBar()}
    </nav>
    `;
}
