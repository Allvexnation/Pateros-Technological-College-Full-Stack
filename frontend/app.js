import { StudentLoginPage, initStudentLoginPage } from './src/pages/Students/StudentLogin.js';
import { HomePage, initHomePage } from './src/pages/home.js';
import { StudentDashboardPage, initStudentDashboardPage } from './src/pages/Students/StudentDashboard.js';
import { AdminLoginPage, initAdminLoginPage } from './src/pages/admin/AdminLogin.js';
import { AdminDashboardPage, initAdminDashboardPage } from './src/pages/admin/AdminDashboard.js';
import { ManageAdminsPage, initManageAdminsPage } from './src/pages/admin/ManageAdmins.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'index.css';
document.head.appendChild(link);

export class App {
    constructor(root) {
        this.root = root;
        this.routes = {
            '': HomePage,
            '#login': StudentLoginPage,
            '#home': HomePage,
            '#studentdashboard': StudentDashboardPage,
            '#adminlogin': AdminLoginPage,
            '#admindashboard': AdminDashboardPage,
            '#manageadmins': ManageAdminsPage
        };
        this.initFunctions = {
            '': initHomePage,
            '#login': initStudentLoginPage,
            '#home': initHomePage,
            '#studentdashboard': initStudentDashboardPage,
            '#adminlogin': initAdminLoginPage,
            '#admindashboard': initAdminDashboardPage,
            '#manageadmins': initManageAdminsPage
        };
        
        window.addEventListener('hashchange', () => this.render());
    }

    getCurrentRoute() {
        return window.location.hash || '';
    }

    render() {
        const route = this.getCurrentRoute();
        const pageComponent = this.routes[route] || this.routes[''];
        
        this.root.innerHTML = pageComponent();
        
        const initFunction = this.initFunctions[route] || this.initFunctions[''];
        if (initFunction) {
            initFunction();
        }
    }
}
