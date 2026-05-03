var API_BASE = "http://127.0.0.1:8000/api";
var SESSION = { userId: "candidate-demo-1", candidateId: 1, interviewId: "interview-demo-1", interviewerId: "interviewer-demo-1", interviewerName: "Interviewer", hrId: "hr-demo-1" };
var state = { notifications: [], applications: [], assessments: [], jobs: [], interviews: [] };
var activeAssessmentId = null;

async function apiRequest(path, method = "GET", body = null) {
    const options = { method, headers: { "Content-Type": "application/json", Accept: "application/json" } };
    if (body) options.body = JSON.stringify(body);
    const response = await fetch(API_BASE + path, options);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `Request failed: ${response.status}`);
    return payload;
}
const apiGet = (path) => apiRequest(path, "GET");
const apiPost = (path, body) => apiRequest(path, "POST", body);

function renderUserProfile() {
    document.getElementById("user-name").textContent = "Candidate";
    document.getElementById("user-avatar").textContent = "CA";
    document.getElementById("topbar-avatar").textContent = "CA";
    document.getElementById("profile-avatar-big").textContent = "CA";
    document.getElementById("profile-name-big").textContent = "Candidate";
    document.getElementById("profile-email-big").textContent = `${SESSION.userId}@mail.local`;
    document.getElementById("profile-role-big").textContent = "Candidate";
    document.getElementById("topbar-date").textContent = "📅 " + new Date().toDateString();
}

function renderJobs() {
    const container = document.getElementById("jobs-list");
    if (!container) return;
    container.innerHTML = state.jobs.length ? state.jobs.map((j) => `<div class="job-card"><div class="job-title">${j.title || "Job"}</div><div class="job-company">${j.location || ""}</div></div>`).join("") : "<div class='empty-state'>No jobs available</div>";
}

function renderInterviews() {
    const container = document.getElementById("interview-list");
    if (!container) return;
    container.innerHTML = state.interviews.length ? state.interviews.map((iv) => `<div style="background:var(--white);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;gap:16px;"><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:var(--blue-dark);">${iv.interviewId || iv.id}</div><div style="font-size:12px;color:var(--gray);">${iv.scheduled_at || iv.date || ""}</div></div><button class="btn btn-primary" onclick="joinInterview('${iv.interviewId || iv.id}')">Join Session</button></div>`).join("") : "<div class='empty-state'>No interviews scheduled</div>";
}

function renderProgress() {
    document.getElementById("progress-list").innerHTML = state.applications.length ? state.applications.map((a) => `<div class='app-card'>Application #${a.id}</div>`).join("") : "<div class='empty-state'>No applications yet</div>";
}
function renderAssessment() { document.getElementById("question-card").innerHTML = "<div class='empty-state'>Assessment starts after API session starts.</div>"; }
function renderFeedback() { document.getElementById("competency-bars").innerHTML = "<div class='empty-state'>No feedback endpoint yet.</div>"; }
function renderOffer() { document.getElementById("offer-content").innerHTML = "<div class='empty-state'>No offer endpoint yet.</div>"; }
function renderOnboarding() { document.getElementById("onboarding-list").innerHTML = "<div class='empty-state'>No onboarding endpoint yet.</div>"; }
function renderProfile() { document.getElementById("skill-tag-list").innerHTML = "<div class='empty-state'>No skills endpoint yet.</div>"; document.getElementById("credential-list").innerHTML = "<div class='empty-state'>No credentials endpoint yet.</div>"; }

function renderNotifications() {
    const list = document.getElementById("notif-list");
    if (!list) return;
    list.innerHTML = state.notifications.length ? state.notifications.map((n) => `<div class="notif-item ${n.read ? "" : "unread"}" onclick="markRead('${n.id}', this)"><div class="notif-icon">${n.icon || "🔔"}</div><div class="notif-content"><div class="notif-title">${n.title}</div><div class="notif-body">${n.body || ""}</div><div class="notif-time">${n.time || ""}</div></div>${n.read ? "" : '<div class="unread-dot"></div>'}</div>`).join("") : '<div class="empty-state">No notifications</div>';
}

