import { footerData } from '../static/Footer.js';

export function Footer() {
    return `
    <section class="relative bg-cover bg-center bg-no-repeat py-4" style="background-image: url('public/ptc-background.png');">
        <div class="absolute inset-0 bg-green-900/90"></div>
        <footer class="relative z-10 text-white">
            <div class="container mx-auto px-4 py-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center mb-4">
                            <img src="${footerData.college.logo}" alt="PTC Logo" class="h-12 w-auto mr-3">
                            <span class="font-bold text-lg">${footerData.college.name}</span>
                        </div>
                        <p class="text-green-200 text-sm mb-4">${footerData.college.address}</p>
                        <div>
                            <h4 class="font-semibold mb-3">${footerData.contact.title}</h4>
                            <p class="text-green-200 text-sm">${footerData.contact.email}</p>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">Our Partners</h4>
                        <div class="grid grid-cols-2 gap-4">
                            ${footerData.partners.map(partner => `
                                <a href="${partner.link}" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center hover:opacity-80 transition-opacity">
                                    <img src="${partner.logo}" alt="${partner.name}" class="h-12 w-auto mb-2">
                                    <span class="text-xs text-green-200 text-center">${partner.name}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">${footerData.socialMedia.title}</h4>
                        <div class="space-y-3">
                            ${footerData.socialMedia.links.map(social => `
                                <a href="${social.link}" target="_blank" rel="noopener noreferrer" class="flex items-center hover:text-green-200 transition-colors">
                                    <img src="${social.logo}" alt="${social.name}" class="h-8 w-auto mr-3">
                                    <span class="text-sm">${social.name}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">Legal</h4>
                        <ul class="space-y-2 text-green-200 text-sm">
                            ${footerData.legalLinks.map(link => `
                                <li><a href="${link.link}" class="hover:text-white transition-colors">${link.name}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <div class="border-t border-green-700 mt-8 pt-8 text-center text-green-200 text-sm">
                    <p>${footerData.copyright.text}</p>
                </div>
            </div>
        </footer>
    </section>
    `;
}
