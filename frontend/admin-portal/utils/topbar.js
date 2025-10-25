// Admin Topbar Functionality

// Profile Menu Toggle
function initProfileMenu() {
    const profileMenu = document.querySelector('.profile-menu');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileMenu && !profileDropdown) {
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <div class="profile-dropdown-header">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=f5576c&color=fff&size=50" alt="Profile">
                <div class="profile-info">
                    <h4>Admin User</h4>
                    <p>admin@university.edu</p>
                </div>
            </div>
            <div class="profile-dropdown-divider"></div>
            <a href="settings.html" class="profile-dropdown-item">
                <i class='bx bx-user'></i>
                <span>My Profile</span>
            </a>
            <a href="settings.html" class="profile-dropdown-item">
                <i class='bx bx-cog'></i>
                <span>Settings</span>
            </a>
            <div class="profile-dropdown-divider"></div>
            <a href="../../shared/pages/login.html" class="profile-dropdown-item logout">
                <i class='bx bx-log-out'></i>
                <span>Logout</span>
            </a>
        `;
        profileMenu.appendChild(dropdown);
    }
    
    if (profileMenu) {
        profileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('active');
            
            const notificationBtn = document.querySelector('.notification-btn');
            if (notificationBtn) {
                notificationBtn.classList.remove('active');
            }
        });
    }
}

// Notification Panel Toggle
function initNotificationPanel() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');
    
    if (notificationBtn && !notificationPanel) {
        const panel = document.createElement('div');
        panel.className = 'notification-panel';
        panel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="mark-all-read">Mark all as read</button>
            </div>
            <div class="notification-list">
                <div class="notification-item unread">
                    <div class="notification-icon alert">
                        <i class='bx bx-error'></i>
                    </div>
                    <div class="notification-content">
                        <h4>System Alert</h4>
                        <p>High server load detected</p>
                        <span class="notification-time">5 minutes ago</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-icon info">
                        <i class='bx bx-user-plus'></i>
                    </div>
                    <div class="notification-content">
                        <h4>New User Registration</h4>
                        <p>John Doe registered as faculty</p>
                        <span class="notification-time">1 hour ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon success">
                        <i class='bx bx-check-circle'></i>
                    </div>
                    <div class="notification-content">
                        <h4>Backup Complete</h4>
                        <p>Database backup completed successfully</p>
                        <span class="notification-time">3 hours ago</span>
                    </div>
                </div>
            </div>
            <div class="notification-footer">
                <a href="notifications.html">View All Notifications</a>
            </div>
        `;
        notificationBtn.parentElement.appendChild(panel);
    }
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationBtn.classList.toggle('active');
            
            const profileMenu = document.querySelector('.profile-menu');
            if (profileMenu) {
                profileMenu.classList.remove('active');
            }
        });
    }
    
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => item.classList.remove('unread'));
            
            const badge = document.querySelector('.notification-btn .badge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
            
            showToast('All notifications marked as read', 'success');
        });
    }
}

// Close dropdowns when clicking outside
function initClickOutside() {
    document.addEventListener('click', (e) => {
        const profileMenu = document.querySelector('.profile-menu');
        const notificationBtn = document.querySelector('.notification-btn');
        
        if (profileMenu && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove('active');
        }
        
        if (notificationBtn && !notificationBtn.contains(e.target)) {
            notificationBtn.classList.remove('active');
        }
    });
}

// Menu Toggle for Mobile
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// Toast notification
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'bx bx-check-circle',
        error: 'bx bx-error-circle',
        warning: 'bx bx-error',
        info: 'bx bx-info-circle'
    };
    
    toast.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
    initProfileMenu();
    initNotificationPanel();
    initClickOutside();
    initMenuToggle();
});
