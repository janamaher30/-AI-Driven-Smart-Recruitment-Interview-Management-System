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
        expYears: document.getElementById('experience').value,
        field: document.getElementById('expertise').value,
        email: document.getElementById('intEmail').value,
        role: 'Technical_Interviewer'
    };
    btn.disabled = true;
    loader.classList.remove('d-none');
    txt.textContent = "Processing Application...";
    console.log("Interviewer Data:", interviewerData);
    setTimeout(() => {
        alert("Welcome to the Panel, Expert!");
        btn.disabled = false;
        loader.classList.add('d-none');
        txt.textContent = "Join Expert Panel";
    }, 2000);
});