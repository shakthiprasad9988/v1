// Page Transition Handler - No Flash

// Show page content smoothly
document.addEventListener('DOMContentLoaded', function() {
  // Add loaded class to body to fade in
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 50);
});

// Create transition overlay
function createTransitionOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);
  return overlay;
}

// Initialize page transitions
function initPageTransitions() {
  const overlay = createTransitionOverlay();
  
  // Get all internal links
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    // Skip external links and anchors
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) {
      return;
    }
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetUrl = this.href;
      
      // Add exit animation to current page
      document.body.classList.add('page-exit');
      
      // Activate transition overlay
      overlay.classList.add('active');
      
      // Navigate after animation
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 300);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPageTransitions);
} else {
  initPageTransitions();
}

// Handle browser back/forward buttons
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    // Page was loaded from cache
    document.body.classList.remove('page-exit');
    document.body.classList.add('loaded');
    const overlay = document.querySelector('.page-transition');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }
});

// Prevent flash on page load
window.addEventListener('beforeunload', function() {
  document.body.classList.remove('loaded');
});
