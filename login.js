document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS for animations and error messages
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .form-error-message {
            color: #ffcdd2;
            background-color: rgba(255, 67, 67, 0.25);
            padding: 0.75rem;
            border-radius: 8px;
            margin-top: -1rem;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            border-left: 3px solid #f44336;
            text-align: left;
        }
    `;
    document.head.appendChild(styleSheet);

    // Login Form Validation
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
                e.preventDefault();
                alert('Please fill in both email and password.');
            } else {
                e.preventDefault();
                // Simulate successful login
                window.location.href = 'index.html';
            }
        });
    }
});
