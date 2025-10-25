// Security JavaScript
function toggle2FA(checkbox) {
    const status = checkbox.checked ? 'enabled' : 'disabled';
    showToast(`Two-Factor Authentication ${status}`, checkbox.checked ? 'success' : 'warning');
}

function toggleIPWhitelist(checkbox) {
    const status = checkbox.checked ? 'enabled' : 'disabled';
    showToast(`IP Whitelist ${status}`, checkbox.checked ? 'success' : 'info');
}

function toggleSessionTimeout(checkbox) {
    const status = checkbox.checked ? 'enabled' : 'disabled';
    showToast(`Session Timeout ${status}`, checkbox.checked ? 'success' : 'info');
}
