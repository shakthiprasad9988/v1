// Analytics Page Functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeAnalytics();
    setupCharts();
    setupFilters();
    setupTopBarButtons();
});

// Initialize Analytics
function initializeAnalytics() {
    console.log('✅ Analytics page initialized');
    setupCourseSelect();
    setupPerformanceItems();
}

// Setup Charts
function setupCharts() {
    // Submission Trends Chart
    const submissionCtx = document.getElementById('submissionChart');
    if (submissionCtx) {
        new Chart(submissionCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Submissions',
                    data: [32, 45, 38, 41],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Grade Distribution Chart
    const gradeCtx = document.getElementById('gradeChart');
    if (gradeCtx) {
        new Chart(gradeCtx, {
            type: 'doughnut',
            data: {
                labels: ['A (90-100%)', 'B (80-89%)', 'C (70-79%)', 'D/F (<70%)'],
                datasets: [{
                    data: [24, 45, 32, 11],
                    backgroundColor: [
                        '#56ab2f',
                        '#667eea',
                        '#f2994a',
                        '#ff4757'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Setup Filters
function setupFilters() {
    const timeFilter = document.getElementById('timeFilter');
    const chartBtns = document.querySelectorAll('.chart-btn');
    
    if (timeFilter) {
        timeFilter.addEventListener('change', (e) => {
            updateTimeRange(e.target.value);
        });
    }
    
    chartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const period = btn.dataset.period;
            updateChartPeriod(period);
        });
    });
}

// Update Time Range
function updateTimeRange(range) {
    console.log(`📅 Time range changed to: ${range}`);
    showNotification(`Showing data for: ${range}`, 'info');
}

// Update Chart Period
function updateChartPeriod(period) {
    console.log(`📊 Chart period changed to: ${period}`);
    // In production, update chart data based on period
}

// Setup Top Bar Buttons
function setupTopBarButtons() {
    const exportBtn = document.getElementById('exportReportBtn');
    const notificationBtn = document.querySelector('.notification-btn');
    const profileMenu = document.querySelector('.profile-menu');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportReport();
        });
    }
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            console.log('🔔 Opening notifications');
            showNotification('You have 5 new notifications', 'info');
        });
    }
    
    if (profileMenu) {
        profileMenu.addEventListener('click', () => {
            console.log('👤 Opening profile menu');
        });
    }
    
    // Setup all btn-icon buttons
    setupIconButtons();
}

// Setup Icon Buttons
function setupIconButtons() {
    document.addEventListener('click', (e) => {
        const iconBtn = e.target.closest('.btn-icon');
        if (!iconBtn) return;
        
        const title = iconBtn.getAttribute('title');
        
        if (title === 'More options') {
            showMoreOptions();
        } else if (title === 'View all') {
            viewAllActivity();
        }
    });
}

// Show More Options
function showMoreOptions() {
    console.log('⚙️ Showing more options');
    showNotification('More options menu', 'info');
}

// View All Activity
function viewAllActivity() {
    console.log('📋 Viewing all activity');
    showNotification('Loading all activity...', 'info');
}

// Export Report
function exportReport() {
    console.log('📊 Exporting analytics report');
    showNotification('Preparing report... This may take a moment', 'info');
    
    setTimeout(() => {
        showNotification('Analytics report exported successfully!', 'success');
    }, 2000);
}

// Show Notification
function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class='bx ${getToastIcon(type)}'></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Get Toast Icon
function getToastIcon(type) {
    const icons = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        warning: 'bx-error',
        info: 'bx-info-circle'
    };
    return icons[type] || icons.info;
}

// Setup Course Select
function setupCourseSelect() {
    const courseSelects = document.querySelectorAll('.course-select');
    
    courseSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const course = e.target.value;
            console.log(`📚 Course filter changed to: ${course}`);
            showNotification(`Showing data for: ${course}`, 'info');
        });
    });
}

// Setup Performance Items
function setupPerformanceItems() {
    const performanceItems = document.querySelectorAll('.performance-item');
    
    performanceItems.forEach(item => {
        item.addEventListener('click', () => {
            const studentName = item.querySelector('h4').textContent;
            console.log(`👤 Viewing details for: ${studentName}`);
            showNotification(`Opening profile for ${studentName}`, 'info');
            
            setTimeout(() => {
                window.location.href = `students.html?student=${encodeURIComponent(studentName)}`;
            }, 500);
        });
        
        // Add cursor pointer
        item.style.cursor = 'pointer';
    });
}

// Setup Completion Items
function setupCompletionItems() {
    const completionItems = document.querySelectorAll('.completion-item');
    
    completionItems.forEach(item => {
        item.addEventListener('click', () => {
            const assignmentName = item.querySelector('h4').textContent;
            console.log(`📋 Viewing assignment: ${assignmentName}`);
            showNotification(`Loading ${assignmentName} details`, 'info');
            
            setTimeout(() => {
                window.location.href = `assignments.html?assignment=${encodeURIComponent(assignmentName)}`;
            }, 500);
        });
        
        item.style.cursor = 'pointer';
    });
}

// Setup Timeline Items
function setupTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const activity = item.querySelector('h4').textContent;
            console.log(`📌 Activity clicked: ${activity}`);
            showNotification(`Viewing activity details`, 'info');
        });
        
        item.style.cursor = 'pointer';
    });
}

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Initialize additional handlers
document.addEventListener('DOMContentLoaded', () => {
    setupCompletionItems();
    setupTimelineItems();
});
