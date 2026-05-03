const setupToggle = (btnId, inputId) => {
    const btn = document.querySelector(btnId);
    const input = document.querySelector(inputId);
    if (btn && input) {
        btn.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('bi-eye');
            this.querySelector('i').classList.toggle('bi-eye-slash');
        });
    }
};
setupToggle('#togglePassword', '#password');
setupToggle('#toggleConfirmPassword', '#confirmPassword');
const API_BASE = 'http://127.0.0.1:8000/api';

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const pass = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    const signupBtn = document.getElementById('signupBtn');
    const loader = document.getElementById('loader');
    const btnText = document.getElementById('btnText');
    if (pass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    const formData = {
        name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`.trim(),
        email: document.getElementById('email').value,
        password: pass,
        password_confirmation: confirmPass,
        role: 'candidate'
    };
    signupBtn.disabled = true;
    loader.classList.remove('d-none');
    btnText.textContent = "Creating Account...";
    fetch(API_BASE + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(async (res) => {
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.message || 'Registration failed');
            alert('Account created successfully. Please sign in.');
            window.location.href = '../Login/login.html';
        })
        .catch((err) => {
            alert(err.message);
        })
        .finally(() => {
            signupBtn.disabled = false;
            loader.classList.add('d-none');
            btnText.textContent = "Create Profile";
        });
});