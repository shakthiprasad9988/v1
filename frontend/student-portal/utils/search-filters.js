// Advanced Search Filters & History

// Search history storage
const SEARCH_HISTORY_KEY = 'fileportal_search_history';
const SAVED_SEARCHES_KEY = 'fileportal_saved_searches';
const MAX_HISTORY_ITEMS = 10;

// Get search history from localStorage
function getSearchHistory() {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (e) {
    console.error('Error loading search history:', e);
    return [];
  }
}

// Save search to history
function saveToHistory(query, filters = {}) {
  if (!query || query.trim().length < 2) return;
  
  const history = getSearchHistory();
  const timestamp = new Date().toISOString();
  
  // Remove duplicate if exists
  const filtered = history.filter(item => item.query !== query);
  
  // Add new search at the beginning
  filtered.unshift({
    query,
    filters,
    timestamp,
    id: Date.now()
  });
  
  // Keep only last MAX_HISTORY_ITEMS
  const trimmed = filtered.slice(0, MAX_HISTORY_ITEMS);
  
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Error saving search history:', e);
  }
}

// Clear search history
function clearSearchHistory() {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    return true;
  } catch (e) {
    console.error('Error clearing search history:', e);
    return false;
  }
}

// Get saved searches
function getSavedSearches() {
  try {
    const saved = localStorage.getItem(SAVED_SEARCHES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error loading saved searches:', e);
    return [];
  }
}

// Save a search
function saveSearch(name, query, filters = {}) {
  const saved = getSavedSearches();
  
  const newSearch = {
    id: Date.now(),
    name,
    query,
    filters,
    createdAt: new Date().toISOString(),
    usageCount: 0
  };
  
  saved.push(newSearch);
  
  try {
    localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(saved));
    return newSearch;
  } catch (e) {
    console.error('Error saving search:', e);
    return null;
  }
}

// Delete saved search
function deleteSavedSearch(id) {
  const saved = getSavedSearches();
  const filtered = saved.filter(s => s.id !== id);
  
  try {
    localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Error deleting saved search:', e);
    return false;
  }
}

// Increment usage count for saved search
function incrementSearchUsage(id) {
  const saved = getSavedSearches();
  const search = saved.find(s => s.id === id);
  
  if (search) {
    search.usageCount++;
    search.lastUsed = new Date().toISOString();
    
    try {
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(saved));
    } catch (e) {
      console.error('Error updating search usage:', e);
    }
  }
}

// Render search history
function renderSearchHistory() {
  const history = getSearchHistory();
  
  if (history.length === 0) {
    return `
      <div class="search-empty-section">
        <i class='bx bx-history'></i>
        <p>No recent searches</p>
      </div>
    `;
  }
  
  return `
    <div class="search-history-section">
      <div class="section-header">
        <h4><i class='bx bx-history'></i> Recent Searches</h4>
        <button class="clear-history-btn" onclick="clearHistory()">
          <i class='bx bx-trash'></i> Clear
        </button>
      </div>
      <div class="history-list">
        ${history.map(item => `
          <div class="history-item" onclick="applyHistorySearch('${item.query}')">
            <i class='bx bx-time'></i>
            <span class="history-query">${item.query}</span>
            <span class="history-time">${formatTimeAgo(item.timestamp)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Render saved searches
function renderSavedSearches() {
  const saved = getSavedSearches();
  
  if (saved.length === 0) {
    return `
      <div class="search-empty-section">
        <i class='bx bx-bookmark'></i>
        <p>No saved searches</p>
      </div>
    `;
  }
  
  return `
    <div class="saved-searches-section">
      <h4><i class='bx bx-bookmark'></i> Saved Searches</h4>
      <div class="saved-list">
        ${saved.map(item => `
          <div class="saved-item">
            <div class="saved-info" onclick="applySavedSearch(${item.id})">
              <i class='bx bx-search-alt'></i>
              <div class="saved-details">
                <strong>${item.name}</strong>
                <span>${item.query}</span>
              </div>
            </div>
            <button class="delete-saved-btn" onclick="deleteSaved(${item.id})" title="Delete">
              <i class='bx bx-x'></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Apply history search
function applyHistorySearch(query) {
  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) {
    searchInput.value = query;
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
  }
}

// Apply saved search
function applySavedSearch(id) {
  const saved = getSavedSearches();
  const search = saved.find(s => s.id === id);
  
  if (search) {
    incrementSearchUsage(id);
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.value = search.query;
      searchInput.dispatchEvent(new Event('input'));
      searchInput.focus();
    }
    
    // Apply filters if any
    if (search.filters && Object.keys(search.filters).length > 0) {
      applyFilters(search.filters);
    }
  }
}

// Clear history
function clearHistory() {
  if (confirm('Clear all search history?')) {
    clearSearchHistory();
    showSearchPanel('history');
    showNotification('success', 'Search history cleared');
  }
}

// Delete saved search
function deleteSaved(id) {
  if (confirm('Delete this saved search?')) {
    deleteSavedSearch(id);
    showSearchPanel('saved');
    showNotification('success', 'Saved search deleted');
  }
}

// Format time ago
function formatTimeAgo(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
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

// Show search panel (history or saved)
function showSearchPanel(type) {
  const resultsContainer = document.getElementById('globalSearchResults');
  if (!resultsContainer) return;
  
  let html = '';
  
  if (type === 'history') {
    html = renderSearchHistory();
  } else if (type === 'saved') {
    html = renderSavedSearches();
  }
  
  resultsContainer.innerHTML = html;
  resultsContainer.classList.add('active');
}

// Open save search modal
function openSaveSearchModal() {
  const searchInput = document.getElementById('globalSearchInput');
  const query = searchInput ? searchInput.value : '';
  
  if (!query || query.trim().length < 2) {
    showNotification('info', 'Enter a search query first');
    return;
  }
  
  const name = prompt('Enter a name for this search:', query);
  
  if (name && name.trim()) {
    const saved = saveSearch(name.trim(), query);
    if (saved) {
      showNotification('success', `Search "${name}" saved!`);
    } else {
      showNotification('error', 'Failed to save search');
    }
  }
}

// Apply filters
function applyFilters(filters) {
  console.log('Applying filters:', filters);
  // This would trigger a new search with filters
  // Implementation depends on your search system
}

// Show notification
function showNotification(type, message) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 30px;
    background: var(--white);
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 3000;
    min-width: 300px;
    border-left: 4px solid ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--info-color)'};
  `;
  notification.innerHTML = `
    <i class='bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-error-circle' : 'bx-info-circle'}' 
       style="font-size: 24px; color: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--info-color)'}"></i>
    <span style="font-size: 14px; color: var(--dark);">${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3000);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getSearchHistory,
    saveToHistory,
    clearSearchHistory,
    getSavedSearches,
    saveSearch,
    deleteSavedSearch,
    renderSearchHistory,
    renderSavedSearches,
    showSearchPanel,
    openSaveSearchModal
  };
}
