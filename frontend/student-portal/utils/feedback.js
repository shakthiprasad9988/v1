// Feedback & Grades JavaScript

// Sample feedback data (in real app, fetch from API)
const feedbackData = [
  {
    id: 2,
    title: "Project Report - Web Development",
    course: "Web Development",
    submittedDate: "2025-10-20",
    feedback: "Excellent work! Your implementation is clean and well-documented. The UI/UX is impressive.",
    grade: "A+",
    gradeCategory: "a",
    rubric: [
      { criteria: 'Code Quality', score: 25, maxScore: 25 },
      { criteria: 'Functionality', score: 29, maxScore: 30 },
      { criteria: 'Documentation', score: 20, maxScore: 20 },
      { criteria: 'Testing', score: 15, maxScore: 15 },
      { criteria: 'Presentation', score: 10, maxScore: 10 }
    ],
    inlineComments: [
      { location: "Page 3, Section 2.1", text: "Great explanation of the architecture. Consider adding a diagram for visual clarity." },
      { location: "Code: app.js, Line 45", text: "Excellent error handling implementation!" },
      { location: "Page 7, Conclusion", text: "Well-written summary of the project outcomes." }
    ],
    hasInlineComments: true
  },
  {
    id: 3,
    title: "Lab Exercise 5 - Database",
    course: "Database Systems",
    submittedDate: "2025-10-18",
    feedback: "Good understanding of normalization concepts. Minor improvements needed in query optimization.",
    grade: "B+",
    gradeCategory: "b",
    rubric: [
      { criteria: 'Code Quality', score: 21, maxScore: 25 },
      { criteria: 'Functionality', score: 26, maxScore: 30 },
      { criteria: 'Documentation', score: 17, maxScore: 20 },
      { criteria: 'Testing', score: 13, maxScore: 15 },
      { criteria: 'Presentation', score: 9, maxScore: 10 }
    ],
    inlineComments: [
      { location: "Query 3, Line 12", text: "Consider using an index here to improve performance." },
      { location: "ER Diagram", text: "The relationship cardinality is correct, but add more descriptive attribute names." }
    ],
    hasInlineComments: true
  },
  {
    id: 5,
    title: "Assignment 2 - Algorithms",
    course: "Algorithm Design",
    submittedDate: "2025-10-15",
    feedback: "The solution doesn't meet the time complexity requirements. Please review the dynamic programming approach and resubmit.",
    grade: "F",
    gradeCategory: "f",
    rubric: [
      { criteria: 'Code Quality', score: 10, maxScore: 25 },
      { criteria: 'Functionality', score: 12, maxScore: 30 },
      { criteria: 'Documentation', score: 8, maxScore: 20 },
      { criteria: 'Testing', score: 6, maxScore: 15 },
      { criteria: 'Presentation', score: 4, maxScore: 10 }
    ],
    inlineComments: [
      { location: "Line 23-45", text: "This approach has O(n²) complexity. Dynamic programming should achieve O(n)." },
      { location: "Function: solve()", text: "Missing memoization - this causes redundant calculations." }
    ],
    hasInlineComments: true
  }
];

