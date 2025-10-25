// Submissions Management

document.addEventListener('DOMContentLoaded', () => {
    initializeSubmissions();
    setupFilters();
    setupSearch();
    setupActions();
    setupExport();
    setupPagination();
    setupBulkActions();
    setupTopBarButtons();
    checkURLParameters();
});

// Initialize Submissions
function initializeSubmissions() {
    console.log('✅ Submissions page initialized');
    loadSubmissions();
    updateSubmissionStats();
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const assignmentFilter = document.getElementById('assignmentFilter');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterSubmissions(filter);
        });
    });
    
    if (assignmentFilter) {
        assignmentFilter.addEventListener('change', (e) => {
            filterByAssignment(e.target.value);
        });
    }
}

// Filter Submissions
function filterSubmissions(filter) {
    const rows = document.querySelectorAll('.submission-row');
    
    rows.forEach(row => {
        if (filter === 'all') {
            row.style.display = 'table-row';
        } else {
            if (row.classList.contains(filter)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        }
    });
    
    console.log(`🔍 Filtered by: ${filter}`);
}

// Filter by Assignment
function filterByAssignment(assignment) {
    console.log(`📚 Filtering by assignment: ${assignment}`);
    // In production, fetch submissions for specific assignment
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            searchSubmissions(query);
        });
    }
}

// Search Submissions
function searchSubmissions(query) {
    const rows = document.querySelectorAll('.submission-row');
    
    rows.forEach(row => {
        const studentName = row.querySelector('.student-name').textContent.toLowerCase();
        const studentId = row.querySelector('.student-id').textContent.toLowerCase();
        
        if (studentName.includes(query) || studentId.includes(query)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

// Setup Actions
function setupActions() {
    document.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.btn-action');
        if (!actionBtn) return;
        
        const row = actionBtn.closest('.submission-row');
        const studentName = row.querySelector('.student-name').textContent;
        const assignmentName = row.querySelector('.assignment-name').textContent;
        const action = actionBtn.dataset.action;
        
        switch(action) {
            case 'grade':
                handleGradeAction(studentName, assignmentName, row);
                break;
            case 'view':
                handleViewAction(studentName, assignmentName);
                break;
            case 'download':
                handleDownloadAction(studentName, assignmentName);
                break;
            case 'reminder':
                handleReminderAction(studentName);
                break;
            case 'penalty':
                handlePenaltyAction(studentName, row);
                break;
            case 'feedback':
                handleFeedbackAction(studentName, assignmentName);
                break;
        }
    });
}

// Handle Grade Action
function handleGradeAction(studentName, assignmentName, row) {
    console.log(`✏️ Grading submission for: ${studentName}`);
    const isGraded = row.classList.contains('graded');
    
    if (isGraded) {
        showNotification(`Opening grade editor for ${studentName}`, 'info');
    } else {
        showNotification(`Starting grading for ${studentName}`, 'info');
    }
    
    setTimeout(() => {
        window.location.href = `grading.html?student=${encodeURIComponent(studentName)}&assignment=${encodeURIComponent(assignmentName)}`;
    }, 500);
}

// Handle View Action
function handleViewAction(studentName, assignmentName) {
    console.log(`👁️ Viewing submission for: ${studentName}`);
    showNotification(`Opening submission viewer for ${studentName}`, 'info');
    viewSubmissionDetails(studentName, assignmentName);
}

// Handle Download Action
function handleDownloadAction(studentName, assignmentName) {
    console.log(`📥 Downloading submission for: ${studentName}`);
    showNotification(`Downloading ${studentName}'s submission...`, 'info');
    
    setTimeout(() => {
        downloadSubmission(studentName);
        showNotification(`Download complete: ${studentName}_${assignmentName}.zip`, 'success');
    }, 1000);
}

// Handle Reminder Action
function handleReminderAction(studentName) {
    console.log(`📧 Sending reminder to: ${studentName}`);
    sendReminder(studentName);
}

// Handle Penalty Action
function handlePenaltyAction(studentName, row) {
    console.log(`⚠️ Applying late penalty for: ${studentName}`);
    
    const confirmed = confirm(`Apply late submission penalty to ${studentName}?\n\nThis will deduct points based on your late policy.`);
    
    if (confirmed) {
        showNotification(`Late penalty applied to ${studentName}`, 'warning');
        // Update UI to show penalty applied
        row.classList.add('penalty-applied');
    }
}

// Handle Feedback Action
function handleFeedbackAction(studentName, assignmentName) {
    console.log(`💬 Viewing feedback for: ${studentName}`);
    showNotification(`Opening feedback for ${studentName}`, 'info');
    
    setTimeout(() => {
        window.location.href = `grading.html?student=${encodeURIComponent(studentName)}&view=feedback`;
    }, 500);
}

// Download Submission
function downloadSubmission(studentName) {
    console.log(`📥 Downloading submission for ${studentName}...`);
    // In production, trigger actual download
    showNotification(`Downloading submission for ${studentName}`, 'info');
}

// Setup Export
function setupExport() {
    const exportBtn = document.getElementById('exportBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportData();
        });
    }
}

