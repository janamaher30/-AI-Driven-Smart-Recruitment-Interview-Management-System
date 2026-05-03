const data = {
    interviewer: {
        name: "Ahmed Karim",
        initials: "AK"
    },

    stats: {
        todayInterviews: 3,
        pendingEvals: 5,
        extensionRequests: 2,
        completedThisWeek: 11,
        nextInterviewTime: "10:00 AM",
        completedChange: "+3 from last week"
    },

    todayInterviews: [
        { id: 1, name: "Sara Mostafa",  role: "Frontend Engineer", time: "10:00", ampm: "AM", status: "live" },
        { id: 2, name: "Omar Nabil",    role: "Backend Engineer",  time: "01:30", ampm: "PM", status: "soon", soonLabel: "In 3h" },
        { id: 3, name: "Lina Haddad",   role: "Data Analyst",      time: "04:00", ampm: "PM", status: "scheduled" }
    ],

    pendingEvaluations: [
        { id: 1, name: "Youssef Taleb", role: "Mobile Developer", when: "interviewed yesterday" },
        { id: 2, name: "Nour Amin",     role: "UX Designer",      when: "2 days ago" }
    ],

    extensionRequests: [
        { id: 1, name: "Omar Nabil",   role: "Backend Engineer",  extraMin: 15, status: "pending" },
        { id: 2, name: "Sara Mostafa", role: "Frontend Engineer", extraMin: 10, status: "pending" }
    ],

    candidates: [
        { id: 1, name: "Sara Mostafa",  email: "sara@email.com",    role: "Frontend Engineer", date: "May 2, 10:00 AM",  status: "live"      },
        { id: 2, name: "Youssef Taleb", email: "youssef@email.com", role: "Mobile Developer",  date: "May 1, 2:00 PM",  status: "eval"      },
        { id: 3, name: "Omar Nabil",    email: "omar@email.com",    role: "Backend Engineer",  date: "May 2, 1:30 PM",  status: "soon"      },
        { id: 4, name: "Nour Amin",     email: "nour@email.com",    role: "UX Designer",       date: "Apr 30, 11:00 AM",status: "eval"      },
        { id: 5, name: "Lina Haddad",   email: "lina@email.com",    role: "Data Analyst",      date: "May 2, 4:00 PM",  status: "scheduled" }
    ],

    allInterviews: [
        { id: 1, name: "Sara Mostafa",  role: "Frontend Engineer", date: "Sat May 2",  type: "Live coding",        time: "10:00", ampm: "AM", status: "live"      },
        { id: 2, name: "Omar Nabil",    role: "Backend Engineer",  date: "Sat May 2",  type: "Technical interview",time: "01:30", ampm: "PM", status: "soon"      },
        { id: 3, name: "Lina Haddad",   role: "Data Analyst",      date: "Sat May 2",  type: "Case study",         time: "04:00", ampm: "PM", status: "scheduled" },
        { id: 4, name: "Khaled Fares",  role: "DevOps Engineer",   date: "Mon May 4",  type: "System design",      time: "10:30", ampm: "AM", status: "scheduled" }
    ],

    allExtensions: [
        { id: 1, name: "Omar Nabil",    role: "Backend Engineer",  date: "May 2, 1:48 PM",  extraMin: 15, status: "pending"  },
        { id: 2, name: "Sara Mostafa",  role: "Frontend Engineer", date: "May 2, 10:22 AM", extraMin: 10, status: "pending"  },
        { id: 3, name: "Youssef Taleb", role: "Mobile Developer",  date: "May 1, 2:31 PM",  extraMin: 20, status: "approved" },
        { id: 4, name: "Lina Haddad",   role: "Data Analyst",      date: "Apr 30, 3:55 PM", extraMin: 15, status: "denied"   }
    ],

    feedback: [
        {
            id: 1,
            name: "Youssef Taleb",
            role: "Mobile Developer",
            date: "May 1",
            overallScore: 78,
            skills: [
                { label: "Problem solving", score: 7 },
                { label: "Code quality",    score: 8 },
                { label: "Communication",   score: 8 },
                { label: "System design",   score: 6 }
            ],
            note: "Strong React Native skills. Struggled slightly with state management but recovered well. Great culture fit.",
            decision: "recommend",
            stars: 4,
            submittedDate: "May 2"
        },
        {
            id: 2,
            name: "Nour Amin",
            role: "UX Designer",
            date: "Apr 30",
            overallScore: 65,
            skills: [
                { label: "Problem solving", score: 6   },
                { label: "Design thinking", score: 7.5 },
                { label: "Communication",   score: 7   },
                { label: "Portfolio",       score: 5.5 }
            ],
            note: "Decent design instincts but portfolio lacked depth. Struggled justifying decisions under pressure.",
            decision: "hold",
            stars: 3,
            submittedDate: "May 1"
        }
    ],

    selectedCandidate: {
        id: 2,
        name: "Youssef Taleb",
        role: "Mobile Developer",
        interviewDate: "May 1 at 2:00 PM",
        initials: "YT",
        skills: ["React Native", "Flutter", "TypeScript"],
        resume: [
            "3 years at Cairo Tech Solutions — React Native lead",
            "2 apps on App Store with 50k+ downloads",
            "BSc Computer Science, Cairo University 2021",
            "3 open-source Flutter packages"
        ],
        cvSkills: ["React Native", "Flutter", "TypeScript", "Redux", "Firebase"],
        assessmentScore: 84,
        assessmentDate: "May 1"
    }
};


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/*
    getInitials()
    Converts a full name into 2-letter initials.
    Example: "Sara Mostafa" → "SM"
*/
const getInitials = (name) => {
    const parts = name.split(' ');
    const first = parts[0][0];
    const last  = parts[1] ? parts[1][0] : '';
    return (first + last).toUpperCase();
};


