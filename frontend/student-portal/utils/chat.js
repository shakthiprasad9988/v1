// Chat Portal JavaScript with Local Storage

// Initialize
let currentUser = {
  id: 'user_' + Date.now(),
  name: 'Student User',
  avatar: 'https://ui-avatars.com/api/?name=Student+User&background=667eea&color=fff'
};

let currentChatId = null;
let chats = [];
let groups = [];

// Load data from localStorage
function loadFromStorage() {
  const storedChats = localStorage.getItem('chatPortal_chats');
  const storedGroups = localStorage.getItem('chatPortal_groups');
  
  if (storedChats) chats = JSON.parse(storedChats);
  if (storedGroups) groups = JSON.parse(storedGroups);
}

// Save to localStorage
function saveToStorage() {
  localStorage.setItem('chatPortal_chats', JSON.stringify(chats));
  localStorage.setItem('chatPortal_groups', JSON.stringify(groups));
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  renderChatList();
  setupEventListeners();
  
  // Add sample data if empty
  if (chats.length === 0 && groups.length === 0) {
    addSampleData();
  }
});

// Setup event listeners
function setupEventListeners() {
  // New chat button
  document.getElementById('newChatBtn').addEventListener('click', () => {
    document.getElementById('newChatModal').classList.add('active');
  });

  // Close modals
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('active');
    });
  });

  // Modal actions
  document.getElementById('createGroupBtn').addEventListener('click', showCreateGroupModal);
  document.getElementById('joinGroupBtn').addEventListener('click', showJoinGroupModal);
  document.getElementById('generateCodeBtn').addEventListener('click', generateInviteCode);
  document.getElementById('createGroupSubmit').addEventListener('click', createGroup);
  document.getElementById('joinGroupSubmit').addEventListener('click', joinGroup);

  // Send message
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Chat tabs
  document.querySelectorAll('.chat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderChatList();
    });
  });

  // Search
  document.getElementById('chatSearch').addEventListener('input', (e) => {
    renderChatList(e.target.value);
  });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
}

