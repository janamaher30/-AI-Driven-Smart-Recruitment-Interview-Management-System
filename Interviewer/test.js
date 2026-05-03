const data = {
    interviewer: { name: "Ahmed Karim", initials: "AK" },
    stats: {
        todayInterviews: 3,
        pendingEvals: 5,
        extensionRequests: 2,
        completedThisWeek: 11,
        nextInterviewTime: "10:00 AM",
        completedChange: "+3 from last week"
    },
    todayInterviews: [
        { id: 1, name: "Sara Mostafa", role: "Frontend Engineer", time: "10:00", ampm: "AM", status: "live" },
        { id: 2, name: "Omar Nabil", role: "Backend Engineer", time: "01:30", ampm: "PM", status: "soon", soonLabel: "In 3h" },
        { id: 3, name: "Lina Haddad", role: "Data Analyst", time: "04:00", ampm: "PM", status: "scheduled" }
    ],
    pendingEvaluations: [
        { id: 1, name: "Youssef Taleb", role: "Mobile Developer", when: "interviewed yesterday" },
        { id: 2, name: "Nour Amin", role: "UX Designer", when: "2 days ago" }
    ],
    extensionRequests: [
        { id: 1, name: "Omar Nabil", role: "Backend Engineer", extraMin: 15, status: "pending" },
        { id: 2, name: "Sara Mostafa", role: "Frontend Engineer", extraMin: 10, status: "pending" }
    ],
    candidates: [
        { id: 1, name: "Sara Mostafa", email: "sara@email.com", role: "Frontend Engineer", date: "May 2, 10:00 AM", status: "live" },
        { id: 2, name: "Youssef Taleb", email: "youssef@email.com", role: "Mobile Developer", date: "May 1, 2:00 PM", status: "eval" },
        { id: 3, name: "Omar Nabil", email: "omar@email.com", role: "Backend Engineer", date: "May 2, 1:30 PM", status: "soon" },
        { id: 4, name: "Nour Amin", email: "nour@email.com", role: "UX Designer", date: "Apr 30, 11:00 AM", status: "eval" },
        { id: 5, name: "Lina Haddad", email: "lina@email.com", role: "Data Analyst", date: "May 2, 4:00 PM", status: "scheduled" }
    ],
    allInterviews: [
        { id: 1, name: "Sara Mostafa", role: "Frontend Engineer", date: "Sat May 2", type: "Live coding", time: "10:00", ampm: "AM", status: "live" },
        { id: 2, name: "Omar Nabil", role: "Backend Engineer", date: "Sat May 2", type: "Technical interview", time: "01:30", ampm: "PM", status: "soon" },
        { id: 3, name: "Lina Haddad", role: "Data Analyst", date: "Sat May 2", type: "Case study", time: "04:00", ampm: "PM", status: "scheduled" },
        { id: 4, name: "Khaled Fares", role: "DevOps Engineer", date: "Mon May 4", type: "System design", time: "10:30", ampm: "AM", status: "scheduled" }
    ],
    allExtensions: [
        { id: 1, name: "Omar Nabil", role: "Backend Engineer", date: "May 2, 1:48 PM", extraMin: 15, status: "pending" },
        { id: 2, name: "Sara Mostafa", role: "Frontend Engineer", date: "May 2, 10:22 AM", extraMin: 10, status: "pending" },
        { id: 3, name: "Youssef Taleb", role: "Mobile Developer", date: "May 1, 2:31 PM", extraMin: 20, status: "approved" },
        { id: 4, name: "Lina Haddad", role: "Data Analyst", date: "Apr 30, 3:55 PM", extraMin: 15, status: "denied" }
    ],
    feedback: [
        {
            id: 1,
            name: "Youssef Taleb", role: "Mobile Developer", date: "May 1",
            overallScore: 78,
            skills: [
                { label: "Problem solving", score: 7 },
                { label: "Code quality", score: 8 },
                { label: "Communication", score: 8 },
                { label: "System design", score: 6 }
            ],
            note: "Strong React Native skills. Struggled slightly with state management but recovered well. Great culture fit.",
            decision: "recommend", stars: 4, submittedDate: "May 2"
        },
        {
            id: 2,
            name: "Nour Amin", role: "UX Designer", date: "Apr 30",
            overallScore: 65,
            skills: [
                { label: "Problem solving", score: 6 },
                { label: "Design thinking", score: 7.5 },
                { label: "Communication", score: 7 },
                { label: "Portfolio", score: 5.5 }
            ],
            note: "Decent design instincts but portfolio lacked depth. Struggled justifying decisions under pressure.",
            decision: "hold", stars: 3, submittedDate: "May 1"
        }
    ],
    selectedCandidate: {
        id: 2, name: "Youssef Taleb", role: "Mobile Developer",
        interviewDate: "May 1 at 2:00 PM", initials: "YT",
        skills: ["React Native", "Flutter", "TypeScript"],
        resume: [
            "3 years at Cairo Tech Solutions — React Native lead",
            "2 apps on App Store with 50k+ downloads",
            "BSc Computer Science, Cairo University 2021",
            "3 open-source Flutter packages"
        ],
        cvSkills: ["React Native", "Flutter", "TypeScript", "Redux", "Firebase"],
        assessmentScore: 84, assessmentDate: "May 1"
    }
};

