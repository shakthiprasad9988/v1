// Calendar JavaScript

let currentDate = new Date();
let selectedDate = null;

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Final Project Submission",
    course: "Software Engineering",
    date: "2025-10-27",
    type: "urgent",
    description: "Submit final project with documentation"
  },
  {
    id: 2,
    title: "Assignment 4",
    course: "Machine Learning",
    date: "2025-10-28",
    type: "warning",
    description: "Complete ML assignment on neural networks"
  },
  {
    id: 3,
    title: "Lab Report Due",
    course: "Database Systems",
    date: "2025-10-30",
    type: "warning",
    description: "Submit lab 6 report"
  },
  {
    id: 4,
    title: "Research Paper",
    course: "Computer Networks",
    date: "2025-11-02",
    type: "success",
    description: "Research paper on network protocols"
  },
  {
    id: 5,
    title: "Mid-term Exam",
    course: "Data Structures",
    date: "2025-11-05",
    type: "urgent",
    description: "Mid-term examination"
  },
  {
    id: 6,
    title: "Project Presentation",
    course: "Web Development",
    date: "2025-11-08",
    type: "success",
    description: "Present final project to class"
  }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  renderUpcomingEvents();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Previous month
  document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  // Next month
  document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Today button
  document.getElementById('todayBtn').addEventListener('click', () => {
    currentDate = new Date();
    renderCalendar();
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

// Render calendar
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Update header
  document.getElementById('currentMonth').textContent = 
    currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const calendarGrid = document.getElementById('calendarGrid');
  calendarGrid.innerHTML = '';
  
  // Add day headers
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach(day => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = day;
    calendarGrid.appendChild(header);
  });
  
  // Add previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dayElement = createDayElement(day, true, year, month - 1);
    calendarGrid.appendChild(dayElement);
  }
  
  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = createDayElement(day, false, year, month);
    calendarGrid.appendChild(dayElement);
  }
  
  // Add next month days
  const remainingDays = 42 - (firstDay + daysInMonth);
  for (let day = 1; day <= remainingDays; day++) {
    const dayElement = createDayElement(day, true, year, month + 1);
    calendarGrid.appendChild(dayElement);
  }
}

// Create day element
function createDayElement(day, isOtherMonth, year, month) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
  
  if (isOtherMonth) {
    dayElement.classList.add('other-month');
  }
  
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
  // Check if today
  const today = new Date();
  if (year === today.getFullYear() && 
      month === today.getMonth() && 
      day === today.getDate() && 
      !isOtherMonth) {
    dayElement.classList.add('today');
  }
  
  // Check if has event
  const hasEvent = eventsData.some(event => event.date === dateStr);
  if (hasEvent && !isOtherMonth) {
    dayElement.classList.add('has-event');
  }
  
  const dayNumber = document.createElement('span');
  dayNumber.className = 'day-number';
  dayNumber.textContent = day;
  dayElement.appendChild(dayNumber);
  
  // Click handler
  dayElement.addEventListener('click', () => {
    selectedDate = dateStr;
    showDayEvents(dateStr);
  });
  
  return dayElement;
}

// Render upcoming events
function renderUpcomingEvents() {
  const eventsList = document.getElementById('eventsList');
  
  // Filter and sort upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = eventsData
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);
  
  if (upcomingEvents.length === 0) {
    eventsList.innerHTML = `
      <div class="empty-events">
        <i class='bx bx-calendar-x'></i>
        <p>No upcoming deadlines</p>
      </div>
    `;
    return;
  }
  
  eventsList.innerHTML = upcomingEvents.map(event => {
    const daysLeft = getDaysUntil(event.date);
    const timeLeftText = getTimeLeftText(daysLeft);
    const urgencyClass = getUrgencyClass(daysLeft);
    
    return `
      <div class="event-item ${urgencyClass}" onclick="showEventDetails(${event.id})">
        <div class="event-date">
          <i class='bx bx-calendar'></i>
          ${formatDate(event.date)}
        </div>
        <div class="event-title">${event.title}</div>
        <div class="event-course">${event.course}</div>
        <span class="event-time-left ${urgencyClass}">
          <i class='bx bx-time'></i>
          ${timeLeftText}
        </span>
      </div>
    `;
  }).join('');
}

// Show day events
function showDayEvents(dateStr) {
  const dayEvents = eventsData.filter(event => event.date === dateStr);
  
  if (dayEvents.length === 0) {
    alert(`No events on ${formatDate(dateStr)}`);
    return;
  }
  
  const eventsList = dayEvents.map(event => 
    `• ${event.title} (${event.course})`
  ).join('\n');
  
  alert(`Events on ${formatDate(dateStr)}:\n\n${eventsList}`);
}

// Show event details
function showEventDetails(eventId) {
  const event = eventsData.find(e => e.id === eventId);
  if (!event) return;
  
  const daysLeft = getDaysUntil(event.date);
  const timeLeftText = getTimeLeftText(daysLeft);
  
  alert(`${event.title}\n\nCourse: ${event.course}\nDate: ${formatDate(event.date)}\nTime Left: ${timeLeftText}\n\nDescription:\n${event.description}`);
}

// Helper functions
function getDaysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateStr);
  const diffTime = targetDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getTimeLeftText(days) {
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 7) return `${days} days left`;
  if (days <= 30) return `${Math.floor(days / 7)} weeks left`;
  return `${Math.floor(days / 30)} months left`;
}

function getUrgencyClass(days) {
  if (days <= 2) return 'urgent';
  if (days <= 7) return 'warning';
  return 'success';
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}
