// Collaboration JavaScript

// Sample data
const studyGroups = [
  {
    id: 1,
    name: "Data Structures Study Group",
    description: "Weekly study sessions for DS assignments and exam prep",
    course: "Data Structures",
    members: [
      { id: 1, name: "Student User", avatar: "https://ui-avatars.com/api/?name=Student+User&background=667eea&color=fff" },
      { id: 2, name: "Alice Johnson", avatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=4caf50&color=fff" },
      { id: 3, name: "Bob Smith", avatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=ff9800&color=fff" },
      { id: 4, name: "Carol White", avatar: "https://ui-avatars.com/api/?name=Carol+White&background=2196f3&color=fff" }
    ],
    createdDate: "2025-10-15"
  },
  {
    id: 2,
    name: "Web Dev Project Team",
    description: "Collaborative team for final web development project",
    course: "Web Development",
    members: [
      { id: 1, name: "Student User", avatar: "https://ui-avatars.com/api/?name=Student+User&background=667eea&color=fff" },
      { id: 5, name: "David Lee", avatar: "https://ui-avatars.com/api/?name=David+Lee&background=e91e63&color=fff" },
      { id: 6, name: "Emma Davis", avatar: "https://ui-avatars.com/api/?name=Emma+Davis&background=9c27b0&color=fff" }
    ],
    createdDate: "2025-10-10"
  }
];

const groupAssignments = [
  {
    id: 1,
    title: "E-Commerce Website Project",
    description: "Build a full-stack e-commerce platform with React and Node.js",
    course: "Web Development",
    group: "Web Dev Project Team",
    status: "active",
    progress: 65,
    dueDate: "2025-11-15",
    members: [
      { id: 1, name: "Student User" },
      { id: 5, name: "David Lee" },
      { id: 6, name: "Emma Davis" }
    ]
  },
  {
    id: 2,
    title: "Binary Search Tree Implementation",
    description: "Implement BST with all operations and write comprehensive tests",
    course: "Data Structures",
    group: "Data Structures Study Group",
    status: "completed",
    progress: 100,
    dueDate: "2025-10-20",
    members: [
      { id: 1, name: "Student User" },
      { id: 2, name: "Alice Johnson" },
      { id: 3, name: "Bob Smith" }
    ]
  }
];

const peerReviews = [
  {
    id: 1,
    title: "Review: Machine Learning Model Analysis",
    author: { name: "Alice Johnson", avatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=4caf50&color=fff" },
    course: "Machine Learning",
    description: "Review the CNN implementation and provide feedback on model architecture",
    dueDate: "2025-10-28",
    status: "pending"
  },
  {
    id: 2,
    title: "Review: Database Normalization Exercise",
    author: { name: "Bob Smith", avatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=ff9800&color=fff" },
    course: "Database Systems",
    description: "Evaluate the ER diagram and normalization approach",
    dueDate: "2025-10-30",
    status: "pending"
  },
  {
    id: 3,
    title: "Review: Algorithm Complexity Analysis",
    author: { name: "Carol White", avatar: "https://ui-avatars.com/api/?name=Carol+White&background=2196f3&color=fff" },
    course: "Algorithm Design",
    description: "Review time complexity analysis and optimization suggestions",
    dueDate: "2025-10-25",
    status: "completed"
  }
];

const notifications = [
  {
    id: 1,
    type: "mention",
    title: "@mention in Group Chat",
    text: "Alice Johnson mentioned you in Data Structures Study Group",
    time: "5 minutes ago",
    unread: true
  },
  {
    id: 2,
    type: "review",
    title: "New Peer Review Assigned",
    text: "You have been assigned to review Bob Smith's submission",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    type: "group",
    title: "Group Assignment Update",
    text: "David Lee updated the E-Commerce Website Project",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 4,
    type: "mention",
    title: "Comment on Your Submission",
    text: "Carol White commented on your Database assignment",
    time: "3 hours ago",
    unread: false
  },
  {
    id: 5,
    type: "group",
    title: "New Group Member",
    text: "Emma Davis joined Web Dev Project Team",
    time: "1 day ago",
    unread: false
  }
];

const availableUsers = [
  { id: 2, name: "Alice Johnson", username: "@alice.j", avatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=4caf50&color=fff" },
  { id: 3, name: "Bob Smith", username: "@bob.smith", avatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=ff9800&color=fff" },
  { id: 4, name: "Carol White", username: "@carol.w", avatar: "https://ui-avatars.com/api/?name=Carol+White&background=2196f3&color=fff" },
  { id: 5, name: "David Lee", username: "@david.lee", avatar: "https://ui-avatars.com/api/?name=David+Lee&background=e91e63&color=fff" },
  { id: 6, name: "Emma Davis", username: "@emma.d", avatar: "https://ui-avatars.com/api/?name=Emma+Davis&background=9c27b0&color=fff" }
];

let selectedMembers = [];
let currentTab = 'groups';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderStudyGroups();
  renderGroupAssignments();
  renderPeerReviews();
  renderNotifications();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Tab navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });

  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      filterGroupAssignments(filter);
    });
  });

  // Mention input
  const mentionInput = document.getElementById('groupMembers');
  if (mentionInput) {
    mentionInput.addEventListener('input', handleMentionInput);
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
}

