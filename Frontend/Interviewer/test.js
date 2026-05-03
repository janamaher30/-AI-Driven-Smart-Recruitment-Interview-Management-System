const API_BASE = "http://127.0.0.1:8000/api";

const state = {
    interviewer: { name: "Interviewer", initials: "IN" },
    candidates: [],
    interviews: [],
    extensions: [],
    feedback: [],
    selectedCandidate: null
};

const getInitials = (name) => {
    const parts = (name || "").split(" ").filter(Boolean);
    return ((parts[0]?.[0] || "I") + (parts[1]?.[0] || "N")).toUpperCase();
};

const apiGet = async (path) => {
    const res = await fetch(API_BASE + path, { headers: { Accept: "application/json" } });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || "Request failed");
    return payload;
};

const apiPost = async (path, body) => {
    const res = await fetch(API_BASE + path, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body || {})
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || "Request failed");
    return payload;
};

const setContainer = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
};

const showPage = (pageKey, clickedLink) => {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    document.getElementById(`page-${pageKey}`)?.classList.add("active");
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
    if (clickedLink) clickedLink.classList.add("active");
    const names = { dashboard: "Dashboard", candidates: "Assigned Candidates", interviews: "Manage Interviews", evaluate: "Evaluate Candidates", extensions: "Session Extensions", feedback: "View Feedback" };
    const crumb = document.getElementById("breadcrumb-text");
    if (crumb) crumb.textContent = names[pageKey] || pageKey;
};

const renderUserProfile = () => {
    document.getElementById("user-name").textContent = state.interviewer.name;
    document.getElementById("user-avatar").textContent = state.interviewer.initials;
    document.getElementById("topbar-avatar").textContent = state.interviewer.initials;
    document.getElementById("topbar-date").textContent = `📅 ${new Date().toLocaleDateString()}`;
};

const renderDashboard = () => {
    document.getElementById("greeting").textContent = `Good day, ${state.interviewer.name} 👋`;
    document.getElementById("dashboard-subtitle").textContent = `${state.interviews.length} interviews loaded from API.`;
    document.getElementById("stat-interviews").textContent = state.interviews.length;
    document.getElementById("stat-evals").textContent = state.candidates.length;
    document.getElementById("stat-extensions").textContent = state.extensions.length;
    document.getElementById("stat-completed").textContent = state.feedback.length;
    document.getElementById("stat-interviews-hint").textContent = state.interviews[0]?.scheduled_at || "No upcoming sessions";
    document.getElementById("stat-completed-hint").textContent = `${state.feedback.length} submitted`;
    document.getElementById("badge-candidates").textContent = state.candidates.length;
    document.getElementById("badge-evaluate").textContent = state.candidates.length;
    document.getElementById("badge-extensions").textContent = state.extensions.length;

    setContainer("today-interviews-list", state.interviews.length
        ? state.interviews.slice(0, 5).map((iv) => `<div class="interview-card"><div class="cand-info"><div class="cand-name">${iv.candidateName || "Candidate"}</div><div class="cand-role">${iv.status || "SCHEDULED"}</div></div><button class="btn btn-primary" onclick="joinInterviewSession('${iv.interviewId || iv.id}')">Join</button></div>`).join("")
        : '<div class="empty-state"><div class="empty-text">No interviews available</div></div>');

    setContainer("pending-evals-list", state.candidates.length
        ? state.candidates.slice(0, 5).map((c) => `<div class="action-card"><div><div class="action-name">${c.name}</div><div class="action-sub">${c.email || ""}</div></div><button class="btn btn-primary" onclick="loadCandidate('${c.userId || c.id}')">Evaluate</button></div>`).join("")
        : '<div class="empty-state"><div class="empty-text">No candidates available</div></div>');

    setContainer("dashboard-extensions-list", state.extensions.length
        ? state.extensions.map((ext) => `<div class="action-card urgent"><div><div class="action-name">${ext.interviewId}</div><div class="action-sub">Extension request</div></div><div><button class="btn-approve" onclick="approveExtension('${ext.interviewId}')">Approve</button><button class="btn-deny" onclick="denyExtension('${ext.interviewId}')">Deny</button></div></div>`).join("")
        : '<div class="empty-state"><div class="empty-text">No pending extension requests</div></div>');
};

const renderCandidates = (list) => {
    const candidates = list || state.candidates;
    setContainer("candidates-table-body", candidates.length
        ? candidates.map((c) => `<div class="table-row"><div class="td td-cand"><div class="td-avatar">${getInitials(c.name)}</div><div><div>${c.name}</div><div class="td-muted">${c.email || ""}</div></div></div><div class="td">${c.role || "Candidate"}</div><div class="td-muted">-</div><div class="td"><span class="badge badge-sched">Active</span></div><div class="td"><button class="btn btn-primary" onclick="loadCandidate('${c.userId || c.id}')">Evaluate</button></div></div>`).join("")
        : '<div class="empty-state"><div class="empty-text">No candidates found</div></div>');
};

const renderInterviews = () => {
    setContainer("interviews-list", state.interviews.length
        ? state.interviews.map((iv) => `<div class="interview-card"><div class="cand-info"><div class="cand-name">${iv.candidateName || "Candidate"}</div><div class="cand-role">${iv.scheduled_at || iv.date || "Not scheduled"}</div></div><button class="btn btn-primary" onclick="joinInterviewSession('${iv.interviewId || iv.id}')">Join</button></div>`).join("")
        : '<div class="empty-state"><div class="empty-text">No interviews scheduled</div></div>');
};

