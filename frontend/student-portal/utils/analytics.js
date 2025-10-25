// Analytics JavaScript

// Sample data
const analyticsData = {
  totalSubmissions: 24,
  onTimeSubmissions: 20,
  averageGrade: 85,
  completionRate: 92,
  
  monthlySubmissions: [
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 4 },
    { month: 'Mar', count: 5 },
    { month: 'Apr', count: 3 },
    { month: 'May', count: 4 },
    { month: 'Jun', count: 5 }
  ],
  
  gradeDistribution: [
    { grade: 'A+', count: 8, percentage: 33 },
    { grade: 'A', count: 6, percentage: 25 },
    { grade: 'B', count: 7, percentage: 29 },
    { grade: 'C', count: 2, percentage: 8 },
    { grade: 'F', count: 1, percentage: 4 }
  ],
  
  coursePerformance: [
    { name: 'Software Engineering', submissions: 5, grade: 'A+' },
    { name: 'Data Structures', submissions: 4, grade: 'A' },
    { name: 'Web Development', submissions: 6, grade: 'A+' },
    { name: 'Database Systems', submissions: 4, grade: 'B+' },
    { name: 'Machine Learning', submissions: 3, grade: 'A' },
    { name: 'Computer Networks', submissions: 2, grade: 'B' }
  ],
  
  recentActivity: [
    {
      type: 'success',
      icon: 'bx-check-circle',
      title: 'Assignment Approved',
      description: 'Your Web Development project was approved with grade A+',
      time: '2 hours ago'
    },
    {
      type: 'info',
      icon: 'bx-upload',
      title: 'New Submission',
      description: 'Successfully submitted Assignment 3 for Data Structures',
      time: '5 hours ago'
    },
    {
      type: 'warning',
      icon: 'bx-time',
      title: 'Deadline Reminder',
      description: 'Machine Learning assignment due in 2 days',
      time: '1 day ago'
    },
    {
      type: 'success',
      icon: 'bx-medal',
      title: 'High Grade Achieved',
      description: 'Received A+ on Database Systems lab report',
      time: '2 days ago'
    },
    {
      type: 'info',
      icon: 'bx-message-square-detail',
      title: 'Feedback Received',
      description: 'Faculty provided feedback on your research paper',
      time: '3 days ago'
    }
  ]
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderSubmissionChart();
  renderGradeDistribution();
  renderCoursePerformance();
  renderActivityTimeline();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Time filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // In real app, fetch data for selected time period
      console.log('Filter changed to:', btn.textContent);
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

// Render stats overview
function renderStats() {
  document.getElementById('totalSubmissions').textContent = analyticsData.totalSubmissions;
  document.getElementById('onTimeSubmissions').textContent = analyticsData.onTimeSubmissions;
  document.getElementById('averageGrade').textContent = analyticsData.averageGrade + '%';
  document.getElementById('completionRate').textContent = analyticsData.completionRate + '%';
}

// Render submission chart
function renderSubmissionChart() {
  const chartContainer = document.getElementById('submissionChart');
  const maxCount = Math.max(...analyticsData.monthlySubmissions.map(m => m.count));
  
  chartContainer.innerHTML = analyticsData.monthlySubmissions.map(month => {
    const height = (month.count / maxCount) * 100;
    return `
      <div class="chart-bar" style="height: ${height}%;" title="${month.month}: ${month.count} submissions">
        <span class="bar-value">${month.count}</span>
        <span class="bar-label">${month.month}</span>
      </div>
    `;
  }).join('');
}

// Render grade distribution
function renderGradeDistribution() {
  const container = document.getElementById('gradeDistribution');
  
  container.innerHTML = analyticsData.gradeDistribution.map(grade => {
    const gradeClass = grade.grade.toLowerCase().replace('+', '-plus');
    return `
      <div class="grade-item">
        <div class="grade-label">${grade.grade}</div>
        <div class="grade-bar-container">
          <div class="grade-bar ${gradeClass}" style="width: ${grade.percentage}%;">
            ${grade.count} (${grade.percentage}%)
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render course performance
function renderCoursePerformance() {
  const container = document.getElementById('coursePerformance');
  
  container.innerHTML = analyticsData.coursePerformance.map(course => `
    <div class="course-item">
      <div class="course-info">
        <h4>${course.name}</h4>
        <p>${course.submissions} submissions</p>
      </div>
      <div class="course-grade">${course.grade}</div>
    </div>
  `).join('');
}

// Render activity timeline
function renderActivityTimeline() {
  const container = document.getElementById('activityTimeline');
  
  container.innerHTML = analyticsData.recentActivity.map(activity => `
    <div class="timeline-item">
      <div class="timeline-icon ${activity.type}">
        <i class='bx ${activity.icon}'></i>
      </div>
      <div class="timeline-content">
        <h4>${activity.title}</h4>
        <p>${activity.description}</p>
        <span class="timeline-time">${activity.time}</span>
      </div>
    </div>
  `).join('');
}
