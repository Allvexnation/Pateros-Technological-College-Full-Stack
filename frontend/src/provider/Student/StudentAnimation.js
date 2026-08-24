export function initStudentAnimation() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        navbar.classList.add('student-animate-fade-in-down', 'student-stagger-1');
    }

    const profileCard = document.querySelector('.lg\\:col-span-1 .glass-effect');
    if (profileCard) {
        profileCard.classList.add('student-animate-fade-in-left', 'student-stagger-2');
    }

    const dashboard = document.querySelector('.lg\\:col-span-2 .glass-effect');
    if (dashboard) {
        dashboard.classList.add('student-animate-fade-in-right', 'student-stagger-3');
    }

    const statCards = document.querySelectorAll('.bg-gradient-to-br');
    statCards.forEach((card, index) => {
        card.classList.add('student-animate-scale-in', `student-stagger-${index + 4}`);
    });

    const quickActionButtons = document.querySelectorAll('.grid.grid-cols-2.md\\:grid-cols-4 button');
    quickActionButtons.forEach((button, index) => {
        button.classList.add('student-animate-slide-in', `student-stagger-${index + 4}`);
    });

    const activityItems = document.querySelectorAll('.space-y-3 > div');
    activityItems.forEach((item, index) => {
        item.classList.add('student-animate-fade-in-up', `student-stagger-${index + 5}`);
    });

    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.add('student-animate-fade-in-up', 'student-stagger-7');
    }
}