const getInitials = (name) => {
    const parts = name.split(' ');
    const first = parts[0][0];
    const last = parts[1] ? parts[1][0] : '';
    return (first + last).toUpperCase();
};

const getBadgeHTML = (status, soonLabel) => {
    if (status === 'live') return '<span class="badge badge-live">Live now</span>';
    if (status === 'soon') return `<span class="badge badge-soon">${soonLabel || 'Soon'}</span>`;
    if (status === 'scheduled') return '<span class="badge badge-sched">Scheduled</span>';
    if (status === 'eval') return '<span class="badge badge-eval">Needs eval</span>';
    return `<span class="badge badge-sched">${status}</span>`;
};

const renderDashboard = () => {
    document.getElementById('greeting').textContent = `Good morning, ${data.interviewer.name} 👋`;
    document.getElementById('dashboard-subtitle').textContent = `You have ${data.stats.todayInterviews} interviews scheduled today.`;
    document.getElementById('stat-interviews').textContent = data.stats.todayInterviews;
    document.getElementById('stat-evals').textContent = data.stats.pendingEvals;
    document.getElementById('stat-extensions').textContent = data.stats.extensionRequests;
    document.getElementById('stat-completed').textContent = data.stats.completedThisWeek;
    document.getElementById('stat-interviews-hint').textContent = `Next at ${data.stats.nextInterviewTime}`;
    document.getElementById('stat-completed-hint').textContent = data.stats.completedChange;
    document.getElementById('badge-candidates').textContent = data.candidates.length;
    document.getElementById('badge-evaluate').textContent = data.stats.pendingEvals;
    document.getElementById('badge-extensions').textContent = data.stats.extensionRequests;

    let interviewHTML = '';
    if (data.todayInterviews.length === 0) {
        interviewHTML = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No interviews today</div></div>';
    } else {
        data.todayInterviews.forEach(interview => {
            const actionBtn = interview.status === 'live' ? '<button class="btn btn-primary">Join</button>' : '<button class="btn">View</button>';
            interviewHTML += `<div class="interview-card">
                <div class="time-box"><div class="time-big">${interview.time}</div><div class="time-ampm">${interview.ampm}</div></div>
                <div class="v-line"></div>
                <div class="cand-info"><div class="cand-name">${interview.name}</div><div class="cand-role">${interview.role}</div></div>
                ${getBadgeHTML(interview.status, interview.soonLabel)}
                ${actionBtn}</div>`;
        });
    }
    document.getElementById('today-interviews-list').innerHTML = interviewHTML;

    let evalHTML = '';
    data.pendingEvaluations.forEach(ev => {
        evalHTML += `<div class="action-card">
            <div><div class="action-name">${ev.name}</div><div class="action-sub">${ev.role} · ${ev.when}</div></div>
            <button class="btn btn-primary">Evaluate</button></div>`;
    });
    document.getElementById('pending-evals-list').innerHTML = evalHTML;

    let extHTML = '';
    data.extensionRequests.forEach(ext => {
        extHTML += `<div class="action-card urgent">
            <div><div class="action-name">${ext.name}</div><div class="action-sub">Requesting +${ext.extraMin} min</div></div>
            <div style="display:flex; gap:6px;"><button class="btn-approve" onclick="approveExtension(${ext.id})">Approve</button>
            <button class="btn-deny" onclick="denyExtension(${ext.id})">Deny</button></div></div>`;
    });
    document.getElementById('dashboard-extensions-list').innerHTML = extHTML;
};

