document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const authSection = document.getElementById('auth-section');
    const mainContent = document.getElementById('main-content');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById('logout-btn'); // Added logout button
    const left_btn = document.querySelector('.lbtn'); // Added logout button
    const right_btn = document.querySelector('.rbtn'); // Added logout button

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        authSection.style.display = 'none';
        left_btn.style.display = 'none';
        right_btn.style.display = 'none';
        mainContent.style.display = 'block';
        logoutBtn.style.display = 'block'; // Show logout button when logged in
    } else {
        authSection.style.display = 'block';
        mainContent.style.display = 'none';
    }

    // Show signup form
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    // Show login form
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Handle login
    loginBtn.addEventListener('click', function() {
        // Dummy login logic
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if(username === username && password === password) { // Simple hardcoded login for demo purposes
            localStorage.setItem('isLoggedIn', 'true'); // Store login state in local storage
            authSection.style.display = 'none';
            left_btn.style.display = 'none';
            right_btn.style.display = 'none';
            mainContent.style.display = 'block';
            logoutBtn.style.display = 'block'; // Show logout button after login
        } else {
            alert("Invalid credentials!");
        }
    });

    // Handle signup
    signupBtn.addEventListener('click', function() {
        // Dummy signup logic (store to local storage or send to server in real scenario)
        alert("Signup successful! Please log in.");
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn'); // Clear login state from local storage
        authSection.style.display = 'block';
        mainContent.style.display = 'none';
        logoutBtn.style.display = 'none'; // Hide logout button after logout
    });
});
