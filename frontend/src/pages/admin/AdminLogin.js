import { adminLogin } from '../../api/admin/AdminAuth/AdminAuth.js';
import { initStepForm } from '../../utils/steps.js';
import { saveAdminToken, saveAdminData } from '../../api/auth/token.js';

export function AdminLoginPage() {
    return `
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div class="text-center mb-8">
                <img src="public/logo-ptc.png" alt="PTC Logo" class="h-24 w-auto mx-auto mb-4">
                <h1 class="text-2xl font-bold text-green-800">Pateros Technological College</h1>
                <p class="text-gray-600 mt-2">Admin Portal Login</p>
            </div>

            <form id="adminLoginForm">
                <div data-step="1">
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" id="email" name="email" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            placeholder="Enter your email">
                    </div>
                    <div class="flex gap-3">
                        <button type="button" data-action="next"
                            class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                            Next
                        </button>
                    </div>
                </div>

                <div data-step="2" class="hidden">
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div class="relative">
                            <input type="password" id="password" name="password"
                                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="Enter your password">
                            <button type="button" id="togglePassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <i data-lucide="eye" id="eyeIcon" class="w-5 h-5"></i>
                                <i data-lucide="eye-off" id="eyeOffIcon" class="w-5 h-5 hidden"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <button type="button" data-action="prev"
                            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                            Back
                        </button>
                        <button type="submit" data-action="submit" id="loginButton"
                            class="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                            Login
                        </button>
                    </div>
                </div>
                <div class="error hidden mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm" id="errorMessage"></div>
                <div class="success hidden mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm" id="successMessage"></div>
            </form>

            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                <p class="text-xs text-gray-500">205 College Street, Sto. Rosario-Kanluran, Pateros, Metro Manila</p>
            </div>
        </div>
    </div>
    `;
}

export function initAdminLoginPage() {
    document.body.classList.remove('admin-page', 'student-page');
    
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    initStepForm(
        'adminLoginForm',
        2,
        (proceed) => {
            const email = document.getElementById('email').value;
            if (!email || !email.includes('@')) {
                errorDiv.textContent = 'Please enter a valid email address';
                errorDiv.classList.remove('hidden');
                return;
            }
            errorDiv.classList.add('hidden');
            proceed();
        },
        () => {
            errorDiv.classList.add('hidden');
        }
    );
    
    document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginButton = document.getElementById('loginButton');
        
        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');
        
        loginButton.disabled = true;
        loginButton.textContent = 'Logging in...';
        
        const result = await adminLogin(email, password);
        
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
        
        if (result.success) {
            saveAdminToken(result.token);
            saveAdminData(result.admin);
            successDiv.textContent = 'Login successful! Redirecting...';
            successDiv.classList.remove('hidden');
            setTimeout(() => {
                window.location.hash = '#admindashboard';
            }, 1000);
        } else {
            errorDiv.textContent = result.message;
            errorDiv.classList.remove('hidden');
        }
    });
    
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeOffIcon = document.getElementById('eyeOffIcon');
    
    lucide.createIcons();
    
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        }
    });
}