let currentFilters = {
  course: 'all',
  grade: 'all',
  date: 'all',
  type: 'all'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackList();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Filter listeners
  document.getElementById('filterCourse').addEventListener('change', (e) => {
    currentFilters.course = e.target.value;
    renderFeedbackList();
  });

  document.getElementById('filterGrade').addEventListener('change', (e) => {
    currentFilters.grade = e.target.value;
    renderFeedbackList();
  });

  document.getElementById('filterDate').addEventListener('change', (e) => {
    currentFilters.date = e.target.value;
    renderFeedbackList();
  });

  document.getElementById('filterType').addEventListener('change', (e) => {
    currentFilters.type = e.target.value;
    renderFeedbackList();
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
}

// Render feedback list
function renderFeedbackList() {
  const container = document.getElementById('feedbackList');
  
  // Filter feedback
  let filtered = feedbackData.filter(item => {
    // Course filter
    if (currentFilters.course !== 'all') {
      const courseMatch = item.course.toLowerCase().replace(/\s+/g, '-').includes(currentFilters.course);
      if (!courseMatch) return false;
    }

    // Grade filter
    if (currentFilters.grade !== 'all') {
      if (currentFilters.grade === 'a' && !item.grade.startsWith('A')) return false;
      if (currentFilters.grade === 'b' && !item.grade.startsWith('B')) return false;
      if (currentFilters.grade === 'c' && !item.grade.startsWith('C')) return false;
      if (currentFilters.grade === 'below' && (item.grade.startsWith('A') || item.grade.startsWith('B') || item.grade.startsWith('C'))) return false;
    }

    // Date filter
    if (currentFilters.date !== 'all') {
      const submittedDate = new Date(item.submittedDate);
      const now = new Date();
      const diffDays = Math.floor((now - submittedDate) / (1000 * 60 * 60 * 24));
      
      if (currentFilters.date === 'week' && diffDays > 7) return false;
      if (currentFilters.date === 'month' && diffDays > 30) return false;
      if (currentFilters.date === 'semester' && diffDays > 120) return false;
    }

    // Type filter
    if (currentFilters.type !== 'all') {
      if (currentFilters.type === 'graded' && !item.grade) return false;
      if (currentFilters.type === 'comments' && !item.feedback) return false;
      if (currentFilters.type === 'inline' && !item.hasInlineComments) return false;
    }

    return true;
  });

  // Show empty state if no results
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-message-square-x'></i>
        <h3>No Feedback Found</h3>
        <p>Try adjusting your filters to see more results</p>
      </div>
    `;
    return;
  }

  // Render feedback cards
  container.innerHTML = filtered.map(item => createFeedbackCard(item)).join('');
}

// Create feedback card HTML
function createFeedbackCard(item) {
  const rubricPreview = item.rubric ? `
    <div class="rubric-preview">
      <h4><i class='bx bx-list-check'></i> Rubric Breakdown</h4>
      <div class="rubric-items-preview">
        ${item.rubric.map(r => `
          <div class="rubric-item-preview">
            <strong>${r.criteria}</strong>
            <span>${r.score}/${r.maxScore}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const inlineCommentsPreview = item.inlineComments && item.inlineComments.length > 0 ? `
    <div class="inline-comments-preview">
      <h4><i class='bx bx-map-pin'></i> Inline Comments (${item.inlineComments.length})</h4>
      ${item.inlineComments.slice(0, 2).map(comment => `
        <div class="comment-preview">
          <div class="comment-location">
            <i class='bx bx-map-pin'></i>
            ${comment.location}
          </div>
          <p class="comment-text">${comment.text}</p>
        </div>
      `).join('')}
      ${item.inlineComments.length > 2 ? `<p style="font-size: 12px; color: var(--gray); margin-top: 8px;">+${item.inlineComments.length - 2} more comments</p>` : ''}
    </div>
  ` : '';

  return `
    <div class="feedback-card grade-${item.gradeCategory}">
      <div class="feedback-header">
        <div class="feedback-title">
          <h3>${item.title}</h3>
          <div class="feedback-meta">
            <span class="meta-item">
              <i class='bx bx-book'></i> ${item.course}
            </span>
            <span class="meta-item">
              <i class='bx bx-calendar'></i> ${formatDate(item.submittedDate)}
            </span>
            ${item.hasInlineComments ? `
              <span class="meta-item">
                <i class='bx bx-message-dots'></i> ${item.inlineComments.length} inline comments
              </span>
            ` : ''}
          </div>
        </div>
        <div class="grade-badge">${item.grade}</div>
      </div>

      <div class="feedback-body">
        <p class="feedback-text">${item.feedback}</p>
        ${rubricPreview}
        ${inlineCommentsPreview}
      </div>

      <div class="feedback-footer">
        <div class="feedback-actions">
          <button class="btn-action btn-primary" onclick="viewFullFeedback(${item.id})">
            <i class='bx bx-show'></i> View Full Details
          </button>
          <button class="btn-action btn-secondary" onclick="exportFeedbackPDF(${item.id})">
            <i class='bx bx-download'></i> Export PDF
          </button>
          <button class="btn-action btn-secondary" onclick="requestAppeal(${item.id})">
            <i class='bx bx-message-error'></i> Appeal Grade
          </button>
        </div>
        <span class="feedback-date">Received ${getTimeAgo(item.submittedDate)}</span>
      </div>
    </div>
  `;
}

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

// Action functions
function viewFullFeedback(id) {
  console.log('Viewing full feedback for:', id);
  // In real app, navigate to detailed feedback view or open modal
  window.location.href = `submissions.html?feedback=${id}`;
}

function exportFeedbackPDF(id) {
  const item = feedbackData.find(f => f.id === id);
  if (!item) return;
  
  showNotification('info', `Generating PDF for "${item.title}"...`);
  
  // In real app, generate actual PDF
  setTimeout(() => {
    showNotification('success', 'Feedback exported successfully!');
  }, 1500);
}

function requestAppeal(id) {
  const item = feedbackData.find(f => f.id === id);
  if (!item) return;
  
  console.log('Requesting appeal for:', id);
  // In real app, open appeal modal or navigate to appeal page
  window.location.href = `submissions.html?appeal=${id}`;
}

// Notification system
function showNotification(type, message) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-info-circle'}'></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
