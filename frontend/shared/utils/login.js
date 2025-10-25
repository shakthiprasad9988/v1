document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Sign in attempt:', {
        email: email,
        password: '***hidden***',
        remember: remember
    });
    
    // Simulate successful login
    alert('Sign in successful! (This is a demo)');
    
    // You can redirect or perform other actions here
    // window.location.href = '/dashboard';
});

// Google sign-in button handler
document.querySelector('.google-btn').addEventListener('click', function() {
    console.log('Google sign-in clicked');
    alert('Google sign-in would be implemented here');
    // Implement Google OAuth here
});
