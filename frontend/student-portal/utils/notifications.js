// Notifications and Profile Menu Functionality

// Notification data structure
const notificationsData = [
  {
    id: 1,
    type: 'grade',
    title: 'New Grade Posted',
    message: 'Your Web Development Project has been graded: A+',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    icon: 'bx-medal',
    color: '#4caf50',
    link: 'feedback.html?id=2'
  },
  {
    id: 2,
    type: 'feedback',
    title: 'Feedback Received',
    message: 'Prof. Smith added feedback to your Database Lab submission',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    icon: 'bx-message-square-detail',
    color: '#2196f3',
    link: 'submissions.html?id=3'
  },
  {
    id: 3,
    type: 'mention',
    title: 'You were mentioned',
    message: 'Alice Johnson mentioned you in Data Structures Study Group',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
    icon: 'bx-at',
    color: '#ff9800',
    link: 'collaboration.html?group=1'
  },
  {
    id: 4,
    type: 'deadline',
    title: 'Upcoming Deadline',
    message: 'E-Commerce Website Project due in 2 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    icon: 'bx-time',
    color: '#f44336',
    link: 'calendar.html'
  },
  {
    id: 5,
    type: 'peer-review',
    title: 'Peer Review Assigned',
    message: 'You have been assigned to review Bob Smith\'s submission',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    icon: 'bx-edit',
    color: '#9c27b0',
    link: 'collaboration.html?tab=peer-review'
  }
];

// Get notifications from localStorage or use default
function getNotifications() {
  try {
    const stored = localStorage.getItem('student_notifications');
    return stored ? JSON.parse(stored) : notificationsData;
  } catch (e) {
    return notificationsData;
  }
}

// Save notifications to localStorage
function saveNotifications(notifications) {
  try {
    localStorage.setItem('student_notifications', JSON.stringify(notifications));
  } catch (e) {
    console.error('Failed to save notifications:', e);
  }
}

// Get unread count
function getUnreadCount() {
  const notifications = getNotifications();
  return notifications.filter(n => !n.read).length;
}

// Update notification badge
function updateNotificationBadge() {
  const badge = document.querySelector('.notification-btn .badge');
  const count = getUnreadCount();
  
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'block' : 'none';
  }
}

// Format time ago
function formatTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Render notifications dropdown
function renderNotificationsDropdown() {
  const notifications = getNotifications();
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);
  
  let html = `
    <div class="notifications-header">
      <h3>Notifications</h3>
      <div class="notifications-actions">
        ${unreadNotifications.length > 0 ? `
          <button class="mark-all-read-btn" onclick="markAllAsRead()">
            <i class='bx bx-check-double'></i> Mark all read
          </button>
        ` : ''}
        <button class="close-notifications-btn" onclick="closeNotifications()">
          <i class='bx bx-x'></i>
        </button>
      </div>
    </div>
    <div class="notifications-body">
  `;
  
  if (notifications.length === 0) {
    html += `
      <div class="notifications-empty">
        <i class='bx bx-bell-off'></i>
        <p>No notifications</p>
      </div>
    `;
  } else {
    if (unreadNotifications.length > 0) {
      html += '<div class="notifications-section"><h4>New</h4>';
      unreadNotifications.forEach(notif => {
        html += renderNotificationItem(notif);
      });
      html += '</div>';
    }
    
    if (readNotifications.length > 0) {
      html += '<div class="notifications-section"><h4>Earlier</h4>';
      readNotifications.forEach(notif => {
        html += renderNotificationItem(notif);
      });
      html += '</div>';
    }
  }
  
  html += `
    </div>
    <div class="notifications-footer">
      <a href="#" onclick="viewAllNotifications(); return false;">View All Notifications</a>
    </div>
  `;
  
  return html;
}

// Render single notification item
function renderNotificationItem(notif) {
  return `
    <div class="notification-item ${notif.read ? 'read' : 'unread'}" onclick="handleNotificationClick(${notif.id})">
      <div class="notification-icon" style="background: ${notif.color}">
        <i class='bx ${notif.icon}'></i>
      </div>
      <div class="notification-content">
        <h5>${notif.title}</h5>
        <p>${notif.message}</p>
        <span class="notification-time">${formatTimeAgo(notif.timestamp)}</span>
      </div>
      ${!notif.read ? '<div class="notification-dot"></div>' : ''}
    </div>
  `;
}

// Toggle notifications dropdown
function toggleNotifications() {
  const dropdown = document.getElementById('notificationsDropdown');
  
  if (!dropdown) {
    createNotificationsDropdown();
  } else {
    if (dropdown.classList.contains('active')) {
      closeNotifications();
    } else {
      openNotifications();
    }
  }
}

// Create notifications dropdown
function createNotificationsDropdown() {
  const existingDropdown = document.getElementById('notificationsDropdown');
  if (existingDropdown) {
    existingDropdown.remove();
  }
  
  const dropdown = document.createElement('div');
  dropdown.id = 'notificationsDropdown';
  dropdown.className = 'notifications-dropdown';
  dropdown.innerHTML = renderNotificationsDropdown();
  
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.parentElement.style.position = 'relative';
    notificationBtn.parentElement.appendChild(dropdown);
  }
  
  setTimeout(() => dropdown.classList.add('active'), 10);
}

// Open notifications
function openNotifications() {
  const dropdown = document.getElementById('notificationsDropdown');
  if (dropdown) {
    dropdown.innerHTML = renderNotificationsDropdown();
    dropdown.classList.add('active');
  } else {
    createNotificationsDropdown();
  }
}

