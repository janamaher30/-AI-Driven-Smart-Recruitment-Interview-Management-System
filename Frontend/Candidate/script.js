const API_BASE = "http://127.0.0.1:8000/api";

/* =========================
   API HELPERS
========================= */
async function apiGet(url) {
    const res = await fetch(API_BASE + url);
    return res.json();
}

async function apiPost(url, body = {}) {
    const res = await fetch(API_BASE + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    return res.json();
}

/* =========================
   UTIL
========================= */
function getInitials(name) {
    var parts = name.split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

/* =========================
   USER PROFILE
========================= */
function renderUserProfile() {
    var c = data.candidate;

    document.getElementById('user-name').textContent = c.name;
    document.getElementById('user-avatar').textContent = c.initials;
    document.getElementById('topbar-avatar').textContent = c.initials;
    document.getElementById('profile-avatar-big').textContent = c.initials;
    document.getElementById('profile-name-big').textContent = c.name;
    document.getElementById('profile-email-big').textContent = c.email;
    document.getElementById('profile-role-big').textContent = c.role;

    document.getElementById('profile-fullname').value = c.name;
    document.getElementById('profile-email').value = c.email;
    document.getElementById('profile-phone').value = c.phone;
    document.getElementById('profile-location').value = c.location;
    document.getElementById('profile-linkedin').value = c.linkedin;
    document.getElementById('profile-exp').value = c.experience;

    var today = new Date();
    document.getElementById('topbar-date').textContent =
        '📅 ' + today.toDateString();
}

/* =========================
   NOTIFICATIONS (CONNECTED)
========================= */
async function renderDashboard() {

    const notifications = await apiGet("/notifications/user");

    let unread = notifications.filter(n => !n.read).length;

    document.getElementById('notif-dot').style.display = unread > 0 ? 'block' : 'none';
    document.getElementById('badge-notifs').textContent = unread;
    document.getElementById('notif-subtitle').textContent = unread + ' unread notifications.';

    let recent = notifications.slice(0, 3);

    let html = "";

    for (let n of recent) {
        html += `
        <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
            <div class="notif-icon ${n.iconClass || ''}" style="width:32px;height:32px;font-size:14px;">
                ${n.icon ?? "🔔"}
            </div>
            <div>
                <div style="font-size:12px;font-weight:500;color:var(--blue-dark);">${n.title}</div>
                <div style="font-size:11px;color:var(--gray);">${n.created_at ?? ""}</div>
            </div>
        </div>`;
    }

    document.getElementById('dashboard-notifs-list').innerHTML = html || "No notifications";
}

/* =========================
   MARK AS READ
========================= */
async function markRead(id, el) {

    await apiPost("/notifications/mark-read", { id });

    el.classList.remove('unread');

    let dot = el.querySelector('.unread-dot');
    if (dot) dot.remove();
}

/* =========================
   SESSION EXTENSION (CONNECTED)
========================= */
async function submitExtensionRequest(minutes) {

    await apiPost("/session/request-extension", {
        minutes: minutes
    });

    document.getElementById('extension-panel').style.display = 'none';

    alert("Extension request sent successfully!");
}

/* =========================
   PROCTORING (CONNECTED)
========================= */
async function sendViolation(type) {

    await apiPost("/proctoring/violation", {
        type,
        time: new Date().toISOString()
    });
}

/* =========================
   PROCTORING START (NEW API)
========================= */
async function startAssessment() {

    return await apiPost("/proctoring/start", {
        started_at: new Date().toISOString()
    });
}

/* =========================
   PROCTORING SUBMIT (NEW API)
========================= */
async function submitAssessment() {

    return await apiPost("/proctoring/submit", {
        submitted_at: new Date().toISOString()
    });
}

/* =========================
   PROCTORING TIMER CHECK
========================= */
async function checkTimer() {

    return await apiPost("/proctoring/check-timer", {});
}

/* =========================
   LIVE CODING (CONNECTED)
========================= */
async function joinLiveSession(sessionId) {

    return await apiPost("/live-coding/join", {
        session_id: sessionId
    });
}

async function startLiveSession() {

    return await apiPost("/live-coding/start", {});
}

async function sendCodeSync(code, sessionId) {

    return await apiPost("/live-coding/sync", {
        session_id: sessionId,
        code: code
    });
}

async function sendFeedback(sessionId, feedback) {

    return await apiPost("/live-coding/feedback", {
        session_id: sessionId,
        feedback: feedback
    });
}

/* =========================
   PLACEHOLDERS (still missing backend)
========================= */
function renderJobs() {
    document.getElementById('jobs-list').innerHTML =
        "<div class='empty-state'>Jobs API not connected yet</div>";
}

function renderInterviews() {
    document.getElementById('interview-list').innerHTML =
        "<div class='empty-state'>Interviews API not connected yet</div>";
}

function renderAssessment() {
    document.getElementById('question-card').innerHTML =
        "<div class='empty-state'>Assessment API not connected yet</div>";
}

function renderFeedback() {
    document.getElementById('competency-bars').innerHTML =
        "<div class='empty-state'>Feedback API not connected yet</div>";
}

function renderOffer() {
    document.getElementById('offer-content').innerHTML =
        "<div class='empty-state'>Offer API not connected yet</div>";
}

/* =========================
   PROFILE SAVE (MISSING BACKEND)
========================= */
async function saveProfile() {

    alert("❗ Still no backend endpoint for profile update\nNeed: PUT /candidate/profile");
}

/* =========================
   NAVIGATION
========================= */
function showPage(pageKey, clickedLink) {

    var allPages = document.querySelectorAll('.page');
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].classList.remove('active');
    }

    document.getElementById('page-' + pageKey).classList.add('active');

    var allLinks = document.querySelectorAll('.nav-link');
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove('active');
    }

    if (clickedLink) clickedLink.classList.add('active');
}

/* =========================
   INIT
========================= */
async function init() {
    renderUserProfile();
    await renderDashboard();
}

init();