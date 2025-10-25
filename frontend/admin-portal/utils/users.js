// Users Management JavaScript

// Search Users
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchUsers');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterTable(query);
        });
    }

    // Initialize checkbox listeners
    initCheckboxListeners();

    // Form submission
    const createUserForm = document.getElementById('createUserForm');
    if (createUserForm) {
        createUserForm.addEventListener('submit', handleCreateUser);
    }
});

// Filter table by search query
function filterTable(query) {
    const rows = document.querySelectorAll('#usersTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

// Filter by Role
function filterByRole() {
    const roleFilter = document.getElementById('roleFilter').value;
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        if (roleFilter === 'all') {
            row.style.display = '';
        } else {
            const roleBadge = row.querySelector('.role-badge');
            const roleText = roleBadge.textContent.toLowerCase();
            row.style.display = roleText === roleFilter ? '' : 'none';
        }
    });
    
    showToast(`Filtered by role: ${roleFilter}`, 'info');
}

// Filter by Status
function filterByStatus() {
    const statusFilter = document.getElementById('statusFilter').value;
    const rows = document.querySelectorAll('#usersTableBody tr');
    
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

// View User
function viewUser(userId) {
    showToast(`Opening user profile: ${userId}`, 'info');
    // In production, navigate to user detail page
    console.log('View user:', userId);
}

// Edit User
function editUser(userId) {
    showToast(`Opening edit form for: ${userId}`, 'info');
    // In production, open edit modal with user data
    console.log('Edit user:', userId);
}

// Delete User
function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user: ${userId}?`)) {
        showToast('User deleted successfully', 'success');
        // In production, make API call to delete user
        console.log('Delete user:', userId);
        
        // Remove row from table (demo)
        setTimeout(() => {
            const rows = document.querySelectorAll('#usersTableBody tr');
            rows.forEach(row => {
                if (row.textContent.includes(userId)) {
                    row.remove();
                }
            });
        }, 500);
    }
}

// Open Create User Modal
function openCreateUserModal() {
    const modal = document.getElementById('createUserModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Close Create User Modal
function closeCreateUserModal() {
    const modal = document.getElementById('createUserModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Handle Create User Form
function handleCreateUser(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    
    console.log('Creating user:', userData);
    showToast('User created successfully!', 'success');
    
    closeCreateUserModal();
    e.target.reset();
    
    // In production, make API call to create user
}

// Import Users
function importUsers() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showToast(`Importing users from: ${file.name}`, 'info');
            setTimeout(() => {
                showToast('23 users imported successfully!', 'success');
            }, 2000);
        }
    };
    
    input.click();
}

// Export Users
function exportUsers() {
    showToast('Exporting users to CSV...', 'info');
    setTimeout(() => {
        showToast('Users exported successfully!', 'success');
        // In production, trigger CSV download
    }, 1500);
}

// Select All Checkbox
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateBulkActionsBar();
}

// Initialize Checkbox Listeners
function initCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBulkActionsBar);
    });
}

// Update Bulk Actions Bar
function updateBulkActionsBar() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    const count = checkboxes.length;
    const bulkBar = document.getElementById('bulkActionsBar');
    const countSpan = document.getElementById('selectedCount');
    
    if (count > 0) {
        bulkBar.style.display = 'flex';
        countSpan.textContent = `${count} user${count > 1 ? 's' : ''} selected`;
    } else {
        bulkBar.style.display = 'none';
    }
}

// Bulk Activate
function bulkActivate() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    const count = checkboxes.length;
    
    if (confirm(`Activate ${count} selected user(s)?`)) {
        showToast(`${count} user(s) activated`, 'success');
        
        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.className = 'status-badge active';
            statusBadge.textContent = 'Active';
            checkbox.checked = false;
        });
        
        updateBulkActionsBar();
    }
}

// Bulk Deactivate
function bulkDeactivate() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    const count = checkboxes.length;
    
    if (confirm(`Deactivate ${count} selected user(s)?`)) {
        showToast(`${count} user(s) deactivated`, 'warning');
        
        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.className = 'status-badge inactive';
            statusBadge.textContent = 'Inactive';
            checkbox.checked = false;
        });
        
        updateBulkActionsBar();
    }
}

// Bulk Delete
function bulkDelete() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    const count = checkboxes.length;
    
    if (confirm(`Delete ${count} selected user(s)? This action cannot be undone.`)) {
        showToast(`${count} user(s) deleted`, 'success');
        
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

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('createUserModal');
    if (e.target === modal) {
        closeCreateUserModal();
    }
});
