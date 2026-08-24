import { missionVisionData } from '../static/MissionVision.js';

export function MissionVision() {
    return `
    <section class="py-20 relative text-white">
        <div class="absolute inset-0 z-0">
            <img src="public/RoofdeckEveryone.png" alt="PTC Campus" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-br from-green-900/90 to-green-800/85"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
            <h2 class="text-4xl font-bold text-center mb-16 drop-shadow-lg">Our Mission & Vision</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div class="bg-white bg-opacity-95 rounded-2xl p-8 backdrop-blur-md border border-green-500 border-opacity-30 shadow-2xl">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-green-800">Our Vision</h3>
                    </div>
                    <p class="text-green-900 leading-relaxed text-lg font-medium">${missionVisionData.vision}</p>
                </div>

                <div class="bg-white bg-opacity-95 rounded-2xl p-8 backdrop-blur-md border border-green-500 border-opacity-30 shadow-2xl">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-green-800">Core Values</h3>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        ${missionVisionData.core_values.map(value => `
                            <div class="bg-green-100 rounded-lg px-4 py-3 text-center font-medium text-green-800 shadow-md hover:bg-green-200 transition-colors">
                                ${value}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="mt-12 bg-white bg-opacity-95 rounded-2xl p-8 backdrop-blur-md border border-green-500 border-opacity-30 shadow-2xl">
                <div class="flex items-center mb-6">
                    <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-green-800">Our Mission</h3>
                </div>
                <ul class="space-y-4">
                    ${missionVisionData.mission.map(item => `
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-green-900 font-medium">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    </section>
    `;
}
