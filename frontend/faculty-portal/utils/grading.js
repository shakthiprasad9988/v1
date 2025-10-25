// Grading Functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeGrading();
    setupRubricInputs();
    setupQuickComments();
    setupNavigation();
    setupGradeSubmission();
});

// Initialize Grading
function initializeGrading() {
    console.log('✅ Grading page initialized');
    calculateTotalScore();
}

// Setup Rubric Inputs
function setupRubricInputs() {
    const pointsInputs = document.querySelectorAll('.points-input');
    
    pointsInputs.forEach(input => {
        input.addEventListener('input', () => {
            updateRubricBar(input);
            calculateTotalScore();
        });
    });
}

// Update Rubric Bar
function updateRubricBar(input) {
    const rubricItem = input.closest('.rubric-item');
    const rubricFill = rubricItem.querySelector('.rubric-fill');
    const maxPoints = parseInt(input.max);
    const currentPoints = parseInt(input.value) || 0;
    
    const percentage = (currentPoints / maxPoints) * 100;
    rubricFill.style.width = `${percentage}%`;
}

// Calculate Total Score
function calculateTotalScore() {
    const pointsInputs = document.querySelectorAll('.points-input');
    let totalEarned = 0;
    let totalPossible = 0;
    
    pointsInputs.forEach(input => {
        totalEarned += parseInt(input.value) || 0;
        totalPossible += parseInt(input.max) || 0;
    });
    
    const scoreValue = document.querySelector('.score-value');
    if (scoreValue) {
        scoreValue.textContent = `${totalEarned} / ${totalPossible}`;
    }
    
    console.log(`📊 Total Score: ${totalEarned}/${totalPossible}`);
}

// Setup Quick Comments
function setupQuickComments() {
    const chips = document.querySelectorAll('.chip');
    const feedbackText = document.getElementById('feedbackText');
    
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const comment = chip.textContent;
            const currentFeedback = feedbackText.value;
            
            // Add comment to feedback
            if (currentFeedback) {
                feedbackText.value = `${currentFeedback}\n\n${comment}`;
            } else {
                feedbackText.value = comment;
            }
            
            console.log(`💬 Added quick comment: ${comment}`);
        });
    });
}

// Setup Navigation
function setupNavigation() {
    const prevBtn = document.getElementById('prevSubmission');
    const nextBtn = document.getElementById('nextSubmission');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateSubmission('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateSubmission('next');
        });
    }
}

// Navigate Submission
function navigateSubmission(direction) {
    console.log(`🔄 Navigating to ${direction} submission`);
    
    // In production, load the next/previous submission
    // For now, just show a message
    showNotification(`Loading ${direction} submission...`, 'info');
}

// Setup Grade Submission
function setupGradeSubmission() {
    const submitBtn = document.getElementById('submitGradeBtn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            submitGrade();
        });
    }
}

// Submit Grade
function submitGrade() {
    const pointsInputs = document.querySelectorAll('.points-input');
    const feedbackText = document.getElementById('feedbackText');
    
    let totalEarned = 0;
    let totalPossible = 0;
    const rubricScores = [];
    
    pointsInputs.forEach(input => {
        const rubricItem = input.closest('.rubric-item');
        const rubricName = rubricItem.querySelector('.rubric-name').textContent;
        const earned = parseInt(input.value) || 0;
        const max = parseInt(input.max) || 0;
        
        totalEarned += earned;
        totalPossible += max;
        
        rubricScores.push({
            name: rubricName,
            earned,
            max
        });
    });
    
    const gradeData = {
        totalScore: totalEarned,
        maxScore: totalPossible,
        percentage: ((totalEarned / totalPossible) * 100).toFixed(2),
        rubricScores,
        feedback: feedbackText.value,
        timestamp: new Date().toISOString()
    };
    
    console.log('📝 Submitting grade:', gradeData);
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Grade submitted successfully!', 'success');
        
        // Navigate to next submission
        setTimeout(() => {
            navigateSubmission('next');
        }, 1000);
    }, 500);
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

// Setup Save Draft Button
function setupSaveDraft() {
    const saveDraftBtn = document.querySelector('.btn-secondary');
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            saveDraft();
        });
    }
}

// Save Draft
function saveDraft() {
    const pointsInputs = document.querySelectorAll('.points-input');
    const feedbackText = document.getElementById('feedbackText');
    
    let totalEarned = 0;
    let totalPossible = 0;
    
    pointsInputs.forEach(input => {
        totalEarned += parseInt(input.value) || 0;
        totalPossible += parseInt(input.max) || 0;
    });
    
    const draftData = {
        totalScore: totalEarned,
        maxScore: totalPossible,
        feedback: feedbackText.value,
        timestamp: new Date().toISOString(),
        isDraft: true
    };
    
    console.log('💾 Saving draft:', draftData);
    
    // Simulate saving
    setTimeout(() => {
        showNotification('Draft saved successfully!', 'success');
    }, 300);
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

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// File Download
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-icon[title="Download"]')) {
        const fileItem = e.target.closest('.file-item');
        const fileName = fileItem.querySelector('.file-name').textContent;
        console.log(`📥 Downloading file: ${fileName}`);
        showNotification(`Downloading ${fileName}...`, 'info');
        
        // Simulate download
        setTimeout(() => {
            showNotification(`${fileName} downloaded successfully!`, 'success');
        }, 1000);
    }
});

// Initialize all handlers
document.addEventListener('DOMContentLoaded', () => {
    setupSaveDraft();
    setupTopBarButtons();
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeGrading,
        calculateTotalScore,
        submitGrade,
        navigateSubmission,
        saveDraft
    };
}
