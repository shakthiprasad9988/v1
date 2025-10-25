// Settings JavaScript

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Settings navigation
  document.querySelectorAll('.settings-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      switchTab(item.dataset.tab);
    });
  });

  // Save buttons
  document.getElementById('saveProfile').addEventListener('click', saveProfile);
  document.getElementById('savePreferences').addEventListener('click', savePreferences);
  document.getElementById('changePassword').addEventListener('click', changePassword);
  document.getElementById('deleteAccount').addEventListener('click', deleteAccount);

  // Toggle switches
  document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', () => {
      saveSettings();
    });
  });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
}

// Switch tabs
function switchTab(tabName) {
  // Update navigation
  document.querySelectorAll('.settings-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Update content
  document.querySelectorAll('.settings-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(tabName).classList.add('active');
}

// Load settings from localStorage
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
  
  // Profile
  if (settings.profile) {
    document.getElementById('fullName').value = settings.profile.fullName || 'Student User';
    document.getElementById('email').value = settings.profile.email || 'student@example.com';
    document.getElementById('phone').value = settings.profile.phone || '';
    document.getElementById('studentId').value = settings.profile.studentId || 'STU2025001';
    document.getElementById('department').value = settings.profile.department || 'Computer Science';
    document.getElementById('year').value = settings.profile.year || '3';
    document.getElementById('bio').value = settings.profile.bio || '';
  }

  // Preferences
  if (settings.preferences) {
    document.getElementById('language').value = settings.preferences.language || 'en';
    document.getElementById('timezone').value = settings.preferences.timezone || 'UTC';
    document.getElementById('dateFormat').value = settings.preferences.dateFormat || 'MM/DD/YYYY';
  }

  // Notifications
  if (settings.notifications) {
    document.getElementById('emailNotif').checked = settings.notifications.email !== false;
    document.getElementById('pushNotif').checked = settings.notifications.push !== false;
    document.getElementById('submissionNotif').checked = settings.notifications.submission !== false;
    document.getElementById('deadlineNotif').checked = settings.notifications.deadline !== false;
    document.getElementById('gradeNotif').checked = settings.notifications.grade !== false;
    document.getElementById('messageNotif').checked = settings.notifications.message !== false;
  }

  // Privacy
  if (settings.privacy) {
    document.getElementById('profileVisibility').checked = settings.privacy.profileVisible !== false;
    document.getElementById('showEmail').checked = settings.privacy.showEmail !== false;
    document.getElementById('showPhone').checked = settings.privacy.showPhone || false;
    document.getElementById('activityStatus').checked = settings.privacy.activityStatus !== false;
  }
}

// Save settings to localStorage
function saveSettings() {
  const settings = {
    profile: {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      studentId: document.getElementById('studentId').value,
      department: document.getElementById('department').value,
      year: document.getElementById('year').value,
      bio: document.getElementById('bio').value
    },
    preferences: {
      language: document.getElementById('language').value,
      timezone: document.getElementById('timezone').value,
      dateFormat: document.getElementById('dateFormat').value
    },
    notifications: {
      email: document.getElementById('emailNotif').checked,
      push: document.getElementById('pushNotif').checked,
      submission: document.getElementById('submissionNotif').checked,
      deadline: document.getElementById('deadlineNotif').checked,
      grade: document.getElementById('gradeNotif').checked,
      message: document.getElementById('messageNotif').checked
    },
    privacy: {
      profileVisible: document.getElementById('profileVisibility').checked,
      showEmail: document.getElementById('showEmail').checked,
      showPhone: document.getElementById('showPhone').checked,
      activityStatus: document.getElementById('activityStatus').checked
    }
  };

  localStorage.setItem('userSettings', JSON.stringify(settings));
}

// Save profile
function saveProfile() {
  saveSettings();
  showAlert('success', 'Profile updated successfully!');
}

// Save preferences
function savePreferences() {
  saveSettings();
  showAlert('success', 'Preferences saved successfully!');
}

// Change password
function changePassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmNewPassword').value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    showAlert('warning', 'Please fill in all password fields');
    return;
  }

  if (newPassword.length < 8) {
    showAlert('warning', 'New password must be at least 8 characters long');
    return;
  }

  if (newPassword !== confirmPassword) {
    showAlert('danger', 'New passwords do not match');
    return;
  }

  // In real app, send to backend
  showAlert('success', 'Password changed successfully!');
  
  // Clear fields
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmNewPassword').value = '';
}

// Delete account
function deleteAccount() {
  const confirmation = prompt('Type "DELETE" to confirm account deletion:');
  
  if (confirmation !== 'DELETE') {
    showAlert('warning', 'Account deletion cancelled');
    return;
  }

  if (confirm('Are you absolutely sure? This action cannot be undone!')) {
    // In real app, send to backend
    localStorage.clear();
    showAlert('success', 'Account deleted. Redirecting...');
    
    setTimeout(() => {
      window.location.href = '../../shared/pages/login.html';
    }, 2000);
  }
}

// Show alert
function showAlert(type, message) {
  const alertContainer = document.getElementById('alertContainer');
  
  const alert = document.createElement('div');
  alert.className = `alert-box alert-${type}`;
  alert.innerHTML = `
    <i class='bx ${type === 'success' ? 'bx-check-circle' : type === 'warning' ? 'bx-error' : 'bx-x-circle'}'></i>
    <span>${message}</span>
  `;
  
  alertContainer.appendChild(alert);
  
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// Change avatar (placeholder)
function changeAvatar() {
  alert('Avatar upload functionality would be implemented here.\nIn a real app, this would open a file picker.');
}
