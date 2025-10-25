// Global Search Functionality

// Search index - combines all searchable content
const searchIndex = {
  submissions: [],
  feedback: [],
  groups: [],
  assignments: [],
  messages: [],
  courses: []
};

// Initialize search
function initializeSearch() {
  buildSearchIndex();
  setupSearchListeners();
}

// Build search index from all data sources
function buildSearchIndex() {
  // This would normally fetch from backend
  // For now, we'll use sample data
  
  searchIndex.submissions = [
    { id: 1, type: 'submission', title: 'Assignment 3 - Data Structures', course: 'Data Structures', content: 'Implementation of Binary Search Tree', date: '2025-10-23', status: 'pending' },
    { id: 2, type: 'submission', title: 'Project Report - Web Development', course: 'Web Development', content: 'Full-stack e-commerce website', date: '2025-10-20', status: 'approved' },
    { id: 3, type: 'submission', title: 'Lab Exercise 5 - Database', course: 'Database Systems', content: 'SQL queries and normalization', date: '2025-10-18', status: 'approved' }
  ];
  
  searchIndex.feedback = [
    { id: 1, type: 'feedback', title: 'Feedback on Web Dev Project', course: 'Web Development', content: 'Excellent work! Clean implementation', date: '2025-10-20', grade: 'A+' },
    { id: 2, type: 'feedback', title: 'Feedback on Database Lab', course: 'Database Systems', content: 'Good understanding of normalization', date: '2025-10-18', grade: 'B+' }
  ];
  
  searchIndex.groups = [
    { id: 1, type: 'group', title: 'Data Structures Study Group', course: 'Data Structures', content: 'Weekly study sessions', members: 4 },
    { id: 2, type: 'group', title: 'Web Dev Project Team', course: 'Web Development', content: 'Collaborative project team', members: 3 }
  ];
  
  searchIndex.assignments = [
    { id: 1, type: 'assignment', title: 'E-Commerce Website Project', course: 'Web Development', content: 'Build full-stack platform', dueDate: '2025-11-15', status: 'active' },
    { id: 2, type: 'assignment', title: 'Binary Search Tree Implementation', course: 'Data Structures', content: 'Implement BST with operations', dueDate: '2025-10-20', status: 'completed' }
  ];
}

// Perform search across all content
function performSearch(query, filters = {}) {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  const results = [];
  
  // Search in all categories
  Object.keys(searchIndex).forEach(category => {
    if (filters.type && filters.type !== category) return;
    
    searchIndex[category].forEach(item => {
      const score = calculateRelevanceScore(item, searchTerm);
      
      if (score > 0) {
        results.push({
          ...item,
          category,
          score,
          highlight: generateHighlight(item, searchTerm)
        });
      }
    });
  });
  
  // Apply additional filters
  let filtered = results;
  
  if (filters.course) {
    filtered = filtered.filter(r => r.course === filters.course);
  }
  
  if (filters.status) {
    filtered = filtered.filter(r => r.status === filters.status);
  }
  
  if (filters.dateFrom) {
    filtered = filtered.filter(r => new Date(r.date || r.dueDate) >= new Date(filters.dateFrom));
  }
  
  if (filters.dateTo) {
    filtered = filtered.filter(r => new Date(r.date || r.dueDate) <= new Date(filters.dateTo));
  }
  
  // Sort by relevance score
  filtered.sort((a, b) => b.score - a.score);
  
  return filtered;
}

// Calculate relevance score
function calculateRelevanceScore(item, searchTerm) {
  let score = 0;
  
  // Title match (highest weight)
  if (item.title && item.title.toLowerCase().includes(searchTerm)) {
    score += 10;
    if (item.title.toLowerCase().startsWith(searchTerm)) {
      score += 5; // Bonus for starting with search term
    }
  }
  
  // Course match
  if (item.course && item.course.toLowerCase().includes(searchTerm)) {
    score += 5;
  }
  
  // Content match
  if (item.content && item.content.toLowerCase().includes(searchTerm)) {
    score += 3;
  }
  
  // Exact match bonus
  const words = searchTerm.split(' ');
  words.forEach(word => {
    if (item.title && item.title.toLowerCase() === word) {
      score += 15;
    }
  });
  
  return score;
}

// Generate highlighted text snippet
function generateHighlight(item, searchTerm) {
  const text = item.content || item.title;
  const index = text.toLowerCase().indexOf(searchTerm);
  
  if (index === -1) return text.substring(0, 100) + '...';
  
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + searchTerm.length + 40);
  
  let snippet = text.substring(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  
  // Highlight the search term
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  snippet = snippet.replace(regex, '<mark>$1</mark>');
  
  return snippet;
}