// Export Data
function exportData() {
    console.log('📊 Exporting submissions data...');
    
    // Simulate export
    setTimeout(() => {
        showNotification('Data exported successfully!', 'success');
    }, 500);
}

// Load Submissions
function loadSubmissions() {
    console.log('📚 Loading submissions...');
    // In production, fetch from API
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

// Setup Pagination
function setupPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            
            // Handle prev/next buttons
            if (btn.querySelector('i')) {
                const isNext = btn.querySelector('.bx-chevron-right');
                handlePageNavigation(isNext ? 'next' : 'prev');
            } else {
                // Handle number buttons
                const pageNum = btn.textContent;
                goToPage(parseInt(pageNum));
            }
        });
    });
}

// Handle Page Navigation
function handlePageNavigation(direction) {
    const activeBtn = document.querySelector('.page-btn.active');
    const currentPage = parseInt(activeBtn.textContent);
    
    if (direction === 'next') {
        goToPage(currentPage + 1);
    } else {
        goToPage(currentPage - 1);
    }
}

// Go to Page
function goToPage(pageNum) {
    console.log(`📄 Going to page ${pageNum}`);
    
    // Update active state
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === pageNum.toString()) {
            btn.classList.add('active');
        }
    });
    
    // In production, fetch data for that page
    showNotification(`Loading page ${pageNum}...`, 'info');
}

// Setup Bulk Actions
function setupBulkActions() {
    // Add select all checkbox functionality
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.row-checkbox');
            checkboxes.forEach(cb => cb.checked = e.target.checked);
            updateBulkActionsBar();
        });
    }
}

// Update Bulk Actions Bar
function updateBulkActionsBar() {
    const checkedBoxes = document.querySelectorAll('.row-checkbox:checked');
    console.log(`✅ Selected ${checkedBoxes.length} submissions`);
}

// Setup Top Bar Buttons
function setupTopBarButtons() {
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            console.log('🔔 Opening notifications');
            showNotification('You have 5 new notifications', 'info');
        });
    }
    
    // Profile menu
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu) {
        profileMenu.addEventListener('click', () => {
            console.log('👤 Opening profile menu');
        });
    }
}

// Check URL Parameters
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const assignment = urlParams.get('assignment');
    
    if (assignment) {
        console.log(`🔗 Filtering by assignment from URL: ${assignment}`);
        // Filter by assignment
        const assignmentFilter = document.getElementById('assignmentFilter');
        if (assignmentFilter) {
            // Find matching option
            const options = assignmentFilter.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text.includes(decodeURIComponent(assignment))) {
                    assignmentFilter.selectedIndex = i;
                    filterByAssignment(options[i].value);
                    break;
                }
            }
        }
        showNotification(`Showing submissions for: ${decodeURIComponent(assignment)}`, 'info');
    }
}

// Update Submission Stats
function updateSubmissionStats() {
    const rows = document.querySelectorAll('.submission-row');
    const pending = document.querySelectorAll('.submission-row.pending').length;
    const graded = document.querySelectorAll('.submission-row.graded').length;
    const late = document.querySelectorAll('.submission-row.late').length;
    
    // Update stat displays
    const totalEl = document.getElementById('totalSubmissions');
    const pendingEl = document.getElementById('pendingCount');
    const gradedEl = document.getElementById('gradedCount');
    const lateEl = document.getElementById('lateCount');
    
    if (totalEl) totalEl.textContent = rows.length;
    if (pendingEl) pendingEl.textContent = pending;
    if (gradedEl) gradedEl.textContent = graded;
    if (lateEl) lateEl.textContent = late;
    
    console.log(`📊 Stats - Total: ${rows.length}, Pending: ${pending}, Graded: ${graded}, Late: ${late}`);
}

// View Submission Details
function viewSubmissionDetails(studentName, assignmentName) {
    console.log(`👁️ Viewing submission details for ${studentName}`);
    
    // Create modal or navigate to detail page
    showNotification(`Opening submission for ${studentName}`, 'info');
    
    // In production, open modal with file preview
}

// Download All Submissions
function downloadAllSubmissions() {
    console.log('📥 Downloading all submissions...');
    showNotification('Preparing download... This may take a moment', 'info');
    
    setTimeout(() => {
        showNotification('All submissions downloaded successfully!', 'success');
    }, 2000);
}

// Send Reminder
function sendReminder(studentName) {
    console.log(`📧 Sending reminder to ${studentName}`);
    showNotification(`Reminder sent to ${studentName}`, 'success');
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
        initializeSubmissions,
        filterSubmissions,
        searchSubmissions,
        downloadSubmission,
        exportData,
        goToPage,
        viewSubmissionDetails
    };
}
