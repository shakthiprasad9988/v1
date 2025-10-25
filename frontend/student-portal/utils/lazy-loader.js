// Lazy Loading Utility

// Intersection Observer for lazy loading images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Load the image
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      }
      
      // Load srcset if available
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      
      // Stop observing this image
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px', // Start loading 50px before entering viewport
  threshold: 0.01
});

// Initialize lazy loading for images
function initLazyImages() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

// Lazy load components/sections
const componentObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const component = entry.target;
      const componentName = component.dataset.component;
      
      if (componentName) {
        loadComponent(componentName, component);
        observer.unobserve(component);
      }
    }
  });
}, {
  rootMargin: '100px',
  threshold: 0.01
});

// Load component dynamically
async function loadComponent(name, container) {
  try {
    container.classList.add('loading');
    
    // Dynamic import of component
    const module = await import(`./components/${name}.js`);
    
    if (module.default) {
      await module.default(container);
    }
    
    container.classList.remove('loading');
    container.classList.add('loaded');
  } catch (error) {
    console.error(`Failed to load component: ${name}`, error);
    container.classList.add('error');
  }
}

// Initialize lazy loading for components
function initLazyComponents() {
  const lazyComponents = document.querySelectorAll('[data-component]');
  lazyComponents.forEach(component => {
    componentObserver.observe(component);
  });
}

// Lazy load scripts
function loadScript(src, async = true, defer = false) {
  return new Promise((resolve, reject) => {
    // Check if script already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.head.appendChild(script);
  });
}

// Lazy load CSS
function loadCSS(href) {
  return new Promise((resolve, reject) => {
    // Check if CSS already loaded
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
    
    document.head.appendChild(link);
  });
}

// Preload critical resources
function preloadResource(href, as, type = null) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (type) {
    link.type = type;
  }
  
  document.head.appendChild(link);
}

// Prefetch resources for next page
function prefetchResource(href, as = 'document') {
  // Skip prefetching for file:// protocol
  if (window.location.protocol === 'file:') {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = as;
  
  document.head.appendChild(link);
}

// Lazy load on scroll (for infinite scroll)
function initInfiniteScroll(container, loadMoreCallback, threshold = 200) {
  let loading = false;
  
  const handleScroll = () => {
    if (loading) return;
    
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      loading = true;
      
      loadMoreCallback().then(() => {
        loading = false;
      }).catch(error => {
        console.error('Failed to load more content:', error);
        loading = false;
      });
    }
  };
  
  container.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => container.removeEventListener('scroll', handleScroll);
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Request Idle Callback polyfill
const requestIdleCallback = window.requestIdleCallback || function(cb) {
  const start = Date.now();
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
    });
  }, 1);
};

// Cancel Idle Callback polyfill
const cancelIdleCallback = window.cancelIdleCallback || function(id) {
  clearTimeout(id);
};

// Load non-critical resources during idle time
function loadDuringIdle(callback) {
  requestIdleCallback(callback, { timeout: 2000 });
}

// Initialize all lazy loading
function initLazyLoading() {
  initLazyImages();
  initLazyComponents();
  
  // Prefetch next likely pages
  prefetchNextPages();
}

// Prefetch pages user is likely to visit
function prefetchNextPages() {
  const currentPage = window.location.pathname.split('/').pop();
  
  const nextPages = {
    'dashboard.html': ['submissions.html', 'upload.html'],
    'submissions.html': ['feedback.html', 'upload.html'],
    'upload.html': ['submissions.html'],
    'feedback.html': ['submissions.html'],
    'collaboration.html': ['chat.html']
  };
  
  const pages = nextPages[currentPage] || [];
  
  loadDuringIdle(() => {
    pages.forEach(page => {
      prefetchResource(page);
    });
  });
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initLazyLoading,
    initLazyImages,
    initLazyComponents,
    loadScript,
    loadCSS,
    preloadResource,
    prefetchResource,
    initInfiniteScroll,
    debounce,
    throttle,
    loadDuringIdle
  };
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
  initLazyLoading();
}
