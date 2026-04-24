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
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        password: pass
    };
    signupBtn.disabled = true;
    loader.classList.remove('d-none');
    btnText.textContent = "Creating Account...";
    console.log("Data to Backend:", formData);
    setTimeout(() => {
        alert("Success! Account created.");
        signupBtn.disabled = false;
        loader.classList.add('d-none');
        btnText.textContent = "Create Profile";
    }, 2000);
});