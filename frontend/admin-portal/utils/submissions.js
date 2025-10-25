// Submissions Management JavaScript

// Search Submissions
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchSubmissions');
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
    const rows = document.querySelectorAll('#submissionsTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

// Filter by Course
function filterByCourse() {
    const courseFilter = document.getElementById('courseFilter').value;
    const rows = document.querySelectorAll('#submissionsTableBody tr');
    
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
    const rows = document.querySelectorAll('#submissionsTableBody tr');
    
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

// View Submission
function viewSubmission(submissionId) {
    showToast(`Opening submission: ${submissionId}`, 'info');
    // In production, navigate to submission detail page
    console.log('View submission:', submissionId);
}

// Download Submission
function downloadSubmission(submissionId) {
    showToast(`Downloading submission: ${submissionId}`, 'info');
    // In production, trigger file download
    console.log('Download submission:', submissionId);
}

// Delete Submission
function deleteSubmission(submissionId) {
    if (confirm(`Are you sure you want to delete this submission?`)) {
        showToast('Submission deleted successfully', 'success');
        
        // Remove row from table (demo)
        setTimeout(() => {
            const rows = document.querySelectorAll('#submissionsTableBody tr');
            rows.forEach(row => {
                if (row.textContent.includes(submissionId)) {
                    row.remove();
                }
            });
        }, 500);
    }
}

// Export Submissions
function exportSubmissions() {
    showToast('Exporting submissions to CSV...', 'info');
    setTimeout(() => {
        showToast('Submissions exported successfully!', 'success');
        // In production, trigger CSV download
    }, 1500);
}

// Download All
function downloadAll() {
    if (confirm('Download all submissions as a ZIP file? This may take a while.')) {
        showToast('Preparing download...', 'info');
        setTimeout(() => {
            showToast('Download started!', 'success');
            // In production, trigger ZIP download
        }, 2000);
    }
}

// Bulk Delete Submissions
function bulkDeleteSubmissions() {
    if (confirm('Delete all submissions? This action cannot be undone.')) {
        showToast('This would delete all submissions', 'warning');
    }
}

// Select All Checkbox
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.submission-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateBulkActionsBar();
}

// Initialize Checkbox Listeners
function initCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.submission-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBulkActionsBar);
    });
}

// Update Bulk Actions Bar
function updateBulkActionsBar() {
    const checkboxes = document.querySelectorAll('.submission-checkbox:checked');
    const count = checkboxes.length;
    const bulkBar = document.getElementById('bulkActionsBar');
    const countSpan = document.getElementById('selectedCount');
    
    if (count > 0) {
        bulkBar.style.display = 'flex';
        countSpan.textContent = `${count} submission${count > 1 ? 's' : ''} selected`;
    } else {
        bulkBar.style.display = 'none';
    }
}

// Bulk Download
function bulkDownload() {
    const checkboxes = document.querySelectorAll('.submission-checkbox:checked');
    const count = checkboxes.length;
    
    if (confirm(`Download ${count} selected submission(s) as ZIP?`)) {
        showToast(`Preparing ${count} file(s) for download...`, 'info');
        setTimeout(() => {
            showToast('Download started!', 'success');
        }, 1500);
        
        checkboxes.forEach(checkbox => checkbox.checked = false);
        updateBulkActionsBar();
    }
}

// Bulk Delete
function bulkDelete() {
    const checkboxes = document.querySelectorAll('.submission-checkbox:checked');
    const count = checkboxes.length;
    
    if (confirm(`Delete ${count} selected submission(s)? This action cannot be undone.`)) {
        showToast(`${count} submission(s) deleted`, 'success');
        
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
