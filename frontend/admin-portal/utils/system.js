// System JavaScript
function clearCache() {
    if (confirm('Clear system cache?')) {
        showToast('Clearing cache...', 'info');
        setTimeout(() => showToast('Cache cleared successfully!', 'success'), 2000);
    }
}

function optimizeDatabase() {
    if (confirm('Optimize database? This may take a few minutes.')) {
        showToast('Optimizing database...', 'info');
        setTimeout(() => showToast('Database optimized!', 'success'), 3000);
    }
}

function backupSystem() {
    if (confirm('Start system backup?')) {
        showToast('Backup started...', 'info');
        setTimeout(() => showToast('Backup completed!', 'success'), 4000);
    }
}

function restartServer() {
    if (confirm('Restart server? This will cause brief downtime.')) {
        showToast('Server restarting...', 'warning');
        setTimeout(() => showToast('Server restarted successfully!', 'success'), 5000);
    }
}