async function renderDashboard() {
    document.getElementById("dashboard-notifs-list").innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';
    try {
        const [dashRes, notifRes, jobsRes, interviewsRes] = await Promise.all([
            apiGet(`/candidate/dashboard?userId=${encodeURIComponent(SESSION.userId)}&candidateId=${SESSION.candidateId}`),
            apiGet(`/notifications/user?userId=${encodeURIComponent(SESSION.userId)}`),
            apiGet("/jobs"),
            apiGet("/interviews")
        ]);
        state.applications = Array.isArray(dashRes.applications) ? dashRes.applications : [];
        state.assessments = Array.isArray(dashRes.assessments) ? dashRes.assessments : [];
        state.jobs = Array.isArray(jobsRes.jobs) ? jobsRes.jobs : [];
        state.interviews = Array.isArray(interviewsRes.interviews) ? interviewsRes.interviews : [];
        state.notifications = (Array.isArray(notifRes.notifications) ? notifRes.notifications : []).map((n) => ({ id: n.notificationId || n.id, title: n.message || n.title || "Notification", body: n.message || "", icon: "🔔", time: n.created_at || "", read: Boolean(n.is_read) }));
        const unread = state.notifications.filter((n) => !n.read).length;
        document.getElementById("notif-dot").style.display = unread > 0 ? "block" : "none";
        document.getElementById("badge-notifs").textContent = unread;
        document.getElementById("notif-subtitle").textContent = `${unread} unread notifications.`;
        document.getElementById("stat-applied").textContent = state.applications.length;
        document.getElementById("stat-applied-hint").textContent = "From backend";
        document.getElementById("stat-interviews").textContent = state.interviews.length;
        document.getElementById("stat-assessments").textContent = state.assessments.length;
        document.getElementById("stat-asm-hint").textContent = "From backend";
        document.getElementById("stat-offers").textContent = 0;
        document.getElementById("dashboard-notifs-list").innerHTML = state.notifications.slice(0, 3).map((n) => `<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);"><div class="notif-icon" style="width:32px;height:32px;font-size:14px;">🔔</div><div><div style="font-size:12px;font-weight:500;color:var(--blue-dark);">${n.title}</div><div style="font-size:11px;color:var(--gray);">${n.time || ""}</div></div></div>`).join("") || "No notifications";
        renderJobs();
        renderInterviews();
        renderNotifications();
    } catch (err) {
        document.getElementById("dashboard-notifs-list").innerHTML = `<div class='empty-state'>${err.message}</div>`;
    }
}

async function markRead(id, el) { try { await apiPost("/notifications/mark-read", { notificationId: String(id), userId: SESSION.userId }); } catch (_err) {} if (el) { el.classList.remove("unread"); el.querySelector(".unread-dot")?.remove(); } }
async function submitExtensionRequest(minutes) { try { await apiPost("/session/request-extension", { interviewId: SESSION.interviewId, interviewerId: SESSION.interviewerId, interviewerName: SESSION.interviewerName, extraMinutes: minutes, reason: "Candidate requested extra time.", hrId: SESSION.hrId }); document.getElementById("extension-panel").style.display = "none"; alert("Extension request sent successfully."); } catch (err) { alert(err.message); } }
async function sendViolation(type) { if (activeAssessmentId) await apiPost("/proctoring/violation", { assessmentId: activeAssessmentId, type }); }
async function startAssessment() { const r = await apiPost("/proctoring/start", { job_id: 1, duration: 45 }); activeAssessmentId = r.assessmentId || null; }
async function submitAssessment(score) { if (activeAssessmentId) await apiPost("/proctoring/submit", { assessmentId: activeAssessmentId, score: Number(score) || 0 }); }
async function checkTimer() { return activeAssessmentId ? apiPost("/proctoring/check-timer", { assessmentId: activeAssessmentId }) : { expired: false }; }
async function joinLiveSession(interviewId) { return apiPost("/live-coding/join", { interviewId: String(interviewId), userId: SESSION.userId, role: "CANDIDATE" }); }
async function joinInterview(id) { try { const r = await joinLiveSession(id); if (r.meetingLink) window.open(r.meetingLink, "_blank"); } catch (err) { alert(err.message); } }

function requestExtension() { const p = document.getElementById("extension-panel"); p.style.display = p.style.display === "none" ? "block" : "none"; }
function nextQuestion() { submitAssessment(0).catch(() => {}); }
function prevQuestion() {}
function setDifficulty(_level, _btn) {}
function addSkill() {}
function removeSkill(_skill) {}
function toggleOnboarding(_id, _el) {}
function acceptOffer() {}
function negotiateOffer() {}
function declineOffer() {}
async function saveProfile() { alert("Profile update endpoint is not available yet."); }
function filterJobs(text) { const t = (text || "").toLowerCase(); const list = state.jobs.filter((j) => `${j.title || ""} ${j.location || ""}`.toLowerCase().includes(t)); document.getElementById("jobs-list").innerHTML = list.length ? list.map((j) => `<div class="job-card"><div class="job-title">${j.title || "Job"}</div><div class="job-company">${j.location || ""}</div></div>`).join("") : "<div class='empty-state'>No jobs found</div>"; }