// Setup search listeners
function setupSearchListeners() {
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('globalSearchResults');
  
  if (!searchInput) return;
  
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    
    const query = e.target.value;
    
    if (query.length < 2) {
      hideSearchResults();
      return;
    }
    
    // Debounce search
    searchTimeout = setTimeout(() => {
      const results = performSearch(query);
      displaySearchResults(results);
      
      // Save to history
      if (typeof saveToHistory === 'function') {
        saveToHistory(query);
      }
    }, 300);
  });
  
  // Show history/saved on focus if empty
  searchInput.addEventListener('focus', (e) => {
    if (!e.target.value || e.target.value.length < 2) {
      if (typeof showSearchPanel === 'function') {
        showSearchPanel('history');
      }
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.global-search-container')) {
      hideSearchResults();
    }
  });
  
  // Keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideSearchResults();
      searchInput.blur();
    }
  });
}

// Display search results
function displaySearchResults(results) {
  const resultsContainer = document.getElementById('globalSearchResults');
  if (!resultsContainer) return;
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-empty">
        <i class='bx bx-search-alt'></i>
        <p>No results found</p>
      </div>
    `;
    resultsContainer.classList.add('active');
    return;
  }
  
  // Group results by category
  const grouped = {};
  results.forEach(result => {
    if (!grouped[result.category]) {
      grouped[result.category] = [];
    }
    grouped[result.category].push(result);
  });
  
  let html = '';
  
  Object.keys(grouped).forEach(category => {
    html += `
      <div class="search-category">
        <h4>${formatCategoryName(category)}</h4>
        ${grouped[category].map(result => createResultItem(result)).join('')}
      </div>
    `;
  });
  
  resultsContainer.innerHTML = html;
  resultsContainer.classList.add('active');
}

// Create result item HTML
function createResultItem(result) {
  const icon = getCategoryIcon(result.category);
  const badge = getResultBadge(result);
  
  return `
    <div class="search-result-item" onclick="navigateToResult('${result.category}', ${result.id})">
      <div class="result-icon">
        <i class='bx ${icon}'></i>
      </div>
      <div class="result-content">
        <div class="result-header">
          <h5>${result.title}</h5>
          ${badge}
        </div>
        <p class="result-snippet">${result.highlight}</p>
        <div class="result-meta">
          ${result.course ? `<span><i class='bx bx-book'></i> ${result.course}</span>` : ''}
          ${result.date ? `<span><i class='bx bx-calendar'></i> ${formatDate(result.date)}</span>` : ''}
          ${result.dueDate ? `<span><i class='bx bx-time'></i> Due ${formatDate(result.dueDate)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// Helper functions
function formatCategoryName(category) {
  const names = {
    submissions: 'Submissions',
    feedback: 'Feedback & Grades',
    groups: 'Study Groups',
    assignments: 'Group Assignments',
    messages: 'Messages',
    courses: 'Courses'
  };
  return names[category] || category;
}

function getCategoryIcon(category) {
  const icons = {
    submissions: 'bx-folder',
    feedback: 'bx-message-square-detail',
    groups: 'bx-group',
    assignments: 'bx-folder-open',
    messages: 'bx-message-dots',
    courses: 'bx-book'
  };
  return icons[category] || 'bx-file';
}

function getResultBadge(result) {
  if (result.status) {
    const statusClass = result.status.replace('-', '');
    return `<span class="result-badge ${statusClass}">${result.status}</span>`;
  }
  if (result.grade) {
    return `<span class="result-badge grade">${result.grade}</span>`;
  }
  return '';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function hideSearchResults() {
  const resultsContainer = document.getElementById('globalSearchResults');
  if (resultsContainer) {
    resultsContainer.classList.remove('active');
  }
}

function navigateToResult(category, id) {
  console.log('Navigating to:', category, id);
  
  // Navigate to appropriate page
  const pages = {
    submissions: 'submissions.html',
    feedback: 'feedback.html',
    groups: 'collaboration.html',
    assignments: 'collaboration.html',
    messages: 'chat.html'
  };
  
  const page = pages[category];
  if (page) {
    window.location.href = `${page}?id=${id}`;
  }
}

// Keyboard shortcut (Ctrl+K or Cmd+K)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
  initializeSearch();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    performSearch,
    buildSearchIndex,
    initializeSearch
  };
}
