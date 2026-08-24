export function getDialogModalHTML() {
    return `
    <div class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" id="confirmDialogModal">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800" id="confirmDialogTitle">Confirm Action</h2>
                <button onclick="closeConfirmDialog()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="mb-4">
                <p class="text-gray-700" id="confirmDialogMessage">Are you sure you want to proceed?</p>
            </div>
            <div class="button-group flex gap-3">
                <button onclick="closeConfirmDialog()"
                    class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    No
                </button>
                <button onclick="executeConfirmAction()"
                    class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Yes
                </button>
            </div>
        </div>
    </div>
    `;
}

let confirmCallback = null;

export function initDialogModal() {
}

export function showConfirmDialog(title, message, onConfirm) {
    const modal = document.getElementById('confirmDialogModal');
    const titleEl = document.getElementById('confirmDialogTitle');
    const messageEl = document.getElementById('confirmDialogMessage');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    confirmCallback = onConfirm;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

export function closeConfirmDialog() {
    const modal = document.getElementById('confirmDialogModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    confirmCallback = null;
}

export function executeConfirmAction() {
    if (confirmCallback) {
        confirmCallback();
    }
    closeConfirmDialog();
}

window.showConfirmDialog = showConfirmDialog;
window.closeConfirmDialog = closeConfirmDialog;
window.executeConfirmAction = executeConfirmAction;