function showPage(pageKey, clickedLink) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    document.getElementById("page-" + pageKey).classList.add("active");
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
    if (clickedLink) clickedLink.classList.add("active");
}

async function init() {
    renderUserProfile();
    renderAssessment();
    renderFeedback();
    renderOffer();
    renderOnboarding();
    renderProfile();
    await renderDashboard();
    renderProgress();
    try { await startAssessment(); } catch (_err) {}
    document.addEventListener("visibilitychange", () => { if (document.hidden) sendViolation("FOCUS_LOSS").catch(() => {}); });
}

init();
var API_BASE = "http://127.0.0.1:8000/api";
var SESSION = {
    userId: "candidate-demo-1",
    candidateId: 1,
    interviewId: "interview-demo-1",
    interviewerId: "interviewer-demo-1",
    interviewerName: "Interviewer",
    hrId: "hr-demo-1"
};

var state = { notifications: [], applications: [], assessments: [], jobs: [], interviews: [] };
var activeAssessmentId = null;

async function apiRequest(path, method = "GET", body = null) {
    const options = { method, headers: { "Content-Type": "application/json", Accept: "application/json" } };
    if (body) options.body = JSON.stringify(body);
    const response = await fetch(API_BASE + path, options);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `Request failed: ${response.status}`);
    return payload;
}
const apiGet = (path) => apiRequest(path, "GET");
const apiPost = (path, body) => apiRequest(path, "POST", body);

function renderUserProfile() {
    const userName = "Candidate";
    const initials = "CA";
    document.getElementById("user-name").textContent = userName;
    document.getElementById("user-avatar").textContent = initials;
    document.getElementById("topbar-avatar").textContent = initials;
    document.getElementById("profile-avatar-big").textContent = initials;
    document.getElementById("profile-name-big").textContent = userName;
    document.getElementById("profile-email-big").textContent = `${SESSION.userId}@mail.local`;
    document.getElementById("profile-role-big").textContent = "Candidate";
    document.getElementById("topbar-date").textContent = "📅 " + new Date().toDateString();
}

function renderNotifications() {
    const list = document.getElementById("notif-list");
    if (!list) return;
    if (!state.notifications.length) {
        list.innerHTML = '<div class="empty-state">No notifications</div>';
        return;
    }
    list.innerHTML = state.notifications.map((n) => `
        <div class="notif-item ${n.read ? "" : "unread"}" onclick="markRead('${n.id}', this)">
            <div class="notif-icon">${n.icon || "🔔"}</div>
            <div class="notif-content">
                <div class="notif-title">${n.title}</div>
                <div class="notif-body">${n.body || ""}</div>
                <div class="notif-time">${n.time || ""}</div>
            </div>
            ${n.read ? "" : '<div class="unread-dot"></div>'}
        </div>`).join("");
}

function renderJobs() {
    const jobsList = document.getElementById("jobs-list");
    if (!jobsList) return;
    jobsList.innerHTML = state.jobs.length
        ? state.jobs.map((j) => `<div class="job-card"><div class="job-title">${j.title || "Job"}</div><div class="job-company">${j.location || ""}</div></div>`).join("")
        : "<div class='empty-state'>No jobs available</div>";
}

function renderInterviews() {
    const interviewList = document.getElementById("interview-list");
    if (!interviewList) return;
    interviewList.innerHTML = state.interviews.length
        ? state.interviews.map((iv) => `<div style="background:var(--white);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;gap:16px;"><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:var(--blue-dark);">${iv.interviewId || iv.id}</div><div style="font-size:12px;color:var(--gray);">${iv.scheduled_at || iv.date || ""}</div></div><button class="btn btn-primary" onclick="joinInterview('${iv.interviewId || iv.id}')">Join Session</button></div>`).join("")
        : "<div class='empty-state'>No interviews scheduled</div>";
}

function renderProgress() {
    document.getElementById("progress-list").innerHTML = state.applications.length
        ? state.applications.map((a) => `<div class='app-card'>Application #${a.id}</div>`).join("")
        : "<div class='empty-state'>No applications yet</div>";
}