// Switch tabs
function switchTab(tab) {
  currentTab = tab;
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tab) {
      btn.classList.add('active');
    }
  });
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`${tab}-tab`).classList.add('active');
}

// Render Study Groups
function renderStudyGroups() {
  const container = document.getElementById('studyGroupsList');
  
  if (studyGroups.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-group'></i>
        <h3>No Study Groups Yet</h3>
        <p>Create your first study group to collaborate with classmates</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = studyGroups.map(group => `
    <div class="group-card" onclick="viewGroupDetails(${group.id})">
      <div class="group-header">
        <div class="group-icon">
          <i class='bx bx-group'></i>
        </div>
        <button class="group-menu" onclick="event.stopPropagation(); showGroupMenu(${group.id})">
          <i class='bx bx-dots-vertical-rounded'></i>
        </button>
      </div>
      <div class="group-info">
        <h3>${group.name}</h3>
        <div class="group-meta">
          <span><i class='bx bx-book'></i> ${group.course}</span>
          <span><i class='bx bx-calendar'></i> ${formatDate(group.createdDate)}</span>
        </div>
        <p class="group-description">${group.description}</p>
      </div>
      <div class="group-members">
        <div class="members-avatars">
          ${group.members.slice(0, 4).map(member => `
            <img src="${member.avatar}" alt="${member.name}" class="member-avatar" title="${member.name}">
          `).join('')}
        </div>
        <span class="members-count">${group.members.length} members</span>
      </div>
    </div>
  `).join('');
}

// Render Group Assignments
function renderGroupAssignments(filter = 'all') {
  const container = document.getElementById('groupAssignmentsList');
  
  let filtered = groupAssignments;
  if (filter !== 'all') {
    filtered = groupAssignments.filter(a => a.status === filter);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-folder-open'></i>
        <h3>No Group Assignments</h3>
        <p>No assignments match the selected filter</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filtered.map(assignment => `
    <div class="assignment-card ${assignment.status}">
      <div class="assignment-header">
        <div class="assignment-title">
          <h3>${assignment.title}</h3>
          <div class="assignment-meta">
            <span><i class='bx bx-book'></i> ${assignment.course}</span>
            <span><i class='bx bx-group'></i> ${assignment.group}</span>
            <span><i class='bx bx-calendar'></i> Due ${formatDate(assignment.dueDate)}</span>
          </div>
        </div>
        <span class="status-badge ${assignment.status}">${assignment.status}</span>
      </div>
      <div class="assignment-body">
        <p class="assignment-description">${assignment.description}</p>
        <div class="assignment-progress">
          <div class="progress-label">
            <span>Progress</span>
            <strong>${assignment.progress}%</strong>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${assignment.progress}%"></div>
          </div>
        </div>
      </div>
      <div class="assignment-footer">
        <div class="members-avatars">
          ${assignment.members.slice(0, 3).map(member => `
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=667eea&color=fff" 
                 alt="${member.name}" class="member-avatar" title="${member.name}">
          `).join('')}
        </div>
        <div class="assignment-actions">
          <button class="btn btn-primary btn-small" onclick="viewAssignment(${assignment.id})">
            <i class='bx bx-show'></i> View Details
          </button>
          <button class="btn btn-secondary btn-small" onclick="addComment(${assignment.id})">
            <i class='bx bx-comment'></i> Comment
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter group assignments
function filterGroupAssignments(filter) {
  renderGroupAssignments(filter);
}

// Render Peer Reviews
function renderPeerReviews() {
  const container = document.getElementById('peerReviewList');
  
  if (peerReviews.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-edit'></i>
        <h3>No Peer Reviews</h3>
        <p>You don't have any peer reviews assigned</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = peerReviews.map(review => `
    <div class="review-card ${review.status}">
      <div class="review-header">
        <div class="review-info">
          <h3>${review.title}</h3>
          <div class="review-meta">
            <div class="review-author">
              <img src="${review.author.avatar}" alt="${review.author.name}" class="author-avatar">
              <span>${review.author.name}</span>
            </div>
            <span><i class='bx bx-book'></i> ${review.course}</span>
          </div>
        </div>
        <span class="status-badge ${review.status}">${review.status}</span>
      </div>
      <div class="review-body">
        <p class="review-description">${review.description}</p>
      </div>
      <div class="review-footer">
        <span class="review-deadline">
          <i class='bx bx-time'></i> Due ${formatDate(review.dueDate)}
        </span>
        <div class="assignment-actions">
          ${review.status === 'pending' ? `
            <button class="btn btn-primary btn-small" onclick="startReview(${review.id})">
              <i class='bx bx-edit'></i> Start Review
            </button>
          ` : `
            <button class="btn btn-secondary btn-small" onclick="viewReview(${review.id})">
              <i class='bx bx-show'></i> View Review
            </button>
          `}
        </div>
      </div>
    </div>
  `).join('');
}

// Render Notifications
function renderNotifications() {
  const container = document.getElementById('notificationsList');
  
  if (notifications.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class='bx bx-bell-off'></i>
        <h3>No Notifications</h3>
        <p>You're all caught up!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = notifications.map(notif => `
    <div class="notification-item ${notif.unread ? 'unread' : ''}" onclick="handleNotificationClick(${notif.id})">
      <div class="notification-header">
        <div class="notification-icon ${notif.type}">
          <i class='bx ${notif.type === 'mention' ? 'bx-at' : notif.type === 'review' ? 'bx-edit' : 'bx-group'}'></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">${notif.title}</div>
          <div class="notification-text">${notif.text}</div>
          <div class="notification-time">${notif.time}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Modal functions
function openCreateGroupModal() {
  document.getElementById('createGroupModal').classList.add('active');
  selectedMembers = [];
  document.getElementById('selectedMembers').innerHTML = '';
}

function closeCreateGroupModal() {
  document.getElementById('createGroupModal').classList.remove('active');
  document.getElementById('groupName').value = '';
  document.getElementById('groupDescription').value = '';
  document.getElementById('groupCourse').value = '';
  document.getElementById('groupMembers').value = '';
  selectedMembers = [];
}

function createGroup() {
  const name = document.getElementById('groupName').value.trim();
  const description = document.getElementById('groupDescription').value.trim();
  const course = document.getElementById('groupCourse').value;
  
  if (!name || !description || !course) {
    showNotification('info', 'Please fill in all required fields');
    return;
  }
  
  // In real app, send to backend
  console.log('Creating group:', { name, description, course, members: selectedMembers });
  
  showNotification('success', `Study group "${name}" created successfully!`);
  closeCreateGroupModal();
  
  // Add to groups list (in real app, refresh from backend)
  studyGroups.unshift({
    id: studyGroups.length + 1,
    name,
    description,
    course,
    members: [
      { id: 1, name: "Student User", avatar: "https://ui-avatars.com/api/?name=Student+User&background=667eea&color=fff" },
      ...selectedMembers
    ],
    createdDate: new Date().toISOString().split('T')[0]
  });
  
  renderStudyGroups();
}

// Mention input handler
function handleMentionInput(e) {
  const value = e.target.value;
  const lastChar = value[value.length - 1];
  const suggestions = document.getElementById('mentionSuggestions');
  
  if (lastChar === '@' || (value.includes('@') && !value.endsWith(' '))) {
    const query = value.split('@').pop().toLowerCase();
    const filtered = availableUsers.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.username.toLowerCase().includes(query)
    );
    
    if (filtered.length > 0) {
      suggestions.innerHTML = filtered.map(user => `
        <div class="mention-item" onclick="selectMention(${user.id})">
          <img src="${user.avatar}" alt="${user.name}" class="mention-avatar">
          <div class="mention-info">
            <div class="mention-name">${user.name}</div>
            <div class="mention-username">${user.username}</div>
          </div>
        </div>
      `).join('');
      suggestions.classList.add('active');
    } else {
      suggestions.classList.remove('active');
    }
  } else {
    suggestions.classList.remove('active');
  }
}

function selectMention(userId) {
  const user = availableUsers.find(u => u.id === userId);
  if (!user || selectedMembers.find(m => m.id === userId)) return;
  
  selectedMembers.push(user);
  
  const container = document.getElementById('selectedMembers');
  container.innerHTML = selectedMembers.map(member => `
    <div class="member-tag">
      <span>${member.name}</span>
      <button onclick="removeMember(${member.id})">
        <i class='bx bx-x'></i>
      </button>
    </div>
  `).join('');
  
  document.getElementById('groupMembers').value = '';
  document.getElementById('mentionSuggestions').classList.remove('active');
}

function removeMember(userId) {
  selectedMembers = selectedMembers.filter(m => m.id !== userId);
  const container = document.getElementById('selectedMembers');
  container.innerHTML = selectedMembers.map(member => `
    <div class="member-tag">
      <span>${member.name}</span>
      <button onclick="removeMember(${member.id})">
        <i class='bx bx-x'></i>
      </button>
    </div>
  `).join('');
}

// Action functions
function viewGroupDetails(groupId) {
  const group = studyGroups.find(g => g.id === groupId);
  if (!group) return;
  
  const modal = document.getElementById('groupDetailsModal');
  document.getElementById('groupDetailsTitle').innerHTML = `<i class='bx bx-group'></i> ${group.name}`;
  
  document.getElementById('groupDetailsBody').innerHTML = `
    <div class="group-details">
      <div class="detail-section">
        <h4>Course</h4>
        <p>${group.course}</p>
      </div>
      <div class="detail-section">
        <h4>Description</h4>
        <p>${group.description}</p>
      </div>
      <div class="detail-section">
        <h4>Members (${group.members.length})</h4>
        <div class="members-list">
          ${group.members.map(member => `
            <div class="member-item">
              <img src="${member.avatar}" alt="${member.name}">
              <span>${member.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="openGroupChat(${groupId})">
          <i class='bx bx-message-dots'></i> Open Chat
        </button>
        <button class="btn btn-secondary" onclick="inviteMembers(${groupId})">
          <i class='bx bx-user-plus'></i> Invite Members
        </button>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeGroupDetailsModal() {
  document.getElementById('groupDetailsModal').classList.remove('active');
}

function viewAssignment(id) {
  console.log('Viewing assignment:', id);
  showNotification('info', 'Opening assignment details...');
}

function addComment(id) {
  console.log('Adding comment to assignment:', id);
  showNotification('info', 'Comment feature coming soon!');
}

function startReview(id) {
  console.log('Starting review:', id);
  const review = peerReviews.find(r => r.id === id);
  if (!review) return;
  
  const modal = document.getElementById('peerReviewModal');
  document.getElementById('peerReviewBody').innerHTML = `
    <div class="review-form">
      <h3>${review.title}</h3>
      <p style="color: var(--gray); margin-bottom: 20px;">${review.description}</p>
      
      <div class="form-group">
        <label>Overall Rating</label>
        <div class="rating-stars">
          ${[1,2,3,4,5].map(star => `
            <i class='bx bx-star' onclick="setRating(${star})" style="font-size: 32px; color: #ffd700; cursor: pointer;"></i>
          `).join('')}
        </div>
      </div>
      
      <div class="form-group">
        <label>Strengths</label>
        <textarea class="form-control" rows="3" placeholder="What did the author do well?"></textarea>
      </div>
      
      <div class="form-group">
        <label>Areas for Improvement</label>
        <textarea class="form-control" rows="3" placeholder="What could be improved?"></textarea>
      </div>
      
      <div class="form-group">
        <label>Detailed Feedback</label>
        <textarea class="form-control" rows="5" placeholder="Provide detailed feedback..."></textarea>
      </div>
      
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="closePeerReviewModal()">Cancel</button>
        <button class="btn btn-primary" onclick="submitReview(${id})">
          <i class='bx bx-send'></i> Submit Review
        </button>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

function closePeerReviewModal() {
  document.getElementById('peerReviewModal').classList.remove('active');
}

function submitReview(id) {
  console.log('Submitting review:', id);
  showNotification('success', 'Peer review submitted successfully!');
  closePeerReviewModal();
  
  // Update review status
  const review = peerReviews.find(r => r.id === id);
  if (review) {
    review.status = 'completed';
    renderPeerReviews();
  }
}

function viewReview(id) {
  console.log('Viewing completed review:', id);
  showNotification('info', 'Opening review details...');
}

function openNotifications() {
  document.getElementById('notificationsPanel').classList.add('active');
}

function closeNotifications() {
  document.getElementById('notificationsPanel').classList.remove('active');
}

function handleNotificationClick(id) {
  console.log('Notification clicked:', id);
  const notif = notifications.find(n => n.id === id);
  if (notif) {
    notif.unread = false;
    renderNotifications();
  }
}

function showGroupMenu(id) {
  console.log('Show group menu:', id);
  showNotification('info', 'Group menu coming soon!');
}

function openGroupChat(id) {
  console.log('Opening group chat:', id);
  closeGroupDetailsModal();
  window.location.href = 'chat.html';
}

function inviteMembers(id) {
  console.log('Inviting members to group:', id);
  showNotification('info', 'Invite feature coming soon!');
}

function setRating(stars) {
  console.log('Rating set:', stars);
  const starElements = document.querySelectorAll('.rating-stars i');
  starElements.forEach((star, index) => {
    if (index < stars) {
      star.classList.remove('bx-star');
      star.classList.add('bxs-star');
    } else {
      star.classList.remove('bxs-star');
      star.classList.add('bx-star');
    }
  });
}

// Notification system
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
    border-left: 4px solid ${type === 'success' ? 'var(--success-color)' : 'var(--info-color)'};
  `;
  notification.innerHTML = `
    <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-info-circle'}' style="font-size: 24px; color: ${type === 'success' ? 'var(--success-color)' : 'var(--info-color)'}"></i>
    <span style="font-size: 14px; color: var(--dark);">${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3000);
}
