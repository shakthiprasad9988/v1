// Service Worker for Caching and Offline Support

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `fileportal-${CACHE_VERSION}`;

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/student-portal/pages/dashboard.html',
  '/student-portal/pages/submissions.html',
  '/student-portal/styles/dashboard.css',
  '/student-portal/styles/submissions.css',
  '/student-portal/utils/dashboard.js',
  '/student-portal/utils/global-search.js',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Route patterns and their strategies
const ROUTE_STRATEGIES = [
  { pattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i, strategy: CACHE_STRATEGIES.CACHE_FIRST },
  { pattern: /\.(?:css|js)$/i, strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE },
  { pattern: /\.(?:html)$/i, strategy: CACHE_STRATEGIES.NETWORK_FIRST },
  { pattern: /\/api\//i, strategy: CACHE_STRATEGIES.NETWORK_FIRST },
  { pattern: /fonts\.googleapis\.com/i, strategy: CACHE_STRATEGIES.CACHE_FIRST },
  { pattern: /unpkg\.com/i, strategy: CACHE_STRATEGIES.CACHE_FIRST }
];

// Install event - precache assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name.startsWith('fileportal-') && name !== CACHE_NAME)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Determine strategy for this request
  const strategy = getStrategyForRequest(request);
  
  event.respondWith(
    handleRequest(request, strategy)
  );
});

// Get caching strategy for request
function getStrategyForRequest(request) {
  const url = new URL(request.url);
  
  for (const route of ROUTE_STRATEGIES) {
    if (route.pattern.test(url.pathname) || route.pattern.test(url.href)) {
      return route.strategy;
    }
  }
  
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Handle request with specified strategy
async function handleRequest(request, strategy) {
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request);
    
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request);
    
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request);
    
    case CACHE_STRATEGIES.CACHE_ONLY:
      return cacheOnly(request);
    
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return networkOnly(request);
    
    default:
      return networkFirst(request);
  }
}

// Cache First strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    
    if (cached) {
      return cached;
    }
    
    console.error('[SW] Network first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate strategy
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });
  
  return cached || fetchPromise;
}

// Cache Only strategy
async function cacheOnly(request) {
  const cached = await caches.match(request);
  return cached || new Response('Not in cache', { status: 404 });
}

// Network Only strategy
async function networkOnly(request) {
  return fetch(request);
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-submissions') {
    event.waitUntil(syncSubmissions());
  }
});

// Sync submissions when back online
async function syncSubmissions() {
  try {
    // Get pending submissions from IndexedDB
    // Send to server
    // Clear from IndexedDB
    console.log('[SW] Syncing submissions...');
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'New notification',
    icon: '/assets/icon-192.png',
    badge: '/assets/badge-72.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'FilePortal', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Message from client
self.addEventListener('message', event => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        return self.registration.unregister();
      })
    );
  }
});