/*
    getBadgeHTML()
    Returns the correct colored badge for a given status.
    Example: status "live" → green "Live now" badge
*/
const getBadgeHTML = (status, soonLabel) => {
    if (status === 'live')      return '<span class="badge badge-live">Live now</span>';
    if (status === 'soon')      return `<span class="badge badge-soon">${soonLabel || 'Soon'}</span>`;
    if (status === 'scheduled') return '<span class="badge badge-sched">Scheduled</span>';
    if (status === 'eval')      return '<span class="badge badge-eval">Needs eval</span>';
    return `<span class="badge badge-sched">${status}</span>`;
};


// ============================================================
// RENDER FUNCTIONS
// ============================================================

/*
    renderUserProfile()
    Fills the sidebar user name, avatar, and the topbar avatar + date.
*/
const renderUserProfile = () => {
    document.getElementById('user-name').textContent      = data.interviewer.name;
    document.getElementById('user-avatar').textContent    = data.interviewer.initials;
    document.getElementById('topbar-avatar').textContent  = data.interviewer.initials;
    document.getElementById('topbar-date').textContent    = `📅 ${new Date().toLocaleDateString()}`;
};


/*
    renderDashboard()
    Fills all dashboard content:
    - stat cards
    - today's interview cards (with working Join/View buttons)
    - pending evaluation cards (with working Evaluate buttons)
    - extension request cards
*/
const renderDashboard = () => {

    // ── Stat cards ──
    document.getElementById('greeting').textContent               = `Good morning, ${data.interviewer.name} 👋`;
    document.getElementById('dashboard-subtitle').textContent     = `You have ${data.stats.todayInterviews} interviews scheduled today.`;
    document.getElementById('stat-interviews').textContent        = data.stats.todayInterviews;
    document.getElementById('stat-evals').textContent             = data.stats.pendingEvals;
    document.getElementById('stat-extensions').textContent        = data.stats.extensionRequests;
    document.getElementById('stat-completed').textContent         = data.stats.completedThisWeek;
    document.getElementById('stat-interviews-hint').textContent   = `Next at ${data.stats.nextInterviewTime}`;
    document.getElementById('stat-completed-hint').textContent    = data.stats.completedChange;

    // ── Nav badges ──
    document.getElementById('badge-candidates').textContent  = data.candidates.length;
    document.getElementById('badge-evaluate').textContent    = data.stats.pendingEvals;
    document.getElementById('badge-extensions').textContent  = data.stats.extensionRequests;

    // ── Today's interview cards ──
    // FIX: Join button → goes to Manage Interviews page
    // FIX: View button → goes to Manage Interviews page
    let interviewHTML = '';

    if (data.todayInterviews.length === 0) {
        interviewHTML = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No interviews today</div></div>';
    } else {
        data.todayInterviews.forEach(interview => {

            // Live interview gets "Join" button, others get "View" button
            // Both navigate to the Manage Interviews page (nav-link index 2)
            const actionBtn = interview.status === 'live'
                ? `<button class="btn btn-primary" onclick="showPage('interviews', document.querySelectorAll('.nav-link')[2])">Join</button>`
                : `<button class="btn" onclick="showPage('interviews', document.querySelectorAll('.nav-link')[2])">View</button>`;

            interviewHTML += `
                <div class="interview-card">
                    <div class="time-box">
                        <div class="time-big">${interview.time}</div>
                        <div class="time-ampm">${interview.ampm}</div>
                    </div>
                    <div class="v-line"></div>
                    <div class="cand-info">
                        <div class="cand-name">${interview.name}</div>
                        <div class="cand-role">${interview.role}</div>
                    </div>
                    ${getBadgeHTML(interview.status, interview.soonLabel)}
                    ${actionBtn}
                </div>`;
        });
    }

    document.getElementById('today-interviews-list').innerHTML = interviewHTML;

    // ── Pending evaluation cards ──
    // FIX: Evaluate button → calls loadCandidate(id) which loads
    //      that specific candidate into the Evaluate page then navigates to it
    let evalHTML = '';

    if (data.pendingEvaluations.length === 0) {
        evalHTML = '<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-text">No pending evaluations</div></div>';
    } else {
        data.pendingEvaluations.forEach(ev => {
            evalHTML += `
                <div class="action-card">
                    <div>
                        <div class="action-name">${ev.name}</div>
                        <div class="action-sub">${ev.role} · ${ev.when}</div>
                    </div>
                    <button class="btn btn-primary" onclick="loadCandidate(${ev.id})">Evaluate</button>
                </div>`;
        });
    }

    document.getElementById('pending-evals-list').innerHTML = evalHTML;

    // ── Extension request cards ──
    let extHTML = '';

    if (data.extensionRequests.length === 0) {
        extHTML = '<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-text">No pending requests</div></div>';
    } else {
        data.extensionRequests.forEach(ext => {
            extHTML += `
                <div class="action-card urgent">
                    <div>
                        <div class="action-name">${ext.name}</div>
                        <div class="action-sub">Requesting +${ext.extraMin} min</div>
                    </div>
                    <div style="display:flex; gap:6px;">
                        <button class="btn-approve" onclick="approveExtension(${ext.id})">Approve</button>
                        <button class="btn-deny"    onclick="denyExtension(${ext.id})">Deny</button>
                    </div>
                </div>`;
        });
    }

    document.getElementById('dashboard-extensions-list').innerHTML = extHTML;
};


