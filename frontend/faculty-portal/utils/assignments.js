// Assignments Management

document.addEventListener('DOMContentLoaded', () => {
    initializeAssignments();
    setupFilters();
    setupSearch();
    setupModal();
    setupCardActions();
});

// Initialize Assignments
function initializeAssignments() {
    console.log('✅ Assignments page initialized');
    loadAssignments();
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterAssignments(filter);
        });
    });
}

// Filter Assignments
function filterAssignments(filter) {
    const cards = document.querySelectorAll('.assignment-card');
    
    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            if (card.classList.contains(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
    
    console.log(`🔍 Filtered by: ${filter}`);
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            searchAssignments(query);
        });
    }
}

// Search Assignments
function searchAssignments(query) {
    const cards = document.querySelectorAll('.assignment-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.assignment-description').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Setup Modal
function setupModal() {
    const createBtn = document.getElementById('createAssignmentBtn');
    const modal = document.getElementById('createAssignmentModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('createAssignmentForm');
    
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal on outside click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            createAssignment(new FormData(form));
        });
    }
}

// Create Assignment
function createAssignment(formData) {
    console.log('✅ Creating new assignment...');
    
    // Get form values
    const title = document.getElementById('assignmentTitle').value;
    const course = document.getElementById('assignmentCourse').value;
    const description = document.getElementById('assignmentDescription').value;
    const dueDate = document.getElementById('assignmentDueDate').value;
    const dueTime = document.getElementById('assignmentDueTime').value;
    const maxPoints = document.getElementById('assignmentMaxPoints').value;
    
    const assignmentData = {
        title,
        course,
        description,
        dueDate,
        dueTime,
        maxPoints
    };
    
    console.log('📝 Assignment Data:', assignmentData);
    
    // Simulate API call
    setTimeout(() => {
        console.log('✅ Assignment created successfully');
        
        // Add new assignment card to the grid
        addAssignmentCard(assignmentData);
        
        // Close modal and reset form
        document.getElementById('createAssignmentModal').classList.remove('active');
        document.getElementById('createAssignmentForm').reset();
        
        // Reset modal title and button
        document.querySelector('.modal-header h2').textContent = 'Create New Assignment';
        document.getElementById('submitAssignmentBtn').textContent = 'Create Assignment';
        
        // Show success message
        showNotification('Assignment created successfully!', 'success');
    }, 500);
}

// Add Assignment Card
function addAssignmentCard(data) {
    const grid = document.getElementById('assignmentsGrid');
    
    // Format date
    const dateObj = new Date(data.dueDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    // Get course name
    const courseSelect = document.getElementById('assignmentCourse');
    const courseName = courseSelect.options[courseSelect.selectedIndex].text;
    
    const cardHTML = `
        <div class="assignment-card active" style="animation: slideIn 0.3s ease;">
            <div class="card-header">
                <div class="assignment-title">
                    <h3>${data.title}</h3>
                    <span class="course-tag">${courseName.split(' - ')[0]}</span>
                </div>
                <div class="card-actions">
                    <button class="btn-icon" title="Edit">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="btn-icon" title="Delete">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
            <p class="assignment-description">
                ${data.description}
            </p>
            <div class="assignment-meta">
                <div class="meta-item">
                    <i class='bx bx-calendar'></i>
                    <span>Due: ${formattedDate}</span>
                </div>
                <div class="meta-item">
                    <i class='bx bx-time'></i>
                    <span>${data.dueTime}</span>
                </div>
            </div>
            <div class="assignment-stats">
                <div class="stat">
                    <span class="stat-value">0/0</span>
                    <span class="stat-label">Submitted</span>
                </div>
                <div class="stat">
                    <span class="stat-value">0</span>
                    <span class="stat-label">Graded</span>
                </div>
                <div class="stat">
                    <span class="stat-value">0</span>
                    <span class="stat-label">Pending</span>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn-secondary">View Submissions</button>
                <button class="btn-primary">Grade Now</button>
            </div>
        </div>
    `;
    
    grid.insertAdjacentHTML('afterbegin', cardHTML);
}

// Load Assignments
function loadAssignments() {
    // Simulate loading assignments from API
    console.log('📚 Loading assignments...');
}

// Show Notification
function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class='bx ${getToastIcon(type)}'></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
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

// Setup Card Actions
function setupCardActions() {
    // Handle Edit buttons
    document.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-icon[title="Edit"]');
        if (editBtn) {
            const card = editBtn.closest('.assignment-card');
            const title = card.querySelector('h3').textContent;
            editAssignment(card, title);
        }
    });

    // Handle Delete buttons
    document.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.btn-icon[title="Delete"]');
        if (deleteBtn) {
            const card = deleteBtn.closest('.assignment-card');
            const title = card.querySelector('h3').textContent;
            deleteAssignment(card, title);
        }
    });

    // Handle View Submissions buttons
    document.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.btn-secondary');
        if (viewBtn && viewBtn.textContent.includes('View Submissions')) {
            const card = viewBtn.closest('.assignment-card');
            const title = card.querySelector('h3').textContent;
            viewSubmissions(title);
        }
    });

    // Handle Grade Now buttons
    document.addEventListener('click', (e) => {
        const gradeBtn = e.target.closest('.card-footer .btn-primary');
        if (gradeBtn && gradeBtn.textContent.includes('Grade Now')) {
            const card = gradeBtn.closest('.assignment-card');
            const title = card.querySelector('h3').textContent;
            gradeNow(title);
        }
    });
}

// Edit Assignment
function editAssignment(card, title) {
    console.log(`✏️ Editing assignment: ${title}`);
    
    // Get assignment data
    const description = card.querySelector('.assignment-description').textContent;
    const courseTag = card.querySelector('.course-tag').textContent;
    const dueDate = card.querySelector('.meta-item span').textContent;
    
    // In production, populate modal with existing data
    showNotification(`Opening editor for: ${title}`, 'info');
    
    // Open modal with pre-filled data
    const modal = document.getElementById('createAssignmentModal');
    modal.classList.add('active');
    
    // Update modal title
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Edit Assignment';
    
    // Update submit button text
    const submitBtn = modal.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Update Assignment';
}

// Delete Assignment
function deleteAssignment(card, title) {
    console.log(`🗑️ Deleting assignment: ${title}`);
    
    // Confirm deletion
    if (confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`)) {
        // Animate card removal
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            card.remove();
            showNotification(`Assignment "${title}" deleted successfully`, 'success');
        }, 300);
    }
}

// View Submissions
function viewSubmissions(assignmentTitle) {
    console.log(`📂 Viewing submissions for: ${assignmentTitle}`);
    
    // Navigate to submissions page with filter
    const encodedTitle = encodeURIComponent(assignmentTitle);
    window.location.href = `submissions.html?assignment=${encodedTitle}`;
}

// Grade Now
function gradeNow(assignmentTitle) {
    console.log(`✏️ Starting grading for: ${assignmentTitle}`);
    
    // Navigate to grading page
    const encodedTitle = encodeURIComponent(assignmentTitle);
    window.location.href = `grading.html?assignment=${encodedTitle}`;
}

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Notification Button
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        console.log('🔔 Opening notifications');
        showNotification('You have 5 new notifications', 'info');
    });
}

// Profile Menu
const profileMenu = document.querySelector('.profile-menu');
if (profileMenu) {
    profileMenu.addEventListener('click', () => {
        console.log('👤 Opening profile menu');
        // In production, show dropdown menu
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAssignments,
        filterAssignments,
        searchAssignments,
        createAssignment,
        editAssignment,
        deleteAssignment,
        viewSubmissions,
        gradeNow
    };
}
