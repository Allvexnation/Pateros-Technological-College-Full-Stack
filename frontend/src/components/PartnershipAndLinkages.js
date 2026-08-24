import { partnershipLinkagesData } from '../static/PartnershipAndLinkages.js';

export function PartnershipAndLinkages() {
    return `
    <section class="py-20 bg-gradient-to-br from-green-700 to-green-800">
        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-white mb-4">${partnershipLinkagesData.title}</h2>
                    <div class="w-24 h-1 bg-white mx-auto mb-6"></div>
                    <p class="text-green-100 text-lg max-w-3xl mx-auto">
                        ${partnershipLinkagesData.description}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${partnershipLinkagesData.partnerships.map(partnership => `
                        <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div class="p-6">
                                <img src="${partnership.image}" alt="${partnership.name}" class="w-full h-32 object-contain mb-4">
                                <h3 class="text-lg font-semibold text-green-800 mb-4 text-center">${partnership.name}</h3>
                                <a href="${partnership.link}" target="_blank" rel="noopener noreferrer" class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors">
                                    Read More
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>
    `;
}
