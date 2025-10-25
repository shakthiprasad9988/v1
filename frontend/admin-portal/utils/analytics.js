// Analytics JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});

function initCharts() {
    // User Activity Chart
    const userCtx = document.getElementById('userActivityChart');
    if (userCtx) {
        new Chart(userCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: [450, 520, 480, 590, 610, 380, 420],
                    borderColor: '#f5576c',
                    backgroundColor: 'rgba(245, 87, 108, 0.1)',
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // Submission Chart
    const subCtx = document.getElementById('submissionChart');
    if (subCtx) {
        new Chart(subCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Submissions',
                    data: [320, 450, 380, 520],
                    backgroundColor: 'rgba(245, 87, 108, 0.8)'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function updateAnalytics() {
    const range = document.getElementById('timeRange').value;
    showToast(`Updated to ${range} days view`, 'info');
}

function exportChart(chartName) {
    showToast(`Exporting ${chartName} chart...`, 'info');
}
