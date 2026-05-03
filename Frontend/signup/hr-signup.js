const setupHrToggle = (btnId, inputId) => {
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
setupHrToggle('#toggleHrPass', '#hrPassword');
setupHrToggle('#toggleHrConfirm', '#hrConfirmPassword');
const API_BASE = 'http://127.0.0.1:8000/api';

document.getElementById('hrSignupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const pass = document.getElementById('hrPassword').value;
    const confirm = document.getElementById('hrConfirmPassword').value;
    const btn = document.getElementById('hrBtn');
    const loader = document.getElementById('hrLoader');
    const txt = document.getElementById('hrBtnText');
    if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
    }
    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }
    const hrData = {
        name: document.getElementById('hrFullName').value,
        email: document.getElementById('hrEmail').value,
        password: pass,
        password_confirmation: confirm,
        role: 'hr_admin'
    };
    btn.disabled = true;
    loader.classList.remove('d-none');
    txt.textContent = "Verifying Identity...";
    fetch(API_BASE + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(hrData)
    })
        .then(async (res) => {
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.message || 'Registration failed');
            alert('HR account created successfully.');
            window.location.href = '../Login/login.html';
        })
        .catch((err) => {
            alert(err.message);
        })
        .finally(() => {
            btn.disabled = false;
            loader.classList.add('d-none');
            txt.textContent = "Authorize & Register";
        });
});