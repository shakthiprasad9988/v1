// My Submissions JavaScript

// Sample data (in real app, fetch from API)
const submissionsData = [
  {
    id: 1,
    title: "Assignment 3 - Data Structures",
    course: "Data Structures",
    description: "Implementation of Binary Search Tree with all operations",
    status: "pending",
    submittedDate: "2025-10-23",
    files: [
      { name: "BST_Implementation.cpp", size: "15 KB", type: "cpp" },
      { name: "Report.pdf", size: "2.3 MB", type: "pdf" }
    ],
    feedback: null,
    grade: null
  },
  {
    id: 2,
    title: "Project Report - Web Development",
    course: "Web Development",
    description: "Full-stack e-commerce website with React and Node.js",
    status: "approved",
    submittedDate: "2025-10-20",
    files: [
      { name: "Project_Report.pdf", size: "5.8 MB", type: "pdf" },
      { name: "Source_Code.zip", size: "12 MB", type: "zip" }
    ],
    feedback: "Excellent work! Your implementation is clean and well-documented. The UI/UX is impressive.",
    grade: "A+",
    inlineComments: [
      { location: "Page 3, Section 2.1", text: "Great explanation of the architecture. Consider adding a diagram for visual clarity." },
      { location: "Code: app.js, Line 45", text: "Excellent error handling implementation!" },
      { location: "Page 7, Conclusion", text: "Well-written summary of the project outcomes." }
    ]
  },
  {
    id: 3,
    title: "Lab Exercise 5 - Database",
    course: "Database Systems",
    description: "SQL queries and database normalization exercises",
    status: "approved",
    submittedDate: "2025-10-18",
    files: [
      { name: "Lab5_Queries.sql", size: "8 KB", type: "sql" },
      { name: "ER_Diagram.png", size: "450 KB", type: "image" }
    ],
    feedback: "Good understanding of normalization concepts. Minor improvements needed in query optimization.",
    grade: "B+",
    inlineComments: [
      { location: "Query 3, Line 12", text: "Consider using an index here to improve performance." },
      { location: "ER Diagram", text: "The relationship cardinality is correct, but add more descriptive attribute names." }
    ]
  },
  {
    id: 4,
    title: "Research Paper - Machine Learning",
    course: "Machine Learning",
    description: "Analysis of CNN architectures for image classification",
    status: "under-review",
    submittedDate: "2025-10-22",
    files: [
      { name: "Research_Paper.pdf", size: "4.2 MB", type: "pdf" },
      { name: "Code_Notebook.ipynb", size: "1.5 MB", type: "code" }
    ],
    feedback: null,
    grade: null
  },
  {
    id: 5,
    title: "Assignment 2 - Algorithms",
    course: "Algorithm Design",
    description: "Dynamic programming solutions",
    status: "rejected",
    submittedDate: "2025-10-15",
    files: [
      { name: "DP_Solutions.py", size: "12 KB", type: "python" }
    ],
    feedback: "The solution doesn't meet the time complexity requirements. Please review the dynamic programming approach and resubmit.",
    grade: "F"
  }
];

let currentFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderSubmissions();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Search
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
      renderSubmissions();
    });
  }

  // Filter tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderSubmissions();
    });
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

