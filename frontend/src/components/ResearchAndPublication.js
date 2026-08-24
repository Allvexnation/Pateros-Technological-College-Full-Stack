import { researchPublicationData } from '../static/ResearchAndPublication.js';

export function ResearchAndPublication() {
    return `
    <section class="py-20 bg-green-700">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-white mb-4">${researchPublicationData.title}</h2>
                    <div class="w-24 h-1 bg-white mx-auto mb-6"></div>
                </div>

                <div class="text-center mb-10">
                    <h3 class="text-3xl font-bold text-white mb-2">${researchPublicationData.journal.name}</h3>
                    <p class="text-green-100 italic">${researchPublicationData.journal.subtitle}</p>
                </div>

                <div class="space-y-6">
                    ${researchPublicationData.content.map(paragraph => `
                        <p class="text-white leading-relaxed text-lg text-justify">
                            ${paragraph}
                        </p>
                    `).join('')}
                </div>

                <div class="mt-12">
                    <h3 class="text-2xl font-bold text-white text-center mb-8">Publication Volumes</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform" onclick="openPublicationModal('public/publications/VOL1.jpg', 'Volume 1', 'The Mallard - Volume 1', '')">
                            <img src="public/publications/VOL1.jpg" alt="Volume 1" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h4 class="text-lg font-semibold text-green-800">Volume 1</h4>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform" onclick="openPublicationModal('public/publications/VOL2.jpg', 'Volume 2', 'The Mallard - Volume 2', '')">
                            <img src="public/publications/VOL2.jpg" alt="Volume 2" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h4 class="text-lg font-semibold text-green-800">Volume 2</h4>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform" onclick="openPublicationModal('public/publications/VOLUME3.png', 'Volume 3', 'The Mallard - Volume 3', '')">
                            <img src="public/publications/VOLUME3.png" alt="Volume 3" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h4 class="text-lg font-semibold text-green-800">Volume 3</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}
