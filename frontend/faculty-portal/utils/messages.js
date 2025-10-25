// Messages Page Functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeMessages();
    setupConversations();
    setupFilters();
    setupSearch();
    setupChatInput();
    setupTopBarButtons();
});

// Initialize Messages
function initializeMessages() {
    console.log('✅ Messages page initialized');
}

// Setup Conversations
function setupConversations() {
    const conversations = document.querySelectorAll('.conversation-item');
    
    conversations.forEach(conv => {
        conv.addEventListener('click', () => {
            // Remove active from all
            conversations.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            conv.classList.add('active');
            
            // Load conversation
            const conversationId = conv.dataset.id;
            loadConversation(conversationId);
        });
    });
}

// Load Conversation
function loadConversation(id) {
    console.log(`💬 Loading conversation: ${id}`);
    // In production, fetch messages for this conversation
}

// Setup Filters
function setupFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filter = tab.dataset.filter;
            filterMessages(filter);
        });
    });
}

// Filter Messages
function filterMessages(filter) {
    console.log(`🔍 Filtering messages by: ${filter}`);
    const conversations = document.querySelectorAll('.conversation-item');
    
    conversations.forEach(conv => {
        if (filter === 'all') {
            conv.style.display = 'flex';
        } else if (filter === 'unread') {
            conv.style.display = conv.classList.contains('unread') ? 'flex' : 'none';
        } else {
            // Handle other filters
            conv.style.display = 'flex';
        }
    });
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('messageSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            searchMessages(query);
        });
    }
}

// Search Messages
function searchMessages(query) {
    const conversations = document.querySelectorAll('.conversation-item');
    
    conversations.forEach(conv => {
        const name = conv.querySelector('h4').textContent.toLowerCase();
        const preview = conv.querySelector('.message-preview').textContent.toLowerCase();
        
        if (name.includes(query) || preview.includes(query)) {
            conv.style.display = 'flex';
        } else {
            conv.style.display = 'none';
        }
    });
}

// Setup Chat Input
function setupChatInput() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendMessage();
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Send Message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    console.log(`📤 Sending message: ${message}`);
    
    // Add message to chat
    addMessageToChat(message, 'sent');
    
    // Clear input
    messageInput.value = '';
    
    // Simulate response
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addMessageToChat('Thank you for your response!', 'received');
        }, 2000);
    }, 1000);
}

// Add Message to Chat
function addMessageToChat(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const messageHTML = `
        <div class="message ${type}">
            ${type === 'received' ? '<img src="https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff" alt="Student">' : ''}
            <div class="message-content">
                <div class="message-bubble">
                    <p>${text}</p>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        </div>
    `;
    
    // Remove typing indicator if exists
    const typingIndicator = chatMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show Typing Indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingHTML = `
        <div class="typing-indicator">
            <img src="https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff" alt="Student">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', typingHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide Typing Indicator
function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Setup Top Bar Buttons
function setupTopBarButtons() {
    const newMessageBtn = document.getElementById('newMessageBtn');
    const notificationBtn = document.querySelector('.notification-btn');
    const profileMenu = document.querySelector('.profile-menu');
    const closeInfoPanel = document.getElementById('closeInfoPanel');
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', () => {
            newMessage();
        });
    }
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            console.log('🔔 Opening notifications');
            showNotification('You have 5 new notifications', 'info');
        });
    }
    
    if (profileMenu) {
        profileMenu.addEventListener('click', () => {
            console.log('👤 Opening profile menu');
        });
    }
    
    if (closeInfoPanel) {
        closeInfoPanel.addEventListener('click', () => {
            const infoPanel = document.getElementById('infoPanel');
            infoPanel.style.display = 'none';
        });
    }
    
    // Setup all chat action buttons
    setupChatActions();
    
    // Setup info panel action buttons
    setupInfoPanelActions();
    
    // Setup attachment and emoji buttons
    setupInputActions();
}

// Setup Chat Actions
function setupChatActions() {
    const chatActions = document.querySelectorAll('.chat-actions .btn-icon');
    
    chatActions.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('title');
            
            if (title === 'Star conversation') {
                starConversation();
            } else if (title === 'Archive') {
                archiveConversation();
            } else if (title === 'More options') {
                showChatOptions();
            }
        });
    });
}

// Star Conversation
function starConversation() {
    console.log('⭐ Starring conversation');
    showNotification('Conversation starred', 'success');
}

// Archive Conversation
function archiveConversation() {
    console.log('📦 Archiving conversation');
    showNotification('Conversation archived', 'success');
}

// Show Chat Options
function showChatOptions() {
    console.log('⚙️ Showing chat options');
    showNotification('Chat options menu', 'info');
}

// Setup Info Panel Actions
function setupInfoPanelActions() {
    const actionBtns = document.querySelectorAll('.info-panel .action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim();
            
            if (text.includes('View Profile')) {
                viewStudentProfile();
            } else if (text.includes('View Submissions')) {
                viewStudentSubmissions();
            } else if (text.includes('View Grades')) {
                viewStudentGrades();
            }
        });
    });
}

// View Student Profile
function viewStudentProfile() {
    console.log('👤 Viewing student profile');
    showNotification('Opening student profile...', 'info');
    setTimeout(() => {
        window.location.href = 'students.html';
    }, 500);
}

// View Student Submissions
function viewStudentSubmissions() {
    console.log('📂 Viewing student submissions');
    showNotification('Loading submissions...', 'info');
    setTimeout(() => {
        window.location.href = 'submissions.html';
    }, 500);
}

// View Student Grades
function viewStudentGrades() {
    console.log('📊 Viewing student grades');
    showNotification('Loading grades...', 'info');
    setTimeout(() => {
        window.location.href = 'grading.html';
    }, 500);
}

// Setup Input Actions
function setupInputActions() {
    const attachBtn = document.querySelector('.chat-input .btn-icon[title="Attach file"]');
    const emojiBtn = document.querySelector('.chat-input .btn-icon[title="Emoji"]');
    
    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            attachFile();
        });
    }
    
    if (emojiBtn) {
        emojiBtn.addEventListener('click', () => {
            showEmojiPicker();
        });
    }
}

// Attach File
function attachFile() {
    console.log('📎 Attaching file');
    showNotification('File attachment feature', 'info');
    // In production, open file picker
}

// Show Emoji Picker
function showEmojiPicker() {
    console.log('😊 Showing emoji picker');
    showNotification('Emoji picker', 'info');
    // In production, show emoji picker
}

// New Message
function newMessage() {
    console.log('✉️ Creating new message');
    showNotification('Opening new message composer', 'info');
    // In production, open modal to select recipient and compose message
}

// Show Notification
function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class='bx ${getToastIcon(type)}'></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Get Toast Icon
function getToastIcon(type) {
    const icons = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        warning: 'bx-error',
        info: 'bx-info-circle'
    };
    return icons[type] || icons.info;
}

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}