const renderCandidates = (list) => {
    const candidates = list || data.candidates;
    let html = '';
    candidates.forEach(c => {
        html += `<div class="table-row">
            <div class="td td-cand"><div class="td-avatar">${getInitials(c.name)}</div><div>${c.name}</div></div>
            <div class="td">${c.role}</div>
            <div class="td-muted">${c.date}</div>
            <div class="td">${getBadgeHTML(c.status)}</div>
            <div class="td"><button class="btn">View</button></div></div>`;
    });
    document.getElementById('candidates-table-body').innerHTML = html;
};

const filterCandidates = (searchText) => {
    const lower = searchText.toLowerCase();
    const filtered = data.candidates.filter(c => 
        c.name.toLowerCase().includes(lower) || c.role.toLowerCase().includes(lower)
    );
    renderCandidates(filtered);
};

const renderInterviews = () => {
    let html = '';
    data.allInterviews.forEach(iv => {
        html += `<div class="interview-card">
            <div class="time-box"><div class="time-big">${iv.time}</div></div>
            <div class="cand-info"><div class="cand-name">${iv.name}</div><div class="cand-role">${iv.role}</div></div>
            ${getBadgeHTML(iv.status)}</div>`;
    });
    document.getElementById('interviews-list').innerHTML = html;
};

const renderEvaluate = () => {
    const c = data.selectedCandidate;
    document.getElementById('eval-cand-name').textContent = c.name;
    document.getElementById('eval-cand-role').textContent = c.role;
    document.getElementById('eval-avatar').textContent = c.initials;
    
    let resumeHTML = '';
    c.resume.forEach(item => {
        resumeHTML += `<div class="resume-item"><div class="resume-dot"></div><div class="resume-text">${item}</div></div>`;
    });
    document.getElementById('eval-resume').innerHTML = resumeHTML;
};

const renderExtensions = () => {
    let html = '';
    data.allExtensions.forEach(ext => {
        html += `<div class="ext-card">
            <div class="ext-info"><div class="ext-name">${ext.name}</div></div>
            <span class="ext-time">+${ext.extraMin} min</span></div>`;
    });
    document.getElementById('extensions-list').innerHTML = html;
};

const renderFeedback = () => {
    let html = '';
    data.feedback.forEach(fb => {
        html += `<div class="fb-card"><div class="fb-name">${fb.name}</div><div class="fb-note">${fb.note}</div></div>`;
    });
    document.getElementById('feedback-list').innerHTML = html;
};

const renderUserProfile = () => {
    document.getElementById('user-name').textContent = data.interviewer.name;
    document.getElementById('user-avatar').textContent = data.interviewer.initials;
    document.getElementById('topbar-avatar').textContent = data.interviewer.initials;
    document.getElementById('topbar-date').textContent = `📅 ${new Date().toLocaleDateString()}`;
};

const approveExtension = (id) => alert(`Approved extension ${id}`);
const denyExtension = (id) => alert(`Denied extension ${id}`);
const submitEvaluation = () => alert('Evaluation submitted!');
const saveDraft = () => alert('Draft saved!');

const showPage = (pageKey, clickedLink) => {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageKey}`).classList.add('active');
    
    const allLinks = document.querySelectorAll('.nav-link');
    allLinks.forEach(l => l.classList.remove('active'));
    if (clickedLink) clickedLink.classList.add('active');
    document.getElementById('breadcrumb-text').textContent = pageKey;
};

const setStars = (n) => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((s, i) => {
        if (i < n) s.classList.add('filled');
        else s.classList.remove('filled');
    });
};

const selectDecision = (btn) => {
    const btns = btn.parentNode.querySelectorAll('.decision-btn');
    btns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
};

renderUserProfile();
renderDashboard();
renderCandidates();
renderInterviews();
renderEvaluate();
renderExtensions();
renderFeedback();