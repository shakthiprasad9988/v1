// Settings Page JavaScript

// Tab Navigation
function initSettingsTabs() {
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.tab;

            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(targetPanel).classList.add('active');
        });
    });
}

// Profile Photo Change
function initProfilePhoto() {
    const changePhotoBtn = document.querySelector('.change-photo-btn');
    const profileImg = document.querySelector('.profile-photo img');

    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        profileImg.src = event.target.result;
                        showToast('Profile photo updated', 'success');
                        showSaveBar();
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    }
}

// Form Change Detection
function initFormChangeDetection() {
    const forms = document.querySelectorAll('.settings-panel form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                showSaveBar();
            });
        });
    });
}

// Save Bar
function showSaveBar() {
    const saveBar = document.getElementById('saveBar');
    if (saveBar) {
        saveBar.style.display = 'block';
        setTimeout(() => saveBar.classList.add('show'), 10);
    }
}

function hideSaveBar() {
    const saveBar = document.getElementById('saveBar');
    if (saveBar) {
        saveBar.classList.remove('show');
        setTimeout(() => saveBar.style.display = 'none', 300);
    }
}

// Save Changes
function saveChanges() {
    // Simulate API call
    setTimeout(() => {
        showToast('Settings saved successfully', 'success');
        hideSaveBar();
    }, 1000);
}

// Discard Changes
function discardChanges() {
    if (confirm('Are you sure you want to discard all changes?')) {
        location.reload();
    }
}



// Notification Settings
function initNotificationSettings() {
    const toggles = document.querySelectorAll('.toggle-switch input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            showSaveBar();
        });
    });
}

// Theme Selection
function initThemeSelection() {
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            themeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const theme = card.dataset.theme;
            applyTheme(theme);
            showSaveBar();
        });
    });
}

function applyTheme(theme) {
    // Apply theme logic here
    console.log('Applying theme:', theme);
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}



// Rubric Configuration
function initRubricConfig() {
    const rubricInputs = document.querySelectorAll('.rubric-item input');
    
    rubricInputs.forEach(input => {
        input.addEventListener('change', () => {
            validateRubricTotal();
            showSaveBar();
        });
    });
}

function validateRubricTotal() {
    const inputs = document.querySelectorAll('.rubric-item input');
    let total = 0;
    
    inputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });
    
    if (total !== 100) {
        showToast(`Rubric total is ${total}%. Should be 100%`, 'warning');
    }
}

// Account Deletion
function deleteAccount() {
    const confirmation = prompt('This action cannot be undone. Type "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        console.log('Account deletion requested');
        showToast('Account deletion initiated. You will receive a confirmation email.', 'info');
    } else if (confirmation !== null) {
        showToast('Account deletion cancelled', 'info');
    }
}

// Export Data
function exportData() {
    console.log('Exporting user data');
    showToast('Data export started. You will receive an email when ready.', 'info');
}

// Toast Notifications
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'bx bx-check-circle',
        error: 'bx bx-error-circle',
        warning: 'bx bx-error',
        info: 'bx bx-info-circle'
    };
    
    toast.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize all settings functionality
document.addEventListener('DOMContentLoaded', () => {
    initSettingsTabs();
    initProfilePhoto();
    initFormChangeDetection();
    initNotificationSettings();
    initThemeSelection();
    initRubricConfig();
    
    // Individual save buttons
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const saveGradingBtn = document.getElementById('saveGradingBtn');
    const downloadDataBtn = document.getElementById('downloadDataBtn');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            showToast('Profile updated successfully', 'success');
            hideSaveBar();
        });
    }
    
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('#account input[type="password"]');
            const currentPassword = inputs[0].value;
            const newPassword = inputs[1].value;
            const confirmPassword = inputs[2].value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                showToast('Please fill in all password fields', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                showToast('Password must be at least 8 characters', 'error');
                return;
            }
            
            showToast('Password changed successfully', 'success');
            inputs.forEach(input => input.value = '');
        });
    }
    
    if (saveGradingBtn) {
        saveGradingBtn.addEventListener('click', () => {
            validateRubricTotal();
            showToast('Grading preferences saved', 'success');
            hideSaveBar();
        });
    }
    
    if (downloadDataBtn) {
        downloadDataBtn.addEventListener('click', exportData);
    }
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', deleteAccount);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Reset all settings to default values?')) {
                showToast('Settings reset to default', 'info');
                setTimeout(() => location.reload(), 1000);
            }
        });
    }
    
    // Save bar buttons
    const saveAllBtn = document.getElementById('saveAllBtn');
    const discardBtn = document.getElementById('discardBtn');
    
    if (saveAllBtn) saveAllBtn.addEventListener('click', saveChanges);
    if (discardBtn) discardBtn.addEventListener('click', discardChanges);
    
    // 2FA toggle
    const enable2FA = document.getElementById('enable2FA');
    if (enable2FA) {
        enable2FA.addEventListener('change', (e) => {
            if (e.target.checked) {
                showToast('Two-factor authentication enabled', 'success');
            } else {
                showToast('Two-factor authentication disabled', 'warning');
            }
        });
    }
    
    // Compact mode toggle
    const compactMode = document.getElementById('compactMode');
    if (compactMode) {
        compactMode.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('compact-mode');
                showToast('Compact mode enabled', 'success');
            } else {
                document.body.classList.remove('compact-mode');
                showToast('Compact mode disabled', 'info');
            }
        });
    }
    
    // Animations toggle
    const showAnimations = document.getElementById('showAnimations');
    if (showAnimations) {
        showAnimations.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.remove('no-animations');
                showToast('Animations enabled', 'success');
            } else {
                document.body.classList.add('no-animations');
                showToast('Animations disabled', 'info');
            }
        });
    }
    
    // Session revoke buttons
    const revokeButtons = document.querySelectorAll('.btn-danger-small');
    revokeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Revoke this session?')) {
                btn.closest('.session-item').remove();
                showToast('Session revoked', 'success');
            }
        });
    });
    
    // Late penalty dropdown
    const latePenalty = document.getElementById('latePenalty');
    if (latePenalty) {
        latePenalty.addEventListener('change', () => {
            showSaveBar();
        });
    }
});
