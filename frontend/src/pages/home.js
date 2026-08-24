import { initHomeAnimations } from '../provider/HomeAnimation.js';
import { Navbar } from '../components/Navbar.js';
import { HeroSection } from '../components/HeroSection.js';
import { NewsSection } from '../components/NewsSection.js';
import { MissionVision } from '../components/MissionVision.js';
import { ProgramsOffered } from '../components/ProgramsOffered.js';
import { ResearchAndPublication } from '../components/ResearchAndPublication.js';
import { PartnershipAndLinkages } from '../components/PartnershipAndLinkages.js';
import { Footer } from '../components/Footer.js';
import { NewsModal, initNewsModal, openNewsModal } from '../components/modals/NewsModal.js';
import { PublicationModal, initPublicationModal, openPublicationModal } from '../components/modals/PublicationModal.js';

export function HomePage() {
    return `
    ${Navbar()}
    ${HeroSection()}
    ${NewsSection()}
    ${MissionVision()}
    ${ProgramsOffered()}
    ${ResearchAndPublication()}
    ${PartnershipAndLinkages()}
    ${Footer()}
    ${NewsModal()}
    ${PublicationModal()}
    `;
}

export function initHomePage() {
    initHomeAnimations();
    initNewsModal();
    initPublicationModal();
    window.openNewsModal = openNewsModal;
    window.openPublicationModal = openPublicationModal;
    
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const tabStrip = document.getElementById('tab-strip');
    if (hamburgerMenu && tabStrip && hamburgerIcon && closeIcon) {
        hamburgerMenu.addEventListener('click', function() {
            if (tabStrip.style.maxHeight === '0px') {
                tabStrip.style.maxHeight = tabStrip.scrollHeight + 'px';
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                tabStrip.style.maxHeight = '0px';
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    }

    const scrollLeft = document.getElementById('scroll-left');
    const scrollRight = document.getElementById('scroll-right');
    const tabsContainer = document.getElementById('tabs-container');
    if (scrollLeft && scrollRight && tabsContainer) {
        scrollLeft.addEventListener('click', function() {
            tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });
        scrollRight.addEventListener('click', function() {
            tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
}