function renderAssessment() { document.getElementById("question-card").innerHTML = "<div class='empty-state'>Assessment starts after API session starts.</div>"; }
function renderFeedback() { document.getElementById("competency-bars").innerHTML = "<div class='empty-state'>No feedback endpoint yet.</div>"; }
function renderOffer() { document.getElementById("offer-content").innerHTML = "<div class='empty-state'>No offer endpoint yet.</div>"; }
function renderOnboarding() { document.getElementById("onboarding-list").innerHTML = "<div class='empty-state'>No onboarding endpoint yet.</div>"; }
function renderProfile() { document.getElementById("skill-tag-list").innerHTML = "<div class='empty-state'>No skills endpoint yet.</div>"; document.getElementById("credential-list").innerHTML = "<div class='empty-state'>No credentials endpoint yet.</div>"; }

async function renderDashboard() {
    document.getElementById("dashboard-notifs-list").innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';
    try {
        const [dashRes, notifRes, jobsRes, interviewsRes] = await Promise.all([
            apiGet(`/candidate/dashboard?userId=${encodeURIComponent(SESSION.userId)}&candidateId=${SESSION.candidateId}`),
            apiGet(`/notifications/user?userId=${encodeURIComponent(SESSION.userId)}`),
            apiGet("/jobs"),
            apiGet("/interviews")
        ]);
        state.applications = Array.isArray(dashRes.applications) ? dashRes.applications : [];
        state.assessments = Array.isArray(dashRes.assessments) ? dashRes.assessments : [];
        state.jobs = Array.isArray(jobsRes.jobs) ? jobsRes.jobs : [];
        state.interviews = Array.isArray(interviewsRes.interviews) ? interviewsRes.interviews : [];
        state.notifications = (Array.isArray(notifRes.notifications) ? notifRes.notifications : []).map((n) => ({
            id: n.notificationId || n.id,
            title: n.message || n.title || "Notification",
            body: n.message || "",
            icon: "🔔",
            time: n.created_at || "",
            read: Boolean(n.is_read)
        }));

        const unread = state.notifications.filter((n) => !n.read).length;
        document.getElementById("notif-dot").style.display = unread > 0 ? "block" : "none";
        document.getElementById("badge-notifs").textContent = unread;
        document.getElementById("notif-subtitle").textContent = `${unread} unread notifications.`;
        document.getElementById("stat-applied").textContent = state.applications.length;
        document.getElementById("stat-applied-hint").textContent = "From backend";
        document.getElementById("stat-interviews").textContent = state.interviews.length;
        document.getElementById("stat-assessments").textContent = state.assessments.length;
        document.getElementById("stat-asm-hint").textContent = "From backend";
        document.getElementById("stat-offers").textContent = 0;
        document.getElementById("dashboard-notifs-list").innerHTML = state.notifications.slice(0, 3).map((n) => `<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);"><div class="notif-icon" style="width:32px;height:32px;font-size:14px;">🔔</div><div><div style="font-size:12px;font-weight:500;color:var(--blue-dark);">${n.title}</div><div style="font-size:11px;color:var(--gray);">${n.time || ""}</div></div></div>`).join("") || "No notifications";
        renderJobs();
        renderInterviews();
        renderNotifications();
    } catch (err) {
        document.getElementById("dashboard-notifs-list").innerHTML = `<div class='empty-state'>${err.message}</div>`;
    }
}

async function markRead(id, el) {
    try { await apiPost("/notifications/mark-read", { notificationId: String(id), userId: SESSION.userId }); } catch (_err) {}
    if (el) { el.classList.remove("unread"); const dot = el.querySelector(".unread-dot"); if (dot) dot.remove(); }
}

async function submitExtensionRequest(minutes) {
    try {
        await apiPost("/session/request-extension", { interviewId: SESSION.interviewId, interviewerId: SESSION.interviewerId, interviewerName: SESSION.interviewerName, extraMinutes: minutes, reason: "Candidate requested extra time.", hrId: SESSION.hrId });
        document.getElementById("extension-panel").style.display = "none";
        alert("Extension request sent successfully.");
    } catch (err) { alert(err.message); }
}

