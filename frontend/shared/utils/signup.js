document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!fullname || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Password length validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    
    // Password match validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Terms validation
    if (!terms) {
        alert('You must agree to the Terms & Conditions to register');
        return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Sign up attempt:', {
        fullname: fullname,
        email: email,
        password: '***hidden***',
        termsAccepted: terms,
        termsAcceptedAt: new Date().toISOString()
    });
    
    // Simulate successful signup
    alert('Account created successfully! You have accepted our Terms & Conditions.');
    
    // Redirect to sign in page
    // window.location.href = 'index.html';
});

// Real-time password match validation
const confirmPasswordField = document.getElementById('confirmPassword');
if (confirmPasswordField) {
    confirmPasswordField.addEventListener('input', function() {
        const password = document.getElementById('password').value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.style.borderColor = '#ff4444';
        } else if (confirmPassword) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '';
        }
    });
}

// Terms checkbox validation with visual feedback
const termsCheckbox = document.getElementById('terms');
const termsLabel = document.querySelector('label[for="terms"]');

if (termsCheckbox && termsLabel) {
    termsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            termsLabel.style.color = '#4CAF50';
        } else {
            termsLabel.style.color = '';
        }
    });
}
