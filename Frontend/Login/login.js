const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const API_BASE = 'http://127.0.0.1:8000/api';

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.querySelector('i').classList.toggle('bi-eye');
    this.querySelector('i').classList.toggle('bi-eye-slash');
});
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const form = e.target;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const role = document.getElementById('userRole').value;
    const loginBtn = form.querySelector('button[type="submit"]');
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    const loginData = {
        email: email,
        password: pass,
        role: role
    };
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';

    fetch(API_BASE + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(async (res) => {
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.message || 'Login failed');
            localStorage.setItem('authToken', payload.token);
            localStorage.setItem('currentUser', JSON.stringify(payload.user));
            alert('Login successful');
            window.location.href = '../main.html';
        })
        .catch((err) => {
            alert(err.message);
        })
        .finally(() => {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign In';
        });
});