import { programsOfferedData } from '../static/ProgramsOffer.js';

export function ProgramsOffered() {
    return `
    <section class="py-20 relative overflow-x-hidden">
        <div class="absolute inset-0 z-0 overflow-hidden">
            <img src="public/ptc-background.png" alt="PTC Background" class="w-full h-full object-cover">
            <img src="public/programs/bg-sec4.png" alt="Programs Background" class="absolute inset-0 w-full h-full object-cover bg-slide-left">
            <div class="absolute inset-0 bg-white bg-opacity-30"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
            <h2 class="text-4xl font-bold text-green-800 text-center mb-4">Programs Offered</h2>
            <p class="text-gray-900 text-center mb-12 max-w-2xl mx-auto font-medium">Choose from our range of degree and certificate programs designed to prepare you for success</p>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-xl">
                    <div class="flex items-center mb-6">
                        <img src="public/programs/IICT.png" alt="IICT Logo" class="w-16 h-16 object-contain mr-4">
                        <div>
                            <h3 class="text-2xl font-bold text-green-800">Four-Year Programs</h3>
                            <p class="text-green-600 text-sm">Bachelor's Degree</p>
                        </div>
                    </div>
                    <ul class="space-y-4">
                        ${programsOfferedData.four_year_programs.map(program => `
                            <li class="flex items-start bg-white rounded-lg p-4 shadow-sm">
                                <img src="${program.image}" alt="${program.name}" class="w-16 h-16 object-cover rounded-lg mr-4 flex-shrink-0">
                                <span class="text-gray-800 font-medium self-center">${program.name}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-xl">
                    <div class="flex items-center mb-6">
                        <img src="public/programs/IBOA.png" alt="IBOA Logo" class="w-16 h-16 object-contain mr-4">
                        <div>
                            <h3 class="text-2xl font-bold text-green-800">Two-Year Programs</h3>
                            <p class="text-green-600 text-sm">Certificate Courses</p>
                        </div>
                    </div>
                    <ul class="space-y-4">
                        ${programsOfferedData.two_year_programs.map(program => `
                            <li class="flex items-start bg-white rounded-lg p-4 shadow-sm">
                                <img src="${program.image}" alt="${program.name}" class="w-16 h-16 object-cover rounded-lg mr-4 flex-shrink-0">
                                <span class="text-gray-800 font-medium self-center">${program.name}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div class="mt-12 text-center">
                <a href="#signup" class="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                    Apply Now
                </a>
            </div>
        </div>
    </section>
    `;
}
