// Topbar Functionality - Profile Menu & Notifications
// This file should be included in all faculty portal pages

// Profile Menu Toggle
function initProfileMenu() {
    const profileMenu = document.querySelector('.profile-menu');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileMenu && !profileDropdown) {
        // Create dropdown if it doesn't exist
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <div class="profile-dropdown-header">
                <img src="https://ui-avatars.com/api/?name=Faculty+User&background=764ba2&color=fff&size=50" alt="Profile">
                <div class="profile-info">
                    <h4>Dr. Faculty User</h4>
                    <p>faculty@university.edu</p>
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
            <a href="analytics.html" class="profile-dropdown-item">
                <i class='bx bx-bar-chart-alt-2'></i>
                <span>My Analytics</span>
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
            
            // Close notification panel if open
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
        // Create notification panel if it doesn't exist
        const panel = document.createElement('div');
        panel.className = 'notification-panel';
        panel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="mark-all-read">Mark all as read</button>
            </div>
            <div class="notification-list">
                <div class="notification-item unread">
                    <div class="notification-icon submission">
                        <i class='bx bx-file'></i>
                    </div>
                    <div class="notification-content">
                        <h4>New Submission</h4>
                        <p>John Doe submitted Assignment 3</p>
                        <span class="notification-time">5 minutes ago</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-icon message">
                        <i class='bx bx-message-dots'></i>
                    </div>
                    <div class="notification-content">
                        <h4>New Message</h4>
                        <p>Sarah Smith sent you a message</p>
                        <span class="notification-time">1 hour ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon deadline">
                        <i class='bx bx-time'></i>
                    </div>
                    <div class="notification-content">
                        <h4>Deadline Reminder</h4>
                        <p>Assignment 2 deadline is tomorrow</p>
                        <span class="notification-time">3 hours ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon grading">
                        <i class='bx bx-edit'></i>
                    </div>
                    <div class="notification-content">
                        <h4>Grading Complete</h4>
                        <p>You completed grading for Assignment 1</p>
                        <span class="notification-time">Yesterday</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon system">
                        <i class='bx bx-info-circle'></i>
                    </div>
                    <div class="notification-content">
                        <h4>System Update</h4>
                        <p>New features available in the portal</p>
                        <span class="notification-time">2 days ago</span>
                    </div>
                </div>
            </div>
            <div class="notification-footer">
                <a href="messages.html">View All Notifications</a>
            </div>
        `;
        notificationBtn.parentElement.appendChild(panel);
    }
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationBtn.classList.toggle('active');
            
            // Close profile menu if open
            const profileMenu = document.querySelector('.profile-menu');
            if (profileMenu) {
                profileMenu.classList.remove('active');
            }
        });
    }
    
    // Mark all as read functionality
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
    
    // Individual notification click
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.remove('unread');
            updateNotificationBadge();
        });
    });
}

// Update notification badge count
function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-btn .badge');
    
    if (badge) {
        badge.textContent = unreadCount;
        if (unreadCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
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

// Toast notification (if not already defined)
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

// Initialize all topbar functionality
document.addEventListener('DOMContentLoaded', () => {
    initProfileMenu();
    initNotificationPanel();
    initClickOutside();
    updateNotificationBadge();
});