const renderEvaluate = () => {
    const c = state.selectedCandidate;
    if (!c) return;
    document.getElementById("eval-cand-name").textContent = c.name;
    document.getElementById("eval-cand-role").textContent = c.email || "Candidate";
    document.getElementById("eval-avatar").textContent = getInitials(c.name);
    document.getElementById("eval-subtitle").textContent = `Scoring form for ${c.name}.`;
    setContainer("eval-resume", '<div class="resume-item"><div class="resume-text">No resume details available in API yet.</div></div>');
};

const renderExtensions = () => {
    setContainer("extensions-list", state.extensions.length
        ? state.extensions.map((ext) => `<div class="ext-card"><div class="ext-info"><div class="ext-name">${ext.interviewId}</div><div class="ext-detail">Pending extension</div></div><div class="ext-actions"><button class="btn-approve" onclick="approveExtension('${ext.interviewId}')">Approve</button><button class="btn-deny" onclick="denyExtension('${ext.interviewId}')">Deny</button></div></div>`).join("")
        : '<div class="empty-state"><div class="empty-text">No extension requests</div></div>');
};

const renderFeedback = () => {
    setContainer("feedback-list", state.feedback.length
        ? state.feedback.map((f) => `<div class="fb-card"><div class="fb-name">${f.interviewId || f.id}</div><div class="fb-note">${f.feedback || "Feedback available"}</div></div>`).join("")
        : '<div class="empty-state"><div class="empty-text">No feedback submitted yet</div></div>');
};

const filterCandidates = (searchText) => {
    const t = (searchText || "").toLowerCase();
    const filtered = state.candidates.filter((c) => `${c.name || ""} ${c.email || ""}`.toLowerCase().includes(t));
    renderCandidates(filtered);
};

const loadCandidate = (id) => {
    state.selectedCandidate = state.candidates.find((c) => String(c.userId || c.id) === String(id)) || null;
    renderEvaluate();
    showPage("evaluate", document.querySelectorAll(".nav-link")[3]);
};

const setStars = (n) => {
    document.querySelectorAll(".star").forEach((star, i) => star.classList.toggle("filled", i < n));
};

const selectDecision = (btn) => {
    btn.parentNode.querySelectorAll(".decision-btn").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
};

const submitEvaluation = async () => {
    if (!state.selectedCandidate || !state.interviews[0]) {
        alert("No candidate/interview selected.");
        return;
    }
    try {
        await apiPost("/live-coding/feedback", {
            interviewId: String(state.interviews[0].interviewId || state.interviews[0].id),
            interviewerId: "interviewer-demo-1",
            score: Number(document.querySelector(".slider")?.value || 0) * 10,
            feedback: document.getElementById("eval-comments").value || "Submitted from interviewer dashboard"
        });
        alert("Evaluation submitted.");
        await loadData();
    } catch (err) {
        alert(err.message);
    }
};

const saveDraft = () => alert("Draft saved locally.");

const approveExtension = async (interviewId) => {
    try {
        await apiPost("/session/approve-extension", { interviewId: String(interviewId), interviewerId: "interviewer-demo-1", interviewerName: state.interviewer.name, hrId: "hr-demo-1", extraMinutes: 10 });
        alert("Extension approved.");
    } catch (err) {
        alert(err.message);
    }
};

const denyExtension = async (interviewId) => {
    try {
        await apiPost("/session/reject-extension", { interviewId: String(interviewId), interviewerId: "interviewer-demo-1", interviewerName: state.interviewer.name, hrId: "hr-demo-1" });
        alert("Extension denied.");
    } catch (err) {
        alert(err.message);
    }
};

const joinInterviewSession = async (id) => {
    try {
        const response = await apiPost("/live-coding/join", { interviewId: String(id), userId: "interviewer-demo-1", role: "INTERVIEWER" });
        if (response.meetingLink) window.open(response.meetingLink, "_blank");
    } catch (err) {
        alert(err.message);
    }
};

async function loadData() {
    setContainer("today-interviews-list", '<div class="loading"><div class="spinner"></div> Loading interviews...</div>');
    setContainer("pending-evals-list", '<div class="loading"><div class="spinner"></div> Loading candidates...</div>');
    try {
        const [dash, interviews, pipeline] = await Promise.all([
            apiGet("/interviewer/dashboard?interviewerId=interviewer-demo-1"),
            apiGet("/interviews"),
            apiGet("/candidates/pipeline")
        ]);
        state.interviews = Array.isArray(dash.interviews) ? dash.interviews : (interviews.interviews || []);
        state.feedback = Array.isArray(dash.feedback) ? dash.feedback : [];
        state.candidates = Array.isArray(pipeline.candidates) ? pipeline.candidates : [];
        state.extensions = [];
        renderDashboard();
        renderCandidates();
        renderInterviews();
        renderEvaluate();
        renderExtensions();
        renderFeedback();
    } catch (err) {
        setContainer("today-interviews-list", `<div class="empty-state"><div class="empty-text">${err.message}</div></div>`);
        setContainer("pending-evals-list", `<div class="empty-state"><div class="empty-text">${err.message}</div></div>`);
    }
}

renderUserProfile();
loadData();