async function sendViolation(type) { if (activeAssessmentId) await apiPost("/proctoring/violation", { assessmentId: activeAssessmentId, type }); }
async function startAssessment() { const r = await apiPost("/proctoring/start", { job_id: 1, duration: 45 }); activeAssessmentId = r.assessmentId || null; }
async function submitAssessment(score) { if (activeAssessmentId) await apiPost("/proctoring/submit", { assessmentId: activeAssessmentId, score: Number(score) || 0 }); }
async function checkTimer() { return activeAssessmentId ? apiPost("/proctoring/check-timer", { assessmentId: activeAssessmentId }) : { expired: false }; }
async function joinLiveSession(interviewId) { return apiPost("/live-coding/join", { interviewId: String(interviewId), userId: SESSION.userId, role: "CANDIDATE" }); }
async function joinInterview(id) { try { const r = await joinLiveSession(id); if (r.meetingLink) window.open(r.meetingLink, "_blank"); } catch (err) { alert(err.message); } }

function requestExtension() { const p = document.getElementById("extension-panel"); p.style.display = p.style.display === "none" ? "block" : "none"; }
function nextQuestion() { submitAssessment(0).catch(() => {}); }
function prevQuestion() {}
function setDifficulty(_level, _btn) {}
function addSkill() {}
function removeSkill(_skill) {}
function toggleOnboarding(_id, _el) {}
function acceptOffer() {}
function negotiateOffer() {}
function declineOffer() {}
async function saveProfile() { alert("Profile update endpoint is not available yet."); }

function filterJobs(text) {
    const t = (text || "").toLowerCase();
    const list = state.jobs.filter((j) => `${j.title || ""} ${j.location || ""}`.toLowerCase().includes(t));
    document.getElementById("jobs-list").innerHTML = list.length ? list.map((j) => `<div class="job-card"><div class="job-title">${j.title || "Job"}</div><div class="job-company">${j.location || ""}</div></div>`).join("") : "<div class='empty-state'>No jobs found</div>";
}

function showPage(pageKey, clickedLink) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    document.getElementById("page-" + pageKey).classList.add("active");
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
    if (clickedLink) clickedLink.classList.add("active");
}

async function init() {
    renderUserProfile();
    renderAssessment();
    renderFeedback();
    renderOffer();
    renderOnboarding();
    renderProfile();
    await renderDashboard();
    renderProgress();
    try { await startAssessment(); } catch (_err) {}
    document.addEventListener("visibilitychange", () => { if (document.hidden) sendViolation("FOCUS_LOSS").catch(() => {}); });
}

init();
var API_BASE = "http://127.0.0.1:8000/api";
var SESSION = {
    userId: "candidate-demo-1",
    candidateId: 1,
    interviewId: "interview-demo-1",
    interviewerId: "interviewer-demo-1",
    interviewerName: "Interviewer",
    hrId: "hr-demo-1"
};

var state = {
    notifications: [],
    applications: [],
    assessments: [],
    jobs: [],
    interviews: []
};

var activeAssessmentId = null;

async function apiRequest(path, method = "GET", body = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json", Accept: "application/json" }
    };
    if (body) options.body = JSON.stringify(body);
    const response = await fetch(API_BASE + path, options);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `Request failed: ${response.status}`);
    return payload;
}

const apiGet = (path) => apiRequest(path, "GET");
const apiPost = (path, body) => apiRequest(path, "POST", body);

function renderUserProfile() {
    const userName = "Candidate";
    const initials = "CA";
    document.getElementById("user-name").textContent = userName;
    document.getElementById("user-avatar").textContent = initials;
    document.getElementById("topbar-avatar").textContent = initials;
    document.getElementById("profile-avatar-big").textContent = initials;
    document.getElementById("profile-name-big").textContent = userName;
    document.getElementById("profile-email-big").textContent = `${SESSION.userId}@mail.local`;
    document.getElementById("profile-role-big").textContent = "Candidate";
    document.getElementById("topbar-date").textContent = "📅 " + new Date().toDateString();
}

function renderNotifications() {
    const list = document.getElementById("notif-list");
    if (!list) return;
    if (!state.notifications.length) {
        list.innerHTML = '<div class="empty-state">No notifications</div>';
        return;
    }
    list.innerHTML = state.notifications.map((n) => `
        <div class="notif-item ${n.read ? "" : "unread"}" onclick="markRead('${n.id}', this)">
            <div class="notif-icon ${n.iconClass || ""}">${n.icon || "🔔"}</div>
            <div class="notif-content">
                <div class="notif-title">${n.title}</div>
                <div class="notif-body">${n.body || ""}</div>
                <div class="notif-time">${n.time || ""}</div>
            </div>
            ${n.read ? "" : '<div class="unread-dot"></div>'}
        </div>`).join("");
}

