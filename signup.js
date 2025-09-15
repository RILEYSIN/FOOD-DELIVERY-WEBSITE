document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS for animations and error messages, specific to forms
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

    // --- Sign-Up Form Validation ---
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        const signupBox = document.querySelector('.signup-box');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from submitting for now

            const existingError = signupForm.querySelector('.form-error-message');
            if (existingError) {
                existingError.remove();
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error-message';
                errorDiv.textContent = 'Passwords do not match. Please try again.';
                signupForm.prepend(errorDiv);

                signupBox.style.animation = 'shake 0.5s ease';
                signupBox.addEventListener('animationend', () => {
                    signupBox.style.animation = '';
                }, { once: true });
            } else {
                // In a real app, you would now submit the form data to the server.
                alert('Sign-up successful! Redirecting to the main page...');
                window.location.href = 'index.html';
            }
        });
    }

    // --- Show/Hide Password ---
    const togglePasswordIcons = document.querySelectorAll('.password-toggle-icon');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('bx-hide');
                icon.classList.add('bx-show');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('bx-show');
                icon.classList.add('bx-hide');
            }
        });
    });
});