/*
    renderCandidates()
    Fills the candidates table.
    Accepts an optional filtered list — used by filterCandidates().
*/
const renderCandidates = (list) => {
    const candidates = list || data.candidates;

    let html = '';

    if (candidates.length === 0) {
        html = '<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-text">No candidates found</div></div>';
    } else {
        candidates.forEach(c => {

            // Eval candidates get an Evaluate button, others get a View button
            const actionBtn = c.status === 'eval'
                ? `<button class="btn btn-primary" onclick="loadCandidate(${c.id})" style="font-size:11px; padding:5px 10px;">Evaluate</button>`
                : `<button class="btn" style="font-size:11px; padding:5px 10px;">View</button>`;

            html += `
                <div class="table-row">
                    <div class="td td-cand">
                        <div class="td-avatar">${getInitials(c.name)}</div>
                        <div>
                            <div>${c.name}</div>
                            <div class="td-muted">${c.email}</div>
                        </div>
                    </div>
                    <div class="td">${c.role}</div>
                    <div class="td-muted">${c.date}</div>
                    <div class="td">${getBadgeHTML(c.status)}</div>
                    <div class="td">${actionBtn}</div>
                </div>`;
        });
    }

    document.getElementById('candidates-table-body').innerHTML = html;
};


/*
    filterCandidates()
    Called when user types in the search box.
    Filters candidates by name or role and re-renders the table.
*/
// Tracks the currently active filters
// So search + filter + status all work TOGETHER at the same time
let activeFilters = {
    search: '',
    status: 'all'
};


