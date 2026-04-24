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
        Id: document.getElementById('Id').value,
        email: document.getElementById('hrEmail').value,
        dept: document.getElementById('department').value,
        role: 'HR_Admin'
    };
    btn.disabled = true;
    loader.classList.remove('d-none');
    txt.textContent = "Verifying Identity...";
    console.log("HR Registration Data:", hrData);
    setTimeout(() => {
        alert("Admin Access Granted!");
        btn.disabled = false;
        loader.classList.add('d-none');
        txt.textContent = "Authorize & Register";
    }, 2000);
});