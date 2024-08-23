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
    const left_btn = document.querySelector('.lbtn'); 
    const right_btn = document.querySelector('.rbtn'); 
    let Song_UL = document.querySelector(".SongList").getElementsByTagName("ul")[0];

    Song_UL.style.display = "none"
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        authSection.style.display = 'none';
        left_btn.style.display = 'none';
        right_btn.style.display = 'none';
        mainContent.style.display = 'block';
        logoutBtn.style.display = 'block'; // Show logout button when logged in
        Song_UL.style.display = "flex"
    } else {
        authSection.style.display = 'block';
        mainContent.style.display = 'none';
    }

    // Show signup form
    left_btn.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
    });

    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
    });

    // Show login form
    right_btn.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    });

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    });

    // Handle login
    loginBtn.addEventListener('click', function() {
        // Dummy login logic
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const check_user = localStorage.getItem("username")
        const check_pass = localStorage.getItem("pass")
        
        if(username === check_user && password === check_pass) { // Simple hardcoded login for demo purposes
            localStorage.setItem('isLoggedIn', 'true'); // Store login state in local storage
            authSection.style.display = 'none';
            left_btn.style.display = 'none';
            right_btn.style.display = 'none';
            mainContent.style.display = 'block';
            logoutBtn.style.display = 'block'; // Show logout button after login
            Song_UL.style.display = "flex"
        } else {
            alert("Invalid credentials!");
        }
    });
    
    // Handle signup
    signupBtn.addEventListener('click', function() { 
        const username_1 = document.getElementById('new-username');
        const password_1 = document.getElementById('new-password');

        var textValue_1 = username_1.value.trim()
        var textValue_2 = password_1.value.trim()

        if(textValue_1 === "" && textValue_2 === ""){
            alert("The text field is empty.")
        }
        else{
            // Dummy signup logic (store to local storage or send to server in real scenario)
            localStorage.setItem("username", `${username_1.value}`)
            localStorage.setItem("pass", `${password_1.value}`)
            alert("Signup successful! Please log in.");
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn'); // Clear login state from local storage
        authSection.style.display = 'block';
        left_btn.style.display = 'inline';
        right_btn.style.display = 'inline';
        mainContent.style.display = 'none';
        logoutBtn.style.display = 'none'; // Hide logout button after logout
        audio.pause()
        play_btn.src = "Assets/Images/Play-Bar/Play-btn.svg";
        Song_UL.style.display = "none"
    });
});