// Close notifications
function closeNotifications() {
  const dropdown = document.getElementById('notificationsDropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
  }
}

// Handle notification click
function handleNotificationClick(id) {
  const notifications = getNotifications();
  const notification = notifications.find(n => n.id === id);
  
  if (notification) {
    // Mark as read
    notification.read = true;
    saveNotifications(notifications);
    updateNotificationBadge();
    
    // Navigate to link
    if (notification.link) {
      window.location.href = notification.link;
    }
  }
}

// Mark all as read
function markAllAsRead() {
  const notifications = getNotifications();
  notifications.forEach(n => n.read = true);
  saveNotifications(notifications);
  updateNotificationBadge();
  openNotifications(); // Refresh dropdown
  showToast('All notifications marked as read');
}

// View all notifications
function viewAllNotifications() {
  // Navigate to a dedicated notifications page or show modal
  console.log('View all notifications');
  showToast('Notifications page coming soon!');
}

// Profile menu functionality
function toggleProfileMenu() {
  const menu = document.getElementById('profileMenuDropdown');
  
  if (!menu) {
    createProfileMenu();
  } else {
    if (menu.classList.contains('active')) {
      closeProfileMenu();
    } else {
      openProfileMenu();
    }
  }
}

// Create profile menu
function createProfileMenu() {
  const existingMenu = document.getElementById('profileMenuDropdown');
  if (existingMenu) {
    existingMenu.remove();
  }
  
  const menu = document.createElement('div');
  menu.id = 'profileMenuDropdown';
  menu.className = 'profile-menu-dropdown';
  menu.innerHTML = renderProfileMenu();
  
  const profileMenuBtn = document.querySelector('.profile-menu');
  if (profileMenuBtn) {
    profileMenuBtn.style.position = 'relative';
    profileMenuBtn.appendChild(menu);
  }
  
  setTimeout(() => menu.classList.add('active'), 10);
}

// Render profile menu
function renderProfileMenu() {
  // Get user data from localStorage or use default
  const userData = getUserData();
  
  return `
    <div class="profile-menu-header">
      <img src="${userData.avatar}" alt="${userData.name}">
      <div class="profile-info">
        <h4>${userData.name}</h4>
        <p>${userData.email}</p>
      </div>
    </div>
    <div class="profile-menu-body">
      <a href="dashboard.html" class="profile-menu-item">
        <i class='bx bx-home'></i>
        <span>Dashboard</span>
      </a>
      <a href="settings.html" class="profile-menu-item">
        <i class='bx bx-cog'></i>
        <span>Settings</span>
      </a>
      <a href="feedback.html" class="profile-menu-item">
        <i class='bx bx-message-square-detail'></i>
        <span>My Grades</span>
      </a>
      <a href="analytics.html" class="profile-menu-item">
        <i class='bx bx-bar-chart'></i>
        <span>My Progress</span>
      </a>
      <div class="profile-menu-divider"></div>
      <a href="#" onclick="toggleTheme(); return false;" class="profile-menu-item">
        <i class='bx bx-moon'></i>
        <span>Dark Mode</span>
        <div class="toggle-switch">
          <input type="checkbox" id="themeToggle">
          <label for="themeToggle"></label>
        </div>
      </a>
      <a href="#" onclick="showHelp(); return false;" class="profile-menu-item">
        <i class='bx bx-help-circle'></i>
        <span>Help & Support</span>
      </a>
      <div class="profile-menu-divider"></div>
      <a href="../../shared/pages/login.html" onclick="handleLogout(); return false;" class="profile-menu-item logout">
        <i class='bx bx-log-out'></i>
        <span>Logout</span>
      </a>
    </div>
  `;
}

// Get user data
function getUserData() {
  try {
    const stored = localStorage.getItem('student_user_data');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load user data:', e);
  }
  
  // Default user data
  return {
    name: 'Student User',
    email: 'student@university.edu',
    avatar: 'https://ui-avatars.com/api/?name=Student+User&background=667eea&color=fff',
    id: '12345',
    role: 'student'
  };
}

// Open profile menu
function openProfileMenu() {
  const menu = document.getElementById('profileMenuDropdown');
  if (menu) {
    menu.innerHTML = renderProfileMenu();
    menu.classList.add('active');
  } else {
    createProfileMenu();
  }
}

// Close profile menu
function closeProfileMenu() {
  const menu = document.getElementById('profileMenuDropdown');
  if (menu) {
    menu.classList.remove('active');
  }
}

// Toggle theme
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled');
}

// Show help
function showHelp() {
  showToast('Help documentation coming soon!');
  closeProfileMenu();
}

// Handle logout
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    // Clear user session
    localStorage.removeItem('student_session');
    showToast('Logging out...');
    
    setTimeout(() => {
      window.location.href = '../../shared/pages/login.html';
    }, 1000);
  }
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class='bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-error-circle' : 'bx-info-circle'}'></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.notification-btn') && !e.target.closest('#notificationsDropdown')) {
    closeNotifications();
  }
  
  if (!e.target.closest('.profile-menu') && !e.target.closest('#profileMenuDropdown')) {
    closeProfileMenu();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateNotificationBadge();
  
  // Setup notification button
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNotifications();
    });
  }
  
  // Setup profile menu button
  const profileMenuBtn = document.querySelector('.profile-menu');
  if (profileMenuBtn) {
    profileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleProfileMenu();
    });
  }
  
  // Load theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleNotifications,
    toggleProfileMenu,
    markAllAsRead,
    handleLogout
  };
}