// Render chat list
function renderChatList(searchQuery = '') {
  const activeTab = document.querySelector('.chat-tab.active').dataset.tab;
  const chatList = document.getElementById('chatList');
  
  let items = activeTab === 'direct' ? chats : groups;
  
  // Filter by search
  if (searchQuery) {
    items = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  if (items.length === 0) {
    chatList.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--gray);">
        <i class='bx bx-message-x' style="font-size: 48px; opacity: 0.3;"></i>
        <p style="margin-top: 10px; font-size: 14px;">No ${activeTab} chats yet</p>
      </div>
    `;
    return;
  }
  
  chatList.innerHTML = items.map(item => {
    const lastMessage = item.messages[item.messages.length - 1];
    const unreadCount = item.messages.filter(m => !m.read && m.senderId !== currentUser.id).length;
    
    return `
      <div class="chat-item ${currentChatId === item.id ? 'active' : ''}" onclick="openChat('${item.id}', '${activeTab}')">
        <div class="chat-avatar">
          <img src="${item.avatar}" alt="${item.name}">
          ${item.online ? '<div class="online-status"></div>' : ''}
        </div>
        <div class="chat-info">
          <div class="chat-name">${item.name}</div>
          <div class="chat-last-message">${lastMessage ? lastMessage.text : 'No messages yet'}</div>
        </div>
        <div class="chat-meta">
          <div class="chat-time">${lastMessage ? formatTime(lastMessage.timestamp) : ''}</div>
          ${unreadCount > 0 ? `<div class="unread-badge">${unreadCount}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Open chat
function openChat(chatId, type) {
  currentChatId = chatId;
  const chat = type === 'direct' ? chats.find(c => c.id === chatId) : groups.find(g => g.id === chatId);
  
  if (!chat) return;
  
  // Mark messages as read
  chat.messages.forEach(m => m.read = true);
  saveToStorage();
  
  // Update UI
  renderChatList();
  renderChatHeader(chat, type);
  renderMessages(chat);
  
  document.getElementById('emptyChat').style.display = 'none';
  document.getElementById('activeChat').style.display = 'flex';
}

// Render chat header
function renderChatHeader(chat, type) {
  const header = document.getElementById('chatHeader');
  header.innerHTML = `
    <div class="chat-header-info">
      <div class="chat-avatar">
        <img src="${chat.avatar}" alt="${chat.name}">
        ${chat.online ? '<div class="online-status"></div>' : ''}
      </div>
      <div class="chat-header-details">
        <h3>${chat.name}</h3>
        <p>${chat.online ? 'Online' : 'Offline'}</p>
      </div>
    </div>
    <div class="chat-actions">
      ${type === 'group' ? `<button class="action-btn" onclick="showInviteCode('${chat.id}')" title="Invite Code"><i class='bx bx-link'></i></button>` : ''}
      <button class="action-btn danger" onclick="endConversation('${chat.id}', '${type}')" title="End & Delete"><i class='bx bx-trash'></i></button>
    </div>
  `;
}

// Render messages
function renderMessages(chat) {
  const messagesArea = document.getElementById('messagesArea');
  let lastDate = null;
  
  messagesArea.innerHTML = chat.messages.map(msg => {
    const msgDate = new Date(msg.timestamp).toDateString();
    let dateDivider = '';
    
    if (msgDate !== lastDate) {
      lastDate = msgDate;
      dateDivider = `
        <div class="date-divider">
          <span>${formatDate(msg.timestamp)}</span>
        </div>
      `;
    }
    
    const isSent = msg.senderId === currentUser.id;
    return `
      ${dateDivider}
      <div class="message ${isSent ? 'sent' : 'received'}">
        <img src="${msg.senderAvatar}" alt="${msg.senderName}" class="message-avatar">
        <div class="message-content">
          <div class="message-bubble">${msg.text}</div>
          <div class="message-time">${formatTime(msg.timestamp)}</div>
        </div>
      </div>
    `;
  }).join('');
  
  // Scroll to bottom
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Send message
function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  
  if (!text || !currentChatId) return;
  
  const activeTab = document.querySelector('.chat-tab.active').dataset.tab;
  const chat = activeTab === 'direct' ? chats.find(c => c.id === currentChatId) : groups.find(g => g.id === currentChatId);
  
  if (!chat) return;
  
  const message = {
    id: 'msg_' + Date.now(),
    senderId: currentUser.id,
    senderName: currentUser.name,
    senderAvatar: currentUser.avatar,
    text: text,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  chat.messages.push(message);
  saveToStorage();
  
  input.value = '';
  renderMessages(chat);
  renderChatList();
}

// Show modals
function showCreateGroupModal() {
  document.getElementById('newChatModal').classList.remove('active');
  document.getElementById('createGroupModal').classList.add('active');
}

function showJoinGroupModal() {
  document.getElementById('newChatModal').classList.remove('active');
  document.getElementById('joinGroupModal').classList.add('active');
}

// Generate invite code
function generateInviteCode() {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  document.getElementById('inviteCodeInput').value = code;
  document.getElementById('inviteCodeInput').dataset.code = code;
}

// Create group
function createGroup() {
  const name = document.getElementById('groupName').value.trim();
  const inviteCode = document.getElementById('inviteCodeInput').dataset.code;
  
  if (!name || !inviteCode) {
    alert('Please fill in all fields and generate an invite code');
    return;
  }
  
  const group = {
    id: 'group_' + Date.now(),
    name: name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff`,
    inviteCode: inviteCode,
    members: [currentUser.id],
    messages: [],
    online: true,
    createdAt: new Date().toISOString()
  };
  
  groups.push(group);
  saveToStorage();
  
  document.getElementById('createGroupModal').classList.remove('active');
  document.getElementById('groupName').value = '';
  document.getElementById('inviteCodeInput').value = '';
  
  // Switch to groups tab
  document.querySelector('.chat-tab[data-tab="group"]').click();
  
  alert(`Group created! Share invite code: ${inviteCode}`);
}

// Join group
function joinGroup() {
  const code = document.getElementById('joinCode').value.trim().toUpperCase();
  
  if (!code) {
    alert('Please enter an invite code');
    return;
  }
  
  const group = groups.find(g => g.inviteCode === code);
  
  if (!group) {
    alert('Invalid invite code');
    return;
  }
  
  if (group.members.includes(currentUser.id)) {
    alert('You are already a member of this group');
    return;
  }
  
  group.members.push(currentUser.id);
  saveToStorage();
  
  document.getElementById('joinGroupModal').classList.remove('active');
  document.getElementById('joinCode').value = '';
  
  // Switch to groups tab
  document.querySelector('.chat-tab[data-tab="group"]').click();
  
  alert(`Successfully joined ${group.name}!`);
}

// Show invite code
function showInviteCode(groupId) {
  const group = groups.find(g => g.id === groupId);
  if (group) {
    alert(`Invite Code: ${group.inviteCode}\n\nShare this code with friends to invite them to the group.`);
  }
}

// Copy invite code
function copyInviteCode() {
  const input = document.getElementById('inviteCodeInput');
  input.select();
  document.execCommand('copy');
  alert('Invite code copied to clipboard!');
}

// End conversation
function endConversation(chatId, type) {
  if (!confirm('Are you sure you want to end and delete this conversation? This action cannot be undone.')) {
    return;
  }
  
  if (type === 'direct') {
    chats = chats.filter(c => c.id !== chatId);
  } else {
    groups = groups.filter(g => g.id !== chatId);
  }
  
  saveToStorage();
  
  currentChatId = null;
  document.getElementById('emptyChat').style.display = 'flex';
  document.getElementById('activeChat').style.display = 'none';
  
  renderChatList();
  
  alert('Conversation ended and deleted successfully');
}

// Helper functions
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Add sample data
function addSampleData() {
  chats = [
    {
      id: 'chat_1',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4caf50&color=fff',
      online: true,
      messages: [
        {
          id: 'msg_1',
          senderId: 'user_other',
          senderName: 'John Doe',
          senderAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4caf50&color=fff',
          text: 'Hey! Did you finish the assignment?',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: false
        }
      ]
    }
  ];
  
  saveToStorage();
  renderChatList();
}
