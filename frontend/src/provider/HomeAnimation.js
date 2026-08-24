export function initHomeAnimations() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        navbar.classList.add('home-animate-fade-in-down', 'home-stagger-1');
    }

    const heroSection = document.querySelector('section.min-h-screen');
    if (heroSection) {
        const heroContent = heroSection.querySelector('.max-w-4xl');
        if (heroContent) {
            heroContent.classList.add('home-animate-fade-in-up', 'home-stagger-2');
        }
    }

    const heroButtons = document.querySelectorAll('.flex.flex-col.sm\\:flex-row a');
    heroButtons.forEach((button, index) => {
        button.classList.add('home-animate-slide-in', `home-stagger-${index + 3}`);
    });

    const researchPublicationSection = document.querySelector('section.py-20.bg-green-700');
    if (researchPublicationSection && !isBelowViewport(researchPublicationSection)) {
        const publicationCards = researchPublicationSection.querySelectorAll('.grid .bg-white');
        publicationCards.forEach((card, index) => {
            card.style.setProperty('opacity', '0', 'important');
            card.style.setProperty('transform', 'scale(0.9)', 'important');
            card.style.setProperty('transition', 'opacity 0.6s ease-out, transform 0.6s ease-out', 'important');
            setTimeout(() => {
                card.style.setProperty('opacity', '1', 'important');
                card.style.setProperty('transform', 'scale(1)', 'important');
            }, 300 + (index * 100));
        });
    }

    const partnershipSection = document.querySelector('section.py-20.bg-gradient-to-br.from-green-700');
    if (partnershipSection && !isBelowViewport(partnershipSection)) {
        const partnershipCards = partnershipSection.querySelectorAll('.grid .bg-white');
        partnershipCards.forEach((card, index) => {
            card.style.setProperty('opacity', '0', 'important');
            card.style.setProperty('transform', 'scale(0.9)', 'important');
            card.style.setProperty('transition', 'opacity 0.6s ease-out, transform 0.6s ease-out', 'important');
            setTimeout(() => {
                card.style.setProperty('opacity', '1', 'important');
                card.style.setProperty('transform', 'scale(1)', 'important');
            }, 300 + (index * 100));
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.scrollDelay) || 0;
                setTimeout(() => {
                    entry.target.style.setProperty('opacity', '1', 'important');
                    entry.target.style.setProperty('transform', 'scale(1) translateY(0)', 'important');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function isBelowViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top > windowHeight;
    }

    function applyScrollAnimation(element, animationType = '', delay = 0) {
        if (!element) return;
        
        if (!isBelowViewport(element)) {
            return;
        }
        
        element.style.setProperty('opacity', '0', 'important');
        const transform = animationType === 'scale' ? 'scale(0.9)' : 'translateY(30px)';
        element.style.setProperty('transform', transform, 'important');
        element.style.setProperty('transition', 'opacity 0.6s ease-out, transform 0.6s ease-out', 'important');
        
        element.dataset.scrollDelay = delay;
        
        observer.observe(element);
    }

    setTimeout(() => {
        const newsSection = document.querySelector('section.bg-gradient-to-b');
        if (newsSection) {
            const newsCards = newsSection.querySelectorAll('.glass-effect');
            newsCards.forEach((card, index) => {
                applyScrollAnimation(card, 'scale', index * 100);
            });
        }

        const missionVisionSection = document.querySelector('section.py-20.relative.text-white');
        if (missionVisionSection) {
            const mvCards = missionVisionSection.querySelectorAll('.bg-opacity-95');
            mvCards.forEach((card, index) => {
                applyScrollAnimation(card, 'scale', index * 100);
            });
        }

        const programsOfferedSection = document.querySelector('section.py-20.relative.overflow-x-hidden');
        if (programsOfferedSection) {
            const programCards = programsOfferedSection.querySelectorAll('.bg-gradient-to-br');
            programCards.forEach((card, index) => {
                applyScrollAnimation(card, 'scale', index * 100);
            });
        }

        const researchPublicationSection = document.querySelector('section.py-20.bg-green-700');
        if (researchPublicationSection) {
            const publicationCards = researchPublicationSection.querySelectorAll('.grid .bg-white');
            publicationCards.forEach((card, index) => {
                applyScrollAnimation(card, 'scale', index * 100);
            });
        }

        const partnershipSection = document.querySelector('section.py-20.bg-gradient-to-br.from-green-700');
        if (partnershipSection) {
            const partnershipCards = partnershipSection.querySelectorAll('.grid .bg-white');
            partnershipCards.forEach((card, index) => {
                applyScrollAnimation(card, 'scale', index * 100);
            });
        }

        const featuresSection = document.querySelector('section.py-20.bg-white');
        if (featuresSection) {
            const featureCards = featuresSection.querySelectorAll('.glass-effect');
            featureCards.forEach((card, index) => {
                applyScrollAnimation(card, 'scale', index * 100);
            });
        }

        const aboutSection = document.querySelector('section.py-20.bg-green-50');
        if (aboutSection) {
            const aboutContent = aboutSection.querySelector('.max-w-4xl');
            if (aboutContent) applyScrollAnimation(aboutContent);
            
            const statCards = document.querySelectorAll('.grid.grid-cols-2.md\\:grid-cols-4 .bg-white');
            statCards.forEach((card, index) => {
                applyScrollAnimation(card, 'scale', index * 100);
            });
        }

        const footer = document.querySelector('footer');
        if (footer) {
            applyScrollAnimation(footer);
        }
    }, 100);
}
