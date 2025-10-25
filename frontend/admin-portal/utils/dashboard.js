// Admin Dashboard JavaScript

// View User
function viewUser(userId) {
    showToast(`Viewing user: ${userId}`, 'info');
    setTimeout(() => {
        window.location.href = `users.html?id=${userId}`;
    }, 500);
}

// Create User
function createUser() {
    showToast('Opening create user form...', 'info');
    setTimeout(() => {
        window.location.href = 'users.html?action=create';
    }, 500);
}

// Create Course
function createCourse() {
    showToast('Opening create course form...', 'info');
    setTimeout(() => {
        window.location.href = 'courses.html?action=create';
    }, 500);
}

// Generate Report
function generateReport() {
    showToast('Generating system report...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showToast('Report generated successfully!', 'success');
        
        // Simulate download
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'system-report.pdf';
        link.click();
    }, 2000);
}

// Backup System
function backupSystem() {
    if (confirm('Start system backup? This may take a few minutes.')) {
        showToast('Backup started...', 'info');
        
        // Simulate backup process
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress <= 100) {
                console.log(`Backup progress: ${progress}%`);
            } else {
                clearInterval(interval);
                showToast('Backup completed successfully!', 'success');
            }
        }, 300);
    }
}

// Update stats in real-time (simulated)
function updateStats() {
    // This would connect to real-time API in production
    console.log('Stats updated at:', new Date().toLocaleTimeString());
}

// Refresh Dashboard
function refreshDashboard() {
    showToast('Refreshing dashboard...', 'info');
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// View System Status Details
function viewSystemStatus() {
    showToast('Opening system status details...', 'info');
    setTimeout(() => {
        window.location.href = 'system.html';
    }, 500);
}

// Quick Actions
function quickAction(action) {
    const actions = {
        'create-user': () => createUser(),
        'create-course': () => createCourse(),
        'generate-report': () => generateReport(),
        'backup-system': () => backupSystem()
    };
    
    if (actions[action]) {
        actions[action]();
    } else {
        showToast(`Action: ${action}`, 'info');
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Update stats every 30 seconds
    setInterval(updateStats, 30000);
    
    // Add search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                if (query) {
                    showToast(`Searching for: ${query}`, 'info');
                    // In production, this would search across all entities
                }
            }
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Ctrl/Cmd + R for refresh
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            refreshDashboard();
        }
    });
    
    // Initialize tooltips (if needed)
    initTooltips();
    
    // Check for notifications
    checkNotifications();
    
    // Log dashboard load
    console.log('Admin Dashboard loaded successfully');
});

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = e.target.getAttribute('data-tooltip');
            if (tooltip) {
                // Show tooltip (implementation depends on tooltip library)
                console.log('Tooltip:', tooltip);
            }
        });
    });
}

// Check for new notifications
function checkNotifications() {
    // In production, this would fetch from API
    const notificationBadge = document.querySelector('.notification-btn .badge');
    if (notificationBadge) {
        // Simulate checking for new notifications
        const count = parseInt(notificationBadge.textContent) || 0;
        console.log(`Current notifications: ${count}`);
    }
}

// Export functions for use in HTML
window.viewUser = viewUser;
window.createUser = createUser;
window.createCourse = createCourse;
window.generateReport = generateReport;
window.backupSystem = backupSystem;
window.refreshDashboard = refreshDashboard;
window.viewSystemStatus = viewSystemStatus;
window.quickAction = quickAction;