/*
    applyFilters()
    Called by any filter change.
    Applies search text AND status filter together on data.candidates.
*/
const applyFilters = () => {

    let filtered = data.candidates;

    // Step 1: filter by search text (name or role)
    if (activeFilters.search !== '') {
        const lower = activeFilters.search.toLowerCase();
        filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(lower) ||
            c.role.toLowerCase().includes(lower)
        );
    }

    // Step 2: filter by status
    if (activeFilters.status !== 'all') {
        filtered = filtered.filter(c => c.status === activeFilters.status);
    }

    // Step 3: render the result
    renderCandidates(filtered);
};


/*
    filterCandidates()
    Called when user types in the search box.
*/
const filterCandidates = (searchText) => {
    activeFilters.search = searchText;
    applyFilters();
};
/*
    filterByStatus()
    Called when user clicks a status button.
    statusValue = 'all' | 'live' | 'eval' | 'soon' | 'scheduled'
*/
const filterByStatus = (statusValue, btn) => {

    // Update the active status filter
    activeFilters.status = statusValue;

    // Highlight the clicked button, un-highlight the others
    document.querySelectorAll('.status-filter-btn').forEach(b => {
        b.classList.remove('active-filter');
    });
    btn.classList.add('active-filter');

    applyFilters();
};


/*
    renderInterviews()
    Fills the Manage Interviews page with the full schedule.
*/
const renderInterviews = () => {
    let html = '';

    if (data.allInterviews.length === 0) {
        html = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No interviews this week</div></div>';
    } else {
        data.allInterviews.forEach(iv => {

            const actionBtn = iv.status === 'live'
                ? `<button class="btn btn-primary">Join</button>`
                : `<button class="btn">Prepare</button>`;

            html += `
                <div class="interview-card">
                    <div class="time-box">
                        <div class="time-big">${iv.time}</div>
                        <div class="time-ampm">${iv.ampm}</div>
                    </div>
                    <div class="v-line"></div>
                    <div class="cand-info">
                        <div class="cand-name">${iv.name} — ${iv.role}</div>
                        <div class="cand-role">${iv.date} · ${iv.type}</div>
                    </div>
                    ${getBadgeHTML(iv.status)}
                    ${actionBtn}
                </div>`;
        });
    }

    document.getElementById('interviews-list').innerHTML = html;
};


/*
    renderEvaluate()
    Fills the Evaluate page with the currently selected candidate's data.
    Called on page load with data.selectedCandidate,
    and also called by loadCandidate() when a specific candidate is chosen.
*/
const renderEvaluate = () => {
    const c = data.selectedCandidate;

    if (!c) return;

    document.getElementById('eval-cand-name').textContent  = c.name;
    document.getElementById('eval-cand-role').textContent  = `${c.role} · Interviewed ${c.interviewDate}`;
    document.getElementById('eval-avatar').textContent     = c.initials;
    document.getElementById('eval-subtitle').textContent   = `Scoring form for ${c.name}.`;

    // Resume bullet points
    let resumeHTML = '';
    c.resume.forEach(item => {
        resumeHTML += `
            <div class="resume-item">
                <div class="resume-dot"></div>
                <div class="resume-text">${item}</div>
            </div>`;
    });
    document.getElementById('eval-resume').innerHTML = resumeHTML;
};


