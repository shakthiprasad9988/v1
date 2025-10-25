// Faculty Dashboard Functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupMenuToggle();
    setupNotifications();
    loadDashboardData();
});

// Initialize Dashboard
function initializeDashboard() {
    console.log('✅ Faculty Dashboard initialized');
    updateStats();
    loadRecentActivity();
}

// Menu Toggle for Mobile
function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// Setup Notifications
function setupNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            showNotifications();
        });
    }
}

// Show Notifications
function showNotifications() {
    const notifications = [
        { type: 'submission', message: 'New submission from John Doe', time: '2 hours ago' },
        { type: 'deadline', message: 'Assignment deadline approaching', time: '5 hours ago' },
        { type: 'message', message: 'New message from Jane Smith', time: '1 day ago' }
    ];

    console.log('📬 Notifications:', notifications);
    // In production, show a notification panel
}

// Update Stats
function updateStats() {
    const stats = {
        activeAssignments: 8,
        pendingReviews: 24,
        gradedThisWeek: 156,
        totalStudents: 120
    };

    console.log('📊 Dashboard Stats:', stats);
}

// Load Dashboard Data
function loadDashboardData() {
    // Simulate loading data
    setTimeout(() => {
        console.log('✅ Dashboard data loaded');
    }, 500);
}

// Load Recent Activity
function loadRecentActivity() {
    const activities = [
        { type: 'grade', user: 'Sarah Williams', action: 'Graded Assignment 2', time: '10 minutes ago' },
        { type: 'submission', user: 'Tom Brown', action: 'New submission', time: '1 hour ago' },
        { type: 'assignment', action: 'Created new assignment: Midterm Project', time: '3 hours ago' }
    ];

    console.log('📋 Recent Activity:', activities);
}

// Review Button Handlers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-review')) {
        const submissionItem = e.target.closest('.submission-item');
        const studentName = submissionItem.querySelector('h4').textContent;
        const assignmentName = submissionItem.querySelector('p').textContent;
        
        console.log(`🔍 Reviewing submission: ${assignmentName} by ${studentName}`);
        window.location.href = `grading.html?student=${encodeURIComponent(studentName)}`;
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeDashboard,
        updateStats,
        loadDashboardData
    };
}
