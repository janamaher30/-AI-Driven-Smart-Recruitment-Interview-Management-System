const setupIntToggle = (btnId, inputId) => {
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
setupIntToggle('#toggleIntPass', '#intPass');
setupIntToggle('#toggleIntConfirm', '#intConfirmPass');
const API_BASE = 'http://127.0.0.1:8000/api';

document.getElementById('interviewerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const pass = document.getElementById('intPass').value;
    const confirm = document.getElementById('intConfirmPass').value;
    const btn = document.getElementById('intBtn');
    const loader = document.getElementById('intLoader');
    const txt = document.getElementById('intBtnText');
    if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
    }
    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }
    const interviewerData = {
        name: document.getElementById('intName').value,
        email: document.getElementById('intEmail').value,
        password: pass,
        password_confirmation: confirm,
        role: 'interviewer'
    };
    btn.disabled = true;
    loader.classList.remove('d-none');
    txt.textContent = "Processing Application...";
    fetch(API_BASE + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(interviewerData)
    })
        .then(async (res) => {
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.message || 'Registration failed');
            alert('Interviewer account created successfully.');
            window.location.href = '../Login/login.html';
        })
        .catch((err) => {
            alert(err.message);
        })
        .finally(() => {
            btn.disabled = false;
            loader.classList.add('d-none');
            txt.textContent = "Join us";
        });
});