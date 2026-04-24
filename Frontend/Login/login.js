const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
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
    const loginBtn = document.getElementById('loginBtn');
    const loader = document.getElementById('loader');
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
    loader.classList.remove('d-none');
    console.log("Sending data to Backend:", loginData);
    setTimeout(() => {
        alert(`Login attempt as ${role}. Backend will verify this.`);
        loginBtn.disabled = false;
        loader.classList.add('d-none');
    }, 1500);
});