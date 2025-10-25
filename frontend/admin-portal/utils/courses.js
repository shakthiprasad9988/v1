// Courses Management JavaScript

// Search Courses
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchCourses');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterCourses(query);
        });
    }

    // Form submission
    const createCourseForm = document.getElementById('createCourseForm');
    if (createCourseForm) {
        createCourseForm.addEventListener('submit', handleCreateCourse);
    }
});

// Filter courses by search query
function filterCourses(query) {
    const cards = document.querySelectorAll('.course-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    if (visibleCount === 0 && query) {
        showEmptyState();
    } else {
        hideEmptyState();
    }
}

// Filter by Department
function filterByDepartment() {
    const departmentFilter = document.getElementById('departmentFilter').value;
    showToast(`Filtered by department: ${departmentFilter}`, 'info');
    // In production, filter courses by department
}

// Filter by Status
function filterByStatus() {
    const statusFilter = document.getElementById('statusFilter').value;
    const cards = document.querySelectorAll('.course-card');
    
    cards.forEach(card => {
        if (statusFilter === 'all') {
            card.style.display = '';
        } else {
            const statusBadge = card.querySelector('.status-badge');
            const statusText = statusBadge.textContent.toLowerCase();
            card.style.display = statusText === statusFilter ? '' : 'none';
        }
    });
    
    showToast(`Filtered by status: ${statusFilter}`, 'info');
}

// View Course
function viewCourse(courseId) {
    showToast(`Opening course: ${courseId}`, 'info');
    // In production, navigate to course detail page
    console.log('View course:', courseId);
}

// Edit Course
function editCourse(courseId) {
    showToast(`Opening edit form for: ${courseId}`, 'info');
    // In production, open edit modal with course data
    console.log('Edit course:', courseId);
}

// Delete Course
function deleteCourse(courseId) {
    if (confirm(`Are you sure you want to delete course: ${courseId}? This will also delete all assignments and submissions.`)) {
        showToast('Course deleted successfully', 'success');
        
        // Remove card from grid (demo)
        setTimeout(() => {
            const cards = document.querySelectorAll('.course-card');
            cards.forEach(card => {
                const code = card.querySelector('.course-code').textContent.toLowerCase();
                if (code === courseId) {
                    card.remove();
                }
            });
        }, 500);
    }
}

// Open Create Course Modal
function openCreateCourseModal() {
    const modal = document.getElementById('createCourseModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Close Create Course Modal
function closeCreateCourseModal() {
    const modal = document.getElementById('createCourseModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Handle Create Course Form
function handleCreateCourse(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const courseData = Object.fromEntries(formData);
    
    console.log('Creating course:', courseData);
    showToast('Course created successfully!', 'success');
    
    closeCreateCourseModal();
    e.target.reset();
    
    // In production, make API call to create course
}

// Clone Course
function cloneCourse() {
    showToast('Select a course to clone', 'info');
    // In production, show course selection dialog
    setTimeout(() => {
        showToast('Course cloned successfully!', 'success');
    }, 2000);
}

// Export Courses
function exportCourses() {
    showToast('Exporting courses to CSV...', 'info');
    setTimeout(() => {
        showToast('Courses exported successfully!', 'success');
        // In production, trigger CSV download
    }, 1500);
}

// Show Empty State
function showEmptyState() {
    const grid = document.getElementById('coursesGrid');
    const existingEmpty = document.querySelector('.empty-state');
    
    if (!existingEmpty) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class='bx bx-search'></i>
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters</p>
        `;
        grid.appendChild(emptyState);
    }
}

// Hide Empty State
function hideEmptyState() {
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
}

// Manage Enrollments
function manageEnrollments(courseId) {
    showToast(`Managing enrollments for: ${courseId}`, 'info');
    // In production, open enrollment management modal
}

// Archive Course
function archiveCourse(courseId) {
    if (confirm(`Archive course: ${courseId}?`)) {
        showToast('Course archived successfully', 'success');
        // In production, make API call to archive course
    }
}

// Publish Course (from draft)
function publishCourse(courseId) {
    if (confirm(`Publish course: ${courseId}?`)) {
        showToast('Course published successfully', 'success');
        // In production, make API call to publish course
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('createCourseModal');
    if (e.target === modal) {
        closeCreateCourseModal();
    }
});