async function renderDashboard() {
    document.getElementById("dashboard-notifs-list").innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';
    try {
        const [dashRes, notifRes, jobsRes, interviewsRes] = await Promise.all([
            apiGet(`/candidate/dashboard?userId=${encodeURIComponent(SESSION.userId)}&candidateId=${SESSION.candidateId}`),
            apiGet(`/notifications/user?userId=${encodeURIComponent(SESSION.userId)}`),
            apiGet("/jobs"),
            apiGet("/interviews")
        ]);

        state.applications = Array.isArray(dashRes.applications) ? dashRes.applications : [];
        state.assessments = Array.isArray(dashRes.assessments) ? dashRes.assessments : [];
        state.jobs = Array.isArray(jobsRes.jobs) ? jobsRes.jobs : [];
        state.interviews = Array.isArray(interviewsRes.interviews) ? interviewsRes.interviews : [];
        state.notifications = (Array.isArray(notifRes.notifications) ? notifRes.notifications : []).map((n) => ({
            id: n.notificationId || n.id,
            title: n.message || n.title || "Notification",
            body: n.message || "",
            icon: "🔔",
            iconClass: "",
            time: n.created_at || "",
            read: Boolean(n.is_read)
        }));

        const unread = state.notifications.filter((n) => !n.read).length;
        document.getElementById("notif-dot").style.display = unread > 0 ? "block" : "none";
        document.getElementById("badge-notifs").textContent = unread;
        document.getElementById("notif-subtitle").textContent = `${unread} unread notifications.`;
        document.getElementById("stat-applied").textContent = state.applications.length;
        document.getElementById("stat-applied-hint").textContent = "From backend";
        document.getElementById("stat-interviews").textContent = state.interviews.length;
        document.getElementById("stat-assessments").textContent = state.assessments.length;
        document.getElementById("stat-asm-hint").textContent = "From backend";
        document.getElementById("stat-offers").textContent = 0;

        document.getElementById("dashboard-notifs-list").innerHTML = state.notifications.slice(0, 3).map((n) => `
            <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
                <div class="notif-icon" style="width:32px;height:32px;font-size:14px;">🔔</div>
                <div><div style="font-size:12px;font-weight:500;color:var(--blue-dark);">${n.title}</div><div style="font-size:11px;color:var(--gray);">${n.time || ""}</div></div>
            </div>`).join("") || "No notifications";

        renderJobs();
        renderInterviews();
        renderNotifications();
    } catch (err) {
        document.getElementById("dashboard-notifs-list").innerHTML = `<div class='empty-state'>${err.message}</div>`;
    }
}

async function markRead(id, el) {
    try {
        await apiPost("/notifications/mark-read", { notificationId: String(id), userId: SESSION.userId });
    } catch (_err) {}
    if (el) {
        el.classList.remove("unread");
        const dot = el.querySelector(".unread-dot");
        if (dot) dot.remove();
    }
}

async function submitExtensionRequest(minutes) {
    try {
        await apiPost("/session/request-extension", {
            interviewId: SESSION.interviewId,
            interviewerId: SESSION.interviewerId,
            interviewerName: SESSION.interviewerName,
            extraMinutes: minutes,
            reason: "Candidate requested extra time.",
            hrId: SESSION.hrId
        });
        document.getElementById("extension-panel").style.display = "none";
        alert("Extension request sent successfully.");
    } catch (err) {
        alert(err.message);
    }
}

async function sendViolation(type) {
    if (!activeAssessmentId) return;
    await apiPost("/proctoring/violation", { assessmentId: activeAssessmentId, type });
}

async function startAssessment() {
    const response = await apiPost("/proctoring/start", { job_id: 1, duration: 45 });
    activeAssessmentId = response.assessmentId || null;
}

async function submitAssessment(score) {
    if (!activeAssessmentId) return;
    await apiPost("/proctoring/submit", { assessmentId: activeAssessmentId, score: Number(score) || 0 });
}

async function checkTimer() {
    if (!activeAssessmentId) return { expired: false };
    return apiPost("/proctoring/check-timer", { assessmentId: activeAssessmentId });
}

async function joinLiveSession(interviewId) {
    return apiPost("/live-coding/join", { interviewId: String(interviewId), userId: SESSION.userId, role: "CANDIDATE" });
}

function renderJobs() {
    const jobsList = document.getElementById("jobs-list");
    if (!jobsList) return;
    if (!state.jobs.length) {
        jobsList.innerHTML = "<div class='empty-state'>No jobs available</div>";
        return;
    }
    jobsList.innerHTML = state.jobs.map((j) => `
        <div class="job-card">
            <div class="job-title">${j.title || "Job"}</div>
            <div class="job-company">${j.location || ""}</div>
        </div>`).join("");
}