/*
    loadCandidate()
    Called when "Evaluate" button is clicked on a specific candidate.
    
    Steps:
    1. Finds the candidate in data.candidates by their id
    2. Updates data.selectedCandidate with their info
    3. Re-renders the Evaluate page with their data
    4. Resets the form (sliders, stars, comments, decision)
    5. Navigates to the Evaluate page
    
    LATER: Replace the data lookup with a real API call:
      const response = await fetch(`/api/candidates/${id}`);
      data.selectedCandidate = await response.json();
*/
const loadCandidate = (id) => {

    // Find the candidate in our list by id
    const found = data.candidates.find(c => c.id === id);

    // If not found, go to evaluate page anyway
    if (!found) {
        showPage('evaluate', document.querySelectorAll('.nav-link')[3]);
        return;
    }

    // Update selectedCandidate with the found person's data
    // Note: resume, cvSkills, assessmentScore come from backend later
    data.selectedCandidate = {
        id:            found.id,
        name:          found.name,
        role:          found.role,
        interviewDate: found.date,
        initials:      getInitials(found.name),
        skills:        [],       // will come from backend
        resume:        [],       // will come from backend
        cvSkills:      [],       // will come from backend
        assessmentScore: null,   // will come from backend
        assessmentDate:  ''      // will come from backend
    };

    // Re-render the evaluate page with new candidate
    renderEvaluate();

    // ── Reset the form for a fresh evaluation ──

    // Reset all sliders to 5
    document.querySelectorAll('.slider').forEach(slider => {
        slider.value = 5;
    });

    // Reset all score labels next to sliders
    document.getElementById('val-ps').textContent = '5 / 10';
    document.getElementById('val-cq').textContent = '5 / 10';
    document.getElementById('val-sd').textContent = '5 / 10';
    document.getElementById('val-cm').textContent = '5 / 10';
    document.getElementById('val-tf').textContent = '5 / 10';

    // Reset stars to 0
    setStars(0);

    // Clear the comments textarea
    document.getElementById('eval-comments').value = '';

    // Remove "selected" highlight from all decision buttons
    document.querySelectorAll('.decision-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Navigate to the evaluate page and highlight its nav link
    showPage('evaluate', document.querySelectorAll('.nav-link')[3]);
};


/*
    renderExtensions()
    Fills the Session Extensions page.
*/
const renderExtensions = () => {
    let html = '';

    if (data.allExtensions.length === 0) {
        html = '<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-text">No extension requests</div></div>';
    } else {
        data.allExtensions.forEach(ext => {
            const initials   = getInitials(ext.name);
            const statusClass = ext.status !== 'pending' ? ext.status : '';

            // Pending → show approve/deny buttons
            // Approved/Denied → show status label only
            const rightSide = ext.status === 'pending'
                ? `<div class="ext-actions">
                       <button class="btn-approve" onclick="approveExtension(${ext.id})">Approve</button>
                       <button class="btn-deny"    onclick="denyExtension(${ext.id})">Deny</button>
                   </div>`
                : `<span class="ext-status ${ext.status}">${ext.status === 'approved' ? 'Approved ✓' : 'Denied'}</span>`;

            html += `
                <div class="ext-card ${statusClass}">
                    <div class="ext-avatar">${initials}</div>
                    <div class="ext-info">
                        <div class="ext-name">${ext.name}</div>
                        <div class="ext-detail">${ext.role} · ${ext.date}</div>
                    </div>
                    <span class="ext-time">+${ext.extraMin} min</span>
                    ${rightSide}
                </div>`;
        });
    }

    document.getElementById('extensions-list').innerHTML = html;
};


/*
    renderFeedback()
    Fills the View Feedback page with evaluation cards and bar charts.
*/
const renderFeedback = () => {
    let html = '';

    if (data.feedback.length === 0) {
        html = '<div class="empty-state"><div class="empty-icon">💬</div><div class="empty-text">No feedback submitted yet</div></div>';
    } else {
        data.feedback.forEach(fb => {
            const initials = getInitials(fb.name);

            // Build skill bar rows
            let barsHTML = '';
            fb.skills.forEach(skill => {
                const pct = (skill.score / 10) * 100;
                barsHTML += `
                    <div class="bar-row">
                        <span class="bar-label">${skill.label}</span>
                        <div class="bar-track">
                            <div class="bar-fill" style="width:${pct}%"></div>
                        </div>
                        <span class="bar-val">${skill.score}</span>
                    </div>`;
            });

            // Build star display (★ filled, ☆ empty)
            let starsHTML = '';
            for (let k = 1; k <= 5; k++) {
                starsHTML += k <= fb.stars ? '★' : '☆';
            }

            // Decision chip color
            const chipClass = fb.decision === 'recommend'
                ? 'chip-recommend'
                : fb.decision === 'hold'
                    ? 'chip-hold'
                    : 'chip-reject';

            const chipLabel = fb.decision === 'recommend'
                ? '✅ Recommended'
                : fb.decision === 'hold'
                    ? '⏸ Hold'
                    : '❌ Rejected';

            html += `
                <div class="fb-card">
                    <div class="fb-top">
                        <div class="fb-cand">
                            <div class="fb-avatar">${initials}</div>
                            <div>
                                <div class="fb-name">${fb.name}</div>
                                <div class="fb-role">${fb.role} · ${fb.date}</div>
                            </div>
                        </div>
                        <div>
                            <div class="fb-score-big">${fb.overallScore}</div>
                            <div class="fb-score-sub">/ 100 overall</div>
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        ${barsHTML}
                    </div>
                    <div class="fb-note">${fb.note}</div>
                    <div class="fb-footer">
                        <span class="decision-chip ${chipClass}">${chipLabel}</span>
                        <span class="fb-date">Submitted ${fb.submittedDate} · ${starsHTML}</span>
                    </div>
                </div>`;
        });
    }

    document.getElementById('feedback-list').innerHTML = html;
};


// ============================================================
// ACTION FUNCTIONS
// Replace alert() with your real API calls later
// ============================================================

/*
    approveExtension()
    Approves an extension request by id, updates the data, re-renders.
    LATER: fetch(`/api/extensions/${id}/approve`, { method: 'POST' })
*/
const approveExtension = (id) => {
    data.allExtensions.forEach(ext => {
        if (ext.id === id) ext.status = 'approved';
    });
    data.extensionRequests = data.extensionRequests.filter(e => e.id !== id);
    data.stats.extensionRequests = data.extensionRequests.length;
    renderExtensions();
    renderDashboard();
    alert(`Extension approved! (In production: POST to /api/extensions/${id}/approve)`);
};


/*
    denyExtension()
    Denies an extension request by id, updates the data, re-renders.
    LATER: fetch(`/api/extensions/${id}/deny`, { method: 'POST' })
*/
const denyExtension = (id) => {
    data.allExtensions.forEach(ext => {
        if (ext.id === id) ext.status = 'denied';
    });
    data.extensionRequests = data.extensionRequests.filter(e => e.id !== id);
    data.stats.extensionRequests = data.extensionRequests.length;
    renderExtensions();
    renderDashboard();
    alert(`Extension denied! (In production: POST to /api/extensions/${id}/deny)`);
};


/*
    submitEvaluation()
    Collects all form values and shows what would be sent to backend.
    LATER: fetch('/api/evaluations', { method: 'POST', body: JSON.stringify(evalData) })
*/
const submitEvaluation = () => {
    const evalData = {
        candidateId:   data.selectedCandidate.id,
        problemSolving: document.querySelector('[oninput*="val-ps"]').value,
        codeQuality:    document.querySelector('[oninput*="val-cq"]').value,
        systemDesign:   document.querySelector('[oninput*="val-sd"]').value,
        communication:  document.querySelector('[oninput*="val-cm"]').value,
        cultureFit:     document.querySelector('[oninput*="val-tf"]').value,
        comments:       document.getElementById('eval-comments').value,
        decision:       document.querySelector('.decision-btn.selected')?.textContent.trim() || 'None'
    };
    alert(`Evaluation ready!\n\n${JSON.stringify(evalData, null, 2)}`);
};


const saveDraft = () => {
    alert('Draft saved! (In production: POST to /api/evaluations/draft)');
};


// ============================================================
// PAGE NAVIGATION
// ============================================================

/*
    showPage()
    Switches which page is visible.
    Hides all pages → shows the selected one → updates nav highlight → updates breadcrumb.
*/
const showPage = (pageKey, clickedLink) => {

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show the selected page
    document.getElementById(`page-${pageKey}`).classList.add('active');

    // Remove active style from all nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    // Add active style to the clicked nav link
    if (clickedLink) clickedLink.classList.add('active');

    // Update breadcrumb text
    const pageNames = {
        'dashboard':  'Dashboard',
        'candidates': 'Assigned Candidates',
        'interviews': 'Manage Interviews',
        'evaluate':   'Evaluate Candidates',
        'extensions': 'Session Extensions',
        'feedback':   'View Feedback'
    };
    document.getElementById('breadcrumb-text').textContent = pageNames[pageKey] || pageKey;
};


/*
    setStars()
    Fills or unfills star icons up to the clicked star number.
    n = number of stars to fill (1–5), or 0 to reset all
*/
const setStars = (n) => {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < n) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
};


/*
    selectDecision()
    Highlights the clicked Recommend / Hold / Reject button
    and removes highlight from the others.
*/
const selectDecision = (btn) => {
    btn.parentNode.querySelectorAll('.decision-btn').forEach(b => {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
};


renderUserProfile();
renderDashboard();
renderCandidates();
renderInterviews();
renderEvaluate();
renderExtensions();
renderFeedback();
