// Students Page Functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeStudents();
    setupFilters();
    setupSearch();
    setupViewToggle();
    setupCardActions();
    setupTopBarButtons();
});

// Initialize Students Page
function initializeStudents() {
    console.log('✅ Students page initialized');
    updateStats();
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseFilter = document.getElementById('courseFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterStudents(filter);
        });
    });
    
    if (courseFilter) {
        courseFilter.addEventListener('change', (e) => {
            filterByCourse(e.target.value);
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            sortStudents(e.target.value);
        });
    }
}

// Filter Students
function filterStudents(filter) {
    const cards = document.querySelectorAll('.student-card');
    const rows = document.querySelectorAll('.student-row');
    
    const elements = [...cards, ...rows];
    
    elements.forEach(element => {
        if (filter === 'all') {
            element.style.display = '';
        } else if (filter === 'active') {
            element.style.display = element.dataset.status === 'active' ? '' : 'none';
        } else if (filter === 'top') {
            element.style.display = element.dataset.performance === 'top' ? '' : 'none';
        } else if (filter === 'struggling') {
            element.style.display = element.dataset.performance === 'struggling' ? '' : 'none';
        }
    });
    
    console.log(`🔍 Filtered by: ${filter}`);
}

// Filter by Course
function filterByCourse(course) {
    console.log(`📚 Filtering by course: ${course}`);
    showNotification(`Showing students from ${course === 'all' ? 'all courses' : course}`, 'info');
}

// Sort Students
function sortStudents(sortBy) {
    console.log(`🔄 Sorting by: ${sortBy}`);
    showNotification(`Sorted by ${sortBy}`, 'info');
    
    // In production, re-order the cards/rows based on sort criteria
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            searchStudents(query);
        });
    }
}

// Search Students
function searchStudents(query) {
    const cards = document.querySelectorAll('.student-card');
    const rows = document.querySelectorAll('.student-row');
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const id = card.querySelector('.student-id').textContent.toLowerCase();
        
        if (name.includes(query) || id.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    rows.forEach(row => {
        const name = row.querySelector('.student-cell span').textContent.toLowerCase();
        const id = row.querySelectorAll('td')[1].textContent.toLowerCase();
        
        if (name.includes(query) || id.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Setup View Toggle
function setupViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const gridView = document.getElementById('studentsGrid');
    const listView = document.getElementById('studentsList');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            
            if (view === 'grid') {
                gridView.style.display = 'grid';
                listView.style.display = 'none';
            } else {
                gridView.style.display = 'none';
                listView.style.display = 'block';
            }
            
            console.log(`👁️ Switched to ${view} view`);
        });
    });
}

// Setup Card Actions
function setupCardActions() {
    document.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.btn-icon');
        if (!actionBtn) return;
        
        const action = actionBtn.dataset.action;
        const card = actionBtn.closest('.student-card') || actionBtn.closest('.student-row');
        
        let studentName;
        if (card.classList.contains('student-card')) {
            studentName = card.querySelector('h3').textContent;
        } else {
            studentName = card.querySelector('.student-cell span').textContent;
        }
        
        switch(action) {
            case 'view':
                viewStudentProfile(studentName);
                break;
            case 'message':
                sendMessage(studentName);
                break;
            case 'submissions':
                viewSubmissions(studentName);
                break;
            case 'more':
                showMoreOptions(studentName);
                break;
        }
    });
}

// View Student Profile
function viewStudentProfile(studentName) {
    console.log(`👤 Viewing profile for: ${studentName}`);
    showNotification(`Opening profile for ${studentName}`, 'info');
    
    // In production, navigate to student profile page
    // window.location.href = `student-profile.html?name=${encodeURIComponent(studentName)}`;
}

// Send Message
function sendMessage(studentName) {
    console.log(`💬 Sending message to: ${studentName}`);
    showNotification(`Opening message composer for ${studentName}`, 'info');
    
    // In production, open message modal or navigate to messages
}

// View Submissions
function viewSubmissions(studentName) {
    console.log(`📂 Viewing submissions for: ${studentName}`);
    showNotification(`Loading submissions for ${studentName}`, 'info');
    
    // Navigate to submissions page with student filter
    setTimeout(() => {
        window.location.href = `submissions.html?student=${encodeURIComponent(studentName)}`;
    }, 500);
}

// Show More Options
function showMoreOptions(studentName) {
    console.log(`⚙️ More options for: ${studentName}`);
    showNotification(`More options for ${studentName}`, 'info');
    
    // In production, show dropdown menu with more actions
}

// Setup Top Bar Buttons
function setupTopBarButtons() {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const exportBtn = document.getElementById('exportBtn');
    const notificationBtn = document.querySelector('.notification-btn');
    const profileMenu = document.querySelector('.profile-menu');
    
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', () => {
            addStudent();
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportData();
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
}

// Add Student
function addStudent() {
    console.log('➕ Adding new student');
    showNotification('Opening student registration form', 'info');
    
    // In production, open modal with student registration form
}

// Export Data
function exportData() {
    console.log('📊 Exporting student data');
    showNotification('Preparing export... This may take a moment', 'info');
    
    setTimeout(() => {
        showNotification('Student data exported successfully!', 'success');
    }, 2000);
}

// Update Stats
function updateStats() {
    const totalStudents = document.querySelectorAll('.student-card').length;
    const activeStudents = document.querySelectorAll('.student-card[data-status="active"]').length;
    
    console.log(`📊 Stats - Total: ${totalStudents}, Active: ${activeStudents}`);
}

// Show Notification (Toast System)
function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    // Create toast notification
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

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeStudents,
        filterStudents,
        searchStudents,
        viewStudentProfile,
        sendMessage,
        viewSubmissions
    };
}