function renderInterviews() {
    const interviewList = document.getElementById("interview-list");
    if (!interviewList) return;
    if (!state.interviews.length) {
        interviewList.innerHTML = "<div class='empty-state'>No interviews scheduled</div>";
        return;
    }
    interviewList.innerHTML = state.interviews.map((iv) => `
        <div style="background:var(--white);border:1px solid var(--border);border-radius:12px;padding:18px;display:flex;align-items:center;gap:16px;">
            <div style="flex:1;">
                <div style="font-size:14px;font-weight:600;color:var(--blue-dark);">${iv.interviewId || iv.id}</div>
                <div style="font-size:12px;color:var(--gray);">${iv.scheduled_at || iv.date || ""}</div>
            </div>
            <button class="btn btn-primary" onclick="joinInterview('${iv.interviewId || iv.id}')">Join Session</button>
        </div>`).join("");
}

function renderAssessment() {
    document.getElementById("question-card").innerHTML = "<div class='empty-state'>Assessment data loads in real-time after start.</div>";
}
function renderFeedback() { document.getElementById("competency-bars").innerHTML = "<div class='empty-state'>Feedback endpoint not available yet.</div>"; }
function renderOffer() { document.getElementById("offer-content").innerHTML = "<div class='empty-state'>Offer endpoint not available yet.</div>"; }
async function saveProfile() { alert("Profile endpoint not implemented in backend yet."); }
function requestExtension() { const p = document.getElementById("extension-panel"); p.style.display = p.style.display === "none" ? "block" : "none"; }
function nextQuestion() { submitAssessment(0).catch(() => {}); }
function prevQuestion() {}
function setDifficulty(_level, _btn) {}
function addSkill() {}
function removeSkill(_skill) {}
function toggleOnboarding(_id, _el) {}
function filterJobs(text) {
    const t = (text || "").toLowerCase();
    const list = state.jobs.filter((j) => `${j.title || ""} ${j.location || ""}`.toLowerCase().includes(t));
    const jobsList = document.getElementById("jobs-list");
    jobsList.innerHTML = list.length ? list.map((j) => `<div class="job-card"><div class="job-title">${j.title || "Job"}</div><div class="job-company">${j.location || ""}</div></div>`).join("") : "<div class='empty-state'>No jobs found</div>";
}
function renderProgress() { document.getElementById("progress-list").innerHTML = state.applications.length ? state.applications.map((a) => `<div class='app-card'>Application #${a.id}</div>`).join("") : "<div class='empty-state'>No applications yet</div>"; }
function renderOnboarding() { document.getElementById("onboarding-list").innerHTML = "<div class='empty-state'>Onboarding endpoint not available yet.</div>"; }
function renderProfile() { document.getElementById("skill-tag-list").innerHTML = "<div class='empty-state'>Profile skills API not available yet.</div>"; document.getElementById("credential-list").innerHTML = "<div class='empty-state'>Credential API not available yet.</div>"; }
function acceptOffer() {}
function negotiateOffer() {}
function declineOffer() {}
async function joinInterview(id) {
    try {
        const response = await joinLiveSession(id);
        if (response.meetingLink) window.open(response.meetingLink, "_blank");
    } catch (err) { alert(err.message); }
}

function showPage(pageKey, clickedLink) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    document.getElementById("page-" + pageKey).classList.add("active");
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
    if (clickedLink) clickedLink.classList.add("active");
}

async function init() {
    renderUserProfile();
    renderAssessment();
    renderFeedback();
    renderOffer();
    renderOnboarding();
    renderProfile();
    await renderDashboard();
    renderProgress();
    try { await startAssessment(); } catch (_err) {}
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) sendViolation("FOCUS_LOSS").catch(() => {});
    });
}

init();
var API_BASE = "http://127.0.0.1:8000/api";
const SESSION_CONTEXT = {
    userId: "candidate-demo-1",
    interviewId: "interview-demo-1",
    interviewerId: "interviewer-demo-1",
    interviewerName: "Interviewer",
    hrId: "hr-demo-1"
};
const PROCTORING_CONFIG = {
    jobId: 1,
    duration: 45
};
var activeAssessmentId = null;

var data = {
    candidate: {
        name: "Candidate",
        initials: "CA",
        email: "candidate@example.com",
        phone: "",
        location: "",
        linkedin: "",
        experience: 0,
        role: "Candidate",
        skills: []
    }
};

