export function NewsModal() {
    return `
    <div id="newsModal" class="fixed inset-0 bg-black bg-opacity-75 hidden items-center justify-center z-50 modal-overlay">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden m-4 modal-content">
            <div class="relative">
                <img id="modalImage" src="" alt="News Image" class="w-full h-64 md:h-96 object-cover">
                <button onclick="closeNewsModal()" class="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors shadow-lg">
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <button onclick="openFullscreenView()" class="absolute top-4 right-16 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors shadow-lg" title="Fullscreen View">
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                    </svg>
                </button>
            </div>
            <div class="p-6">
                <div class="flex items-center mb-4">
                    <span id="modalCategory" class="bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full"></span>
                    <span id="modalDate" class="text-gray-500 text-sm ml-auto"></span>
                </div>
                <h2 id="modalTitle" class="text-2xl font-bold text-green-800 mb-4"></h2>
                <p id="modalDescription" class="text-gray-600 leading-relaxed"></p>
            </div>
        </div>
    </div>

    <div id="fullscreenView" class="fixed inset-0 bg-black hidden items-center justify-center z-[60] fullscreen-overlay">
        <img id="fullscreenImage" src="" alt="Fullscreen Image" class="max-w-full max-h-full object-contain">
        <button onclick="closeFullscreenView()" class="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors shadow-lg">
            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
    `;
}

export function openNewsModal(imageSrc, category, title, description) {
    const modal = document.getElementById('newsModal');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDate = document.getElementById('modalDate');

    modalImage.src = imageSrc;
    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalDate.textContent = 'Today';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

export function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modal.classList.add('closing');
    modalContent.classList.add('closing');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.classList.remove('closing');
        modalContent.classList.remove('closing');
        document.body.style.overflow = 'auto';
    }, 200);
}

export function openFullscreenView() {
    const modalImage = document.getElementById('modalImage');
    const fullscreenView = document.getElementById('fullscreenView');
    const fullscreenImage = document.getElementById('fullscreenImage');
    
    fullscreenImage.src = modalImage.src;
    fullscreenView.classList.remove('hidden');
    fullscreenView.classList.add('flex');
}

export function closeFullscreenView() {
    const fullscreenView = document.getElementById('fullscreenView');
    
    fullscreenView.classList.add('closing');
    
    setTimeout(() => {
        fullscreenView.classList.add('hidden');
        fullscreenView.classList.remove('flex');
        fullscreenView.classList.remove('closing');
    }, 200);
}

export function initNewsModal() {
    window.closeNewsModal = closeNewsModal;
    window.openFullscreenView = openFullscreenView;
    window.closeFullscreenView = closeFullscreenView;
    
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeNewsModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeNewsModal();
            }
        });
    }

    const fullscreenView = document.getElementById('fullscreenView');
    if (fullscreenView) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !fullscreenView.classList.contains('hidden')) {
                closeFullscreenView();
            }
        });
    }
}
