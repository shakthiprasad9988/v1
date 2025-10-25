// Student Dashboard JavaScript

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  }
});

// Profile menu dropdown (placeholder for future implementation)
const profileMenu = document.querySelector('.profile-menu');
if (profileMenu) {
  profileMenu.addEventListener('click', () => {
    // Add dropdown functionality here
    console.log('Profile menu clicked');
  });
}

// Notification button (placeholder for future implementation)
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
  notificationBtn.addEventListener('click', () => {
    // Add notification panel functionality here
    console.log('Notifications clicked');
  });
}

// Search functionality (placeholder)
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Add search functionality here
    console.log('Searching for:', searchTerm);
  });
}

// Update time left for deadlines
function updateDeadlines() {
  const deadlineItems = document.querySelectorAll('.deadline-item');
  
  deadlineItems.forEach(item => {
    const timeLeftElement = item.querySelector('.time-left');
    if (timeLeftElement) {
      // This is a placeholder - in real implementation, calculate from actual dates
      const text = timeLeftElement.textContent;
      if (text.includes('2 days')) {
        item.classList.add('urgent');
      }
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateDeadlines();
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Refresh stats periodically (placeholder)
setInterval(() => {
  // In real implementation, fetch updated stats from API
  console.log('Stats refresh check');
}, 60000); // Every minute