// Render submissions
function renderSubmissions() {
  const container = document.getElementById('submissionsGrid');
  
  // Filter submissions
  let filtered = submissionsData.filter(sub => {
    const matchesFilter = currentFilter === 'all' || sub.status === currentFilter;
    const matchesSearch = sub.title.toLowerCase().includes(searchQuery) ||
                         sub.course.toLowerCase().includes(searchQuery) ||
                         sub.description.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Show empty state if no results
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-folder-open'></i>
        <h3>No Submissions Found</h3>
        <p>Try adjusting your filters or search query</p>
        <a href="upload.html" class="btn-primary btn-action">
          <i class='bx bx-upload'></i> Upload New Assignment
        </a>
      </div>
    `;
    return;
  }

  // Render submissions
  container.innerHTML = filtered.map(sub => createSubmissionCard(sub)).join('');
}

// Create submission card HTML
function createSubmissionCard(submission) {
  const statusClass = submission.status;
  const statusText = submission.status.replace('-', ' ').toUpperCase();
  
  const filesHTML = submission.files.map(file => `
    <div class="file-item">
      <i class='bx ${getFileIcon(file.type)} file-icon'></i>
      <div class="file-details">
        <h5>${file.name}</h5>
        <p>${file.size}</p>
      </div>
      <div class="file-actions">
        <button class="btn-icon" onclick="viewFile('${file.name}')" title="View">
          <i class='bx bx-show'></i>
        </button>
        <button class="btn-icon" onclick="downloadFile('${file.name}')" title="Download">
          <i class='bx bx-download'></i>
        </button>
      </div>
    </div>
  `).join('');

  const feedbackHTML = submission.feedback ? `
    <div class="feedback-section">
      <h4><i class='bx bx-message-square-detail'></i> Faculty Feedback</h4>
      <p>${submission.feedback}</p>
      ${submission.grade ? `<span class="grade-badge"><i class='bx bx-medal'></i> Grade: ${submission.grade}</span>` : ''}
    </div>
  ` : '';

  return `
    <div class="submission-card ${statusClass}">
      <div class="submission-header">
        <div class="submission-info">
          <h3>${submission.title}</h3>
          <div class="submission-meta">
            <span class="meta-item">
              <i class='bx bx-book'></i> ${submission.course}
            </span>
            <span class="meta-item">
              <i class='bx bx-calendar'></i> ${formatDate(submission.submittedDate)}
            </span>
            <span class="meta-item">
              <i class='bx bx-file'></i> ${submission.files.length} file(s)
            </span>
          </div>
        </div>
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>

      <div class="submission-body">
        <p class="submission-description">${submission.description}</p>
        
        <div class="files-list">
          ${filesHTML}
        </div>

        ${feedbackHTML}
      </div>

      <div class="submission-footer">
        <div class="submission-actions">
          ${submission.feedback ? `
            <button class="btn-action btn-primary" onclick="viewDetailedFeedback(${submission.id})">
              <i class='bx bx-message-square-detail'></i> View Feedback
            </button>
          ` : `
            <button class="btn-action btn-primary" onclick="viewDetails(${submission.id})">
              <i class='bx bx-show'></i> View Details
            </button>
          `}
          <button class="btn-action btn-secondary" onclick="shareSubmission(${submission.id})">
            <i class='bx bx-share-alt'></i> Share
          </button>
          ${submission.status === 'rejected' ? `
            <button class="btn-action btn-secondary" onclick="resubmit(${submission.id})">
              <i class='bx bx-refresh'></i> Resubmit
            </button>
          ` : ''}
          ${submission.status === 'pending' ? `
            <button class="btn-action btn-danger" onclick="deleteSubmission(${submission.id})">
              <i class='bx bx-trash'></i> Delete
            </button>
          ` : ''}
        </div>
        <span class="submission-date">Submitted ${getTimeAgo(submission.submittedDate)}</span>
      </div>
    </div>
  `;
}

// Helper functions
function getFileIcon(type) {
  const icons = {
    'pdf': 'bxs-file-pdf',
    'doc': 'bxs-file-doc',
    'docx': 'bxs-file-doc',
    'zip': 'bxs-file-archive',
    'image': 'bxs-file-image',
    'cpp': 'bxs-file-code',
    'python': 'bxs-file-code',
    'sql': 'bxs-data',
    'code': 'bxs-file-code'
  };
  return icons[type] || 'bxs-file';
}

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
function viewFile(filename) {
  console.log('Viewing file:', filename);
  const fileExt = filename.split('.').pop().toLowerCase();
  
  // Open file preview modal
  openFilePreview(filename, fileExt);
}

function downloadFile(filename) {
  console.log('Downloading file:', filename);
  // Simulate download
  const link = document.createElement('a');
  link.href = '#'; // In real app, this would be the actual file URL
  link.download = filename;
  link.click();
  
  showNotification('success', `Downloading ${filename}...`);
}

// File Preview Modal
function openFilePreview(filename, fileExt) {
  const modal = document.getElementById('filePreviewModal');
  const modalTitle = document.getElementById('previewFileName');
  const previewContent = document.getElementById('previewContent');
  
  modalTitle.textContent = filename;
  
  // Generate preview based on file type
  if (fileExt === 'pdf') {
    previewContent.innerHTML = `
      <div class="pdf-preview">
        <iframe src="about:blank" style="width: 100%; height: 600px; border: none; border-radius: 10px;"></iframe>
        <p style="text-align: center; margin-top: 15px; color: var(--gray);">
          <i class='bx bx-info-circle'></i> PDF preview would load here in production
        </p>
      </div>
    `;
  } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt)) {
    previewContent.innerHTML = `
      <div class="image-preview">
        <img src="https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(filename)}" 
             alt="${filename}" 
             style="width: 100%; height: auto; border-radius: 10px;">
      </div>
    `;
  } else if (['txt', 'md', 'js', 'py', 'cpp', 'java', 'sql'].includes(fileExt)) {
    previewContent.innerHTML = `
      <div class="code-preview">
        <pre style="background: #f5f5f5; padding: 20px; border-radius: 10px; overflow-x: auto; max-height: 600px;">
<code>// ${filename}
// Code preview would load here in production

function example() {
  console.log("File content preview");
  return true;
}</code></pre>
      </div>
    `;
  } else {
    previewContent.innerHTML = `
      <div class="no-preview">
        <i class='bx bx-file' style="font-size: 80px; color: var(--gray); opacity: 0.3;"></i>
        <h3 style="margin-top: 20px; color: var(--dark);">Preview not available</h3>
        <p style="color: var(--gray); margin-top: 10px;">This file type cannot be previewed</p>
        <button class="btn btn-primary" onclick="downloadFile('${filename}')" style="margin-top: 20px;">
          <i class='bx bx-download'></i> Download File
        </button>
      </div>
    `;
  }
  
  modal.classList.add('active');
}

function closeFilePreview() {
  document.getElementById('filePreviewModal').classList.remove('active');
}

// File Sharing
function shareSubmission(submissionId) {
  const submission = submissionsData.find(s => s.id === submissionId);
  if (!submission) return;
  
  const modal = document.getElementById('shareModal');
  document.getElementById('shareSubmissionTitle').textContent = submission.title;
  
  // Generate shareable link
  const shareLink = `${window.location.origin}/shared/${submissionId}`;
  document.getElementById('shareLinkInput').value = shareLink;
  
  modal.classList.add('active');
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('active');
}

function copyShareLink() {
  const input = document.getElementById('shareLinkInput');
  input.select();
  document.execCommand('copy');
  showNotification('success', 'Link copied to clipboard!');
}

function shareViaEmail() {
  const link = document.getElementById('shareLinkInput').value;
  const subject = encodeURIComponent('Shared Submission');
  const body = encodeURIComponent(`Check out my submission: ${link}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
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

function viewDetails(id) {
  console.log('Viewing details for submission:', id);
  alert(`Opening detailed view for submission ${id}...`);
  // In real app, open modal or navigate to details page
}

function resubmit(id) {
  console.log('Resubmitting:', id);
  if (confirm('Are you sure you want to resubmit this assignment?')) {
    alert('Redirecting to upload page...');
    // In real app, navigate to upload page with pre-filled data
    window.location.href = 'upload.html';
  }
}

function deleteSubmission(id) {
  console.log('Deleting submission:', id);
  if (confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
    alert('Submission deleted successfully!');
    // In real app, call API to delete and refresh list
    renderSubmissions();
  }
}


// Grading & Feedback Features

// View detailed feedback with rubric
function viewDetailedFeedback(submissionId) {
  const submission = submissionsData.find(s => s.id === submissionId);
  if (!submission) return;
  
  const modal = document.getElementById('feedbackModal');
  
  // Generate rubric if graded
  let rubricHTML = '';
  if (submission.grade) {
    const rubric = generateRubric(submission.grade);
    rubricHTML = `
      <div class="rubric-section">
        <h4><i class='bx bx-list-check'></i> Grading Rubric</h4>
        <div class="rubric-items">
          ${rubric.map(item => `
            <div class="rubric-item">
              <div class="rubric-criteria">
                <strong>${item.criteria}</strong>
                <p>${item.description}</p>
              </div>
              <div class="rubric-score">
                <span class="score">${item.score}/${item.maxScore}</span>
                <div class="score-bar">
                  <div class="score-fill" style="width: ${(item.score/item.maxScore)*100}%"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="total-score">
          <strong>Total Score:</strong>
          <span class="grade-display">${submission.grade}</span>
        </div>
      </div>
    `;
  }
  
  // Inline feedback with comments
  const inlineFeedbackHTML = submission.feedback ? `
    <div class="inline-feedback-section">
      <h4><i class='bx bx-message-square-detail'></i> Faculty Feedback</h4>
      <div class="feedback-content">
        <p>${submission.feedback}</p>
        ${submission.inlineComments ? `
          <div class="inline-comments">
            <h5>Inline Comments:</h5>
            ${submission.inlineComments.map(comment => `
              <div class="inline-comment">
                <div class="comment-location">
                  <i class='bx bx-map-pin'></i>
                  <span>${comment.location}</span>
                </div>
                <p>${comment.text}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  ` : '<p style="color: var(--gray); text-align: center; padding: 20px;">No feedback available yet</p>';
  
  // Feedback history
  const feedbackHistory = getFeedbackHistory(submissionId);
  const historyHTML = feedbackHistory.length > 0 ? `
    <div class="feedback-history-section">
      <h4><i class='bx bx-history'></i> Feedback History</h4>
      <div class="history-timeline">
        ${feedbackHistory.map(item => `
          <div class="history-item">
            <div class="history-date">${item.date}</div>
            <div class="history-content">
              <strong>${item.author}</strong>
              <p>${item.comment}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';
  
  document.getElementById('feedbackModalBody').innerHTML = `
    <h3 style="font-size: 18px; margin-bottom: 20px; color: var(--dark);">${submission.title}</h3>
    ${inlineFeedbackHTML}
    ${rubricHTML}
    ${historyHTML}
    <div class="feedback-actions">
      ${submission.status === 'approved' || submission.status === 'rejected' ? `
        <button class="btn btn-secondary" onclick="openGradeAppeal(${submissionId})">
          <i class='bx bx-message-error'></i> Request Grade Appeal
        </button>
      ` : ''}
      <button class="btn btn-primary" onclick="exportFeedback(${submissionId})">
        <i class='bx bx-download'></i> Export as PDF
      </button>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeFeedbackModal() {
  document.getElementById('feedbackModal').classList.remove('active');
}

// Generate rubric based on grade
function generateRubric(grade) {
  const baseRubric = [
    { criteria: 'Code Quality', description: 'Clean, readable, and well-structured code', maxScore: 25 },
    { criteria: 'Functionality', description: 'All requirements met and working correctly', maxScore: 30 },
    { criteria: 'Documentation', description: 'Clear comments and documentation', maxScore: 20 },
    { criteria: 'Testing', description: 'Adequate test coverage and edge cases', maxScore: 15 },
    { criteria: 'Presentation', description: 'Professional formatting and organization', maxScore: 10 }
  ];
  
  // Calculate scores based on grade
  const gradeMultipliers = {
    'A+': 0.98, 'A': 0.92, 'A-': 0.88,
    'B+': 0.85, 'B': 0.80, 'B-': 0.75,
    'C+': 0.72, 'C': 0.68, 'C-': 0.65,
    'D': 0.60, 'F': 0.40
  };
  
  const multiplier = gradeMultipliers[grade] || 0.85;
  
  return baseRubric.map(item => ({
    ...item,
    score: Math.round(item.maxScore * multiplier)
  }));
}

// Get feedback history
function getFeedbackHistory(submissionId) {
  // In real app, fetch from backend
  const histories = {
    2: [
      { date: 'Oct 20, 2025 - 3:45 PM', author: 'Prof. Smith', comment: 'Excellent work! Your implementation is clean and well-documented.' },
      { date: 'Oct 20, 2025 - 4:15 PM', author: 'Prof. Smith', comment: 'Added final grade: A+' }
    ],
    3: [
      { date: 'Oct 18, 2025 - 2:30 PM', author: 'Prof. Johnson', comment: 'Good understanding of normalization concepts.' },
      { date: 'Oct 18, 2025 - 2:45 PM', author: 'Prof. Johnson', comment: 'Minor improvements needed in query optimization.' }
    ],
    5: [
      { date: 'Oct 15, 2025 - 10:30 AM', author: 'Prof. Davis', comment: 'Initial review: Time complexity issues identified.' },
      { date: 'Oct 15, 2025 - 11:00 AM', author: 'Prof. Davis', comment: 'Grade assigned: F. Please review dynamic programming concepts.' }
    ]
  };
  
  return histories[submissionId] || [];
}

// Grade Appeal
function openGradeAppeal(submissionId) {
  closeFeedbackModal();
  
  const submission = submissionsData.find(s => s.id === submissionId);
  if (!submission) return;
  
  const modal = document.getElementById('appealModal');
  document.getElementById('appealSubmissionTitle').textContent = submission.title;
  document.getElementById('appealCurrentGrade').textContent = submission.grade || 'N/A';
  
  // Character counter
  const textarea = document.getElementById('appealExplanation');
  const charCount = document.getElementById('appealCharCount');
  
  textarea.oninput = function() {
    const length = this.value.length;
    charCount.textContent = `${length} / 50 characters`;
    charCount.style.color = length >= 50 ? 'var(--success-color)' : 'var(--gray)';
  };
  
  modal.classList.add('active');
}

function closeAppealModal() {
  document.getElementById('appealModal').classList.remove('active');
}

function submitAppeal() {
  const reason = document.getElementById('appealReason').value.trim();
  const explanation = document.getElementById('appealExplanation').value.trim();
  
  if (!reason) {
    showNotification('info', 'Please select a reason for your appeal');
    return;
  }
  
  if (explanation.length < 50) {
    showNotification('info', 'Please provide at least 50 characters in your explanation');
    return;
  }
  
  // In real app, send to backend
  console.log('Appeal submitted:', { reason, explanation });
  
  showNotification('success', 'Grade appeal submitted successfully! Faculty will review your request.');
  
  closeAppealModal();
  document.getElementById('appealReason').value = '';
  document.getElementById('appealExplanation').value = '';
  document.getElementById('appealCharCount').textContent = '0 / 50 characters';
}

// Export feedback as PDF
function exportFeedback(submissionId) {
  const submission = submissionsData.find(s => s.id === submissionId);
  if (!submission) return;
  
  showNotification('info', 'Generating PDF... This feature will export your feedback with rubric details.');
  
  // In real app, generate actual PDF
  setTimeout(() => {
    showNotification('success', `Feedback for "${submission.title}" exported successfully!`);
  }, 1500);
}

// Open Feedback History Modal
function openFeedbackHistory() {
  const modal = document.getElementById('feedbackHistoryModal');
  loadFeedbackHistory();
  modal.classList.add('active');
}

function closeFeedbackHistoryModal() {
  document.getElementById('feedbackHistoryModal').classList.remove('active');
}

function loadFeedbackHistory() {
  const historyList = document.getElementById('feedbackHistoryList');
  
  // Get all submissions with feedback
  const feedbackItems = submissionsData.filter(s => s.feedback).map(submission => {
    return {
      id: submission.id,
      title: submission.title,
      course: submission.course,
      date: submission.submittedDate,
      grade: submission.grade,
      feedback: submission.feedback,
      status: submission.status
    };
  });
  
  if (feedbackItems.length === 0) {
    historyList.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-message-square-x'></i>
        <h3>No Feedback History</h3>
        <p>You haven't received any feedback yet</p>
      </div>
    `;
    return;
  }
  
  historyList.innerHTML = feedbackItems.map(item => `
    <div class="history-card">
      <div class="history-card-header">
        <div>
          <h4>${item.title}</h4>
          <p class="history-meta">
            <i class='bx bx-book'></i> ${item.course} • 
            <i class='bx bx-calendar'></i> ${formatDate(item.date)}
          </p>
        </div>
        <span class="grade-badge">${item.grade}</span>
      </div>
      <div class="history-card-body">
        <p>${item.feedback}</p>
      </div>
      <div class="history-card-footer">
        <button class="btn-small btn-primary" onclick="viewDetailedFeedback(${item.id})">
          <i class='bx bx-show'></i> View Details
        </button>
      </div>
    </div>
  `).join('');
}
