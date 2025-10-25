// Assignments Management JavaScript

// Search Assignments
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchAssignments');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterTable(query);
        });
    }

    // Initialize checkbox listeners
    initCheckboxListeners();
});

// Filter table by search query
function filterTable(query) {
    const rows = document.querySelectorAll('#assignmentsTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

// Filter by Course
function filterByCourse() {
    const courseFilter = document.getElementById('courseFilter').value;
    const rows = document.querySelectorAll('#assignmentsTableBody tr');
    
    rows.forEach(row => {
        if (courseFilter === 'all') {
            row.style.display = '';
        } else {
            const courseBadge = row.querySelector('.course-badge');
            const courseText = courseBadge.textContent.toLowerCase();
            row.style.display = courseText === courseFilter ? '' : 'none';
        }
    });
    
    showToast(`Filtered by course: ${courseFilter}`, 'info');
}

// Filter by Status
function filterByStatus() {
    const statusFilter = document.getElementById('statusFilter').value;
    const rows = document.querySelectorAll('#assignmentsTableBody tr');
    
    rows.forEach(row => {
        if (statusFilter === 'all') {
            row.style.display = '';
        } else {
            const statusBadge = row.querySelector('.status-badge');
            const statusText = statusBadge.textContent.toLowerCase();
            row.style.display = statusText === statusFilter ? '' : 'none';
        }
    });
    
    showToast(`Filtered by status: ${statusFilter}`, 'info');
}

// View Assignment
function viewAssignment(assignmentId) {
    showToast(`Opening assignment: ${assignmentId}`, 'info');
    // In production, navigate to assignment detail page
    console.log('View assignment:', assignmentId);
}

// Extend Deadline
function extendDeadline(assignmentId) {
    const days = prompt('Extend deadline by how many days?', '7');
    if (days && !isNaN(days)) {
        showToast(`Deadline extended by ${days} days`, 'success');
        console.log('Extend deadline:', assignmentId, days);
    }
}

// Delete Assignment
function deleteAssignment(assignmentId) {
    if (confirm(`Are you sure you want to delete this assignment? This will also delete all submissions.`)) {
        showToast('Assignment deleted successfully', 'success');
        
        // Remove row from table (demo)
        setTimeout(() => {
            const rows = document.querySelectorAll('#assignmentsTableBody tr');
            rows.forEach(row => {
                if (row.textContent.includes(assignmentId)) {
                    row.remove();
                }
            });
        }, 500);
    }
}

// Export Assignments
function exportAssignments() {
    showToast('Exporting assignments to CSV...', 'info');
    setTimeout(() => {
        showToast('Assignments exported successfully!', 'success');
        // In production, trigger CSV download
    }, 1500);
}

// Bulk Extend Deadline
function bulkExtendDeadline() {
    const days = prompt('Extend all deadlines by how many days?', '7');
    if (days && !isNaN(days)) {
        showToast(`All deadlines extended by ${days} days`, 'success');
    }
}

// Select All Checkbox
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.assignment-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateBulkActionsBar();
}

// Initialize Checkbox Listeners
function initCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.assignment-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBulkActionsBar);
    });
}

// Update Bulk Actions Bar
function updateBulkActionsBar() {
    const checkboxes = document.querySelectorAll('.assignment-checkbox:checked');
    const count = checkboxes.length;
    const bulkBar = document.getElementById('bulkActionsBar');
    const countSpan = document.getElementById('selectedCount');
    
    if (count > 0) {
        bulkBar.style.display = 'flex';
        countSpan.textContent = `${count} assignment${count > 1 ? 's' : ''} selected`;
    } else {
        bulkBar.style.display = 'none';
    }
}

// Bulk Extend Selected
function bulkExtendSelected() {
    const checkboxes = document.querySelectorAll('.assignment-checkbox:checked');
    const count = checkboxes.length;
    const days = prompt(`Extend ${count} assignment(s) by how many days?`, '7');
    
    if (days && !isNaN(days)) {
        showToast(`${count} assignment(s) deadline extended by ${days} days`, 'success');
        checkboxes.forEach(checkbox => checkbox.checked = false);
        updateBulkActionsBar();
    }
}

// Bulk Delete Selected
function bulkDeleteSelected() {
    const checkboxes = document.querySelectorAll('.assignment-checkbox:checked');
    const count = checkboxes.length;
    
    if (confirm(`Delete ${count} selected assignment(s)? This will also delete all submissions.`)) {
        showToast(`${count} assignment(s) deleted`, 'success');
        
        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            setTimeout(() => row.remove(), 300);
        });
        
        updateBulkActionsBar();
    }
}

// Pagination
function previousPage() {
    showToast('Loading previous page...', 'info');
    // In production, load previous page data
}

function nextPage() {
    showToast('Loading next page...', 'info');
    // In production, load next page data
}