/* =========================
   API HELPERS
========================= */
async function apiGet(url) {
    const res = await fetch(API_BASE + url, {
        headers: {
            "Accept": "application/json"
        }
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || ("API error " + res.status));
    return payload;
}

async function apiPost(url, body = {}) {
    const res = await fetch(API_BASE + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || ("API error " + res.status));
    return payload;
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
    let notifications = [];
    try {
        const response = await apiGet("/notifications/user?userId=" + encodeURIComponent(SESSION_CONTEXT.userId));
        const rawNotifications = Array.isArray(response.notifications) ? response.notifications : [];
        notifications = rawNotifications.map(function(n) {
            return {
                id: n.notificationId || n.id,
                title: n.title || n.message || "Notification",
                icon: n.icon || "🔔",
                iconClass: n.iconClass || "",
                created_at: n.created_at || "",
                read: Boolean(n.is_read)
            };
        });
    } catch (_err) {
        notifications = [];
    }

    let unread = notifications.filter(function(n) { return !n.read; }).length;

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
    data.notifications = notifications;
}

/* =========================
   MARK AS READ
========================= */
async function markRead(id, el) {
    try {
        await apiPost("/notifications/mark-read", {
            notificationId: String(id),
            userId: SESSION_CONTEXT.userId
        });
    } catch (_err) {
        // Keep local UI update so the user flow is not blocked by transient API errors.
    }

    el.classList.remove('unread');

    let dot = el.querySelector('.unread-dot');
    if (dot) dot.remove();
}

/* =========================
   SESSION EXTENSION (CONNECTED)
========================= */
async function submitExtensionRequest(minutes) {
    try {
        await apiPost("/session/request-extension", {
            interviewId: SESSION_CONTEXT.interviewId,
            interviewerId: SESSION_CONTEXT.interviewerId,
            interviewerName: SESSION_CONTEXT.interviewerName,
            extraMinutes: minutes,
            reason: "Candidate requested extra time to complete assessment.",
            hrId: SESSION_CONTEXT.hrId
        });
        document.getElementById('extension-panel').style.display = 'none';
        alert("Extension request sent successfully!");
    } catch (err) {
        alert("Extension request failed: " + err.message);
    }
}

/* =========================
   PROCTORING (CONNECTED)
========================= */
async function sendViolation(type) {
    if (!activeAssessmentId) return;
    await apiPost("/proctoring/violation", {
        assessmentId: activeAssessmentId,
        type: type
    });
}

/* =========================
   PROCTORING START (NEW API)
========================= */
async function startAssessment() {
    const response = await apiPost("/proctoring/start", {
        job_id: PROCTORING_CONFIG.jobId,
        duration: PROCTORING_CONFIG.duration
    });
    activeAssessmentId = response.assessmentId || null;
    return response;
}

/* =========================
   PROCTORING SUBMIT (NEW API)
========================= */
async function submitAssessment(score) {
    if (!activeAssessmentId) {
        throw new Error("Assessment has not started yet.");
    }
    return await apiPost("/proctoring/submit", {
        assessmentId: activeAssessmentId,
        score: Number(score) || 0
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
        interviewId: String(sessionId),
        userId: SESSION_CONTEXT.userId,
        role: "CANDIDATE"
    });
}

async function startLiveSession() {
    return await apiPost("/live-coding/start", {
        interviewId: SESSION_CONTEXT.interviewId,
        interviewerId: SESSION_CONTEXT.interviewerId,
        candidateUserId: SESSION_CONTEXT.userId,
        interviewerUserId: SESSION_CONTEXT.interviewerId,
        hrId: SESSION_CONTEXT.hrId,
        scheduledAt: new Date().toISOString()
    });
}

async function sendCodeSync(code, sessionId) {
    return await apiPost("/live-coding/sync", {
        interviewId: String(sessionId),
        userId: SESSION_CONTEXT.userId,
        code: code,
        language: "javascript",
        changeType: "REPLACE"
    });
}

async function sendFeedback(sessionId, feedback) {
    return await apiPost("/live-coding/feedback", {
        interviewId: String(sessionId),
        interviewerId: SESSION_CONTEXT.interviewerId,
        score: 0,
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

    try {
        await startAssessment();
    } catch (_err) {
        activeAssessmentId = null;
    }

    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            sendViolation("FOCUS_LOSS").catch(function() {});
        }
    });
}

init();