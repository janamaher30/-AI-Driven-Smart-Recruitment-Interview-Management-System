
/*SECTION 1: DATA
    Replace this whole section with your real API call later:
    const data = await fetch('/api/candidate/dashboard').then(r => r.json());*/

var data = {

    candidate: {
        name: "Youssef Taleb",
        initials: "YT",
        email: "youssef@email.com",
        phone: "+20 100 123 4567",
        location: "Cairo, Egypt",
        linkedin: "linkedin.com/in/yousseftaleb",
        experience: 3,
        role: "Mobile Developer",
        skills: ["React Native", "Flutter", "TypeScript", "Redux", "Firebase"]
    },

    stats: {
        applied: 4,
        appliedHint: "2 active",
        interviews: 1,
        assessments: 2,
        assessmentsHint: "1 pending",
        offers: 1
    },

    // Jobs to apply for
    jobs: [
        { id: 1, title: "Senior React Native Developer", company: "Noon Egypt",       logo: "🛒", location: "Cairo", type: "Full-time", salary: "$3,000–4,500/mo", posted: "2 days ago",  applied: false },
        { id: 2, title: "Flutter Developer",             company: "Vodafone Egypt",   logo: "📡", location: "Giza",  type: "Full-time", salary: "$2,500–3,500/mo", posted: "4 days ago",  applied: true  },
        { id: 3, title: "Mobile Tech Lead",              company: "Instabug",         logo: "🐛", location: "Cairo", type: "Hybrid",    salary: "$4,000–6,000/mo", posted: "1 week ago",  applied: false },
        { id: 4, title: "React Native Engineer",         company: "Paymob",           logo: "💳", location: "Cairo", type: "Remote",    salary: "$2,800–4,000/mo", posted: "3 days ago",  applied: false }
    ],

    // Application pipeline stages
    applications: [
        { id: 1, title: "Flutter Developer",     company: "Vodafone Egypt", logo: "📡", stage: 3, stages: ["Applied","Screened","Assessment","Interview","Offer"] },
        { id: 2, title: "React Native Engineer", company: "Paymob",         logo: "💳", stage: 1, stages: ["Applied","Screened","Assessment","Interview","Offer"] }
    ],

    // Upcoming interviews
    interviews: [
        { id: 1, company: "Vodafone Egypt", role: "Flutter Developer", date: "May 5, 2026", time: "11:00 AM", type: "Technical", status: "upcoming" },
        { id: 2, company: "Paymob",         role: "React Native",      date: "May 8, 2026", time: "2:00 PM",  type: "HR",        status: "upcoming" }
    ],

    // Assessment questions
    assessment: {
        title: "Flutter Developer — Technical Assessment",
        totalQuestions: 10,
        currentQuestion: 0,
        timeLeft: "45:00",
        questions: [
        {
            text: "Which widget in Flutter is used to create a scrollable list of widgets?",
            options: ["Column", "ListView", "Stack", "Container"],
            correct: 1
        },
        {
            text: "What does the 'async' keyword do in Dart?",
            options: [
            "Makes a function return void",
            "Makes a function run on a separate thread",
            "Marks a function as asynchronous, allowing use of await",
            "Disables error handling"
            ],
            correct: 2
        },
        {
            text: "Which state management solution uses 'ChangeNotifier'?",
            options: ["Bloc", "Provider", "Riverpod", "GetX"],
            correct: 1
        }
        ]
    },

    // Competency feedback
    feedback: {
        competencies: [
            { label: "Problem Solving",   score: 7,   level: "medium" },
            { label: "Code Quality",      score: 8,   level: "strong" },
            { label: "System Design",     score: 5,   level: "weak"   },
            { label: "Communication",     score: 8,   level: "strong" },
            { label: "Culture Fit",       score: 9,   level: "strong" }
        ],
        gaps: [
            { area: "System Design", note: "Struggled with complex architecture patterns. Recommended: study microservices and distributed systems." },
            { area: "State Management", note: "Needs deeper understanding of advanced state management in large-scale apps." }
        ],
        interviewerComment: "Youssef showed strong fundamentals and clean code. He has great communication skills and fits the team culture well. The main area to improve is system-level thinking for larger applications. We recommend revisiting system design resources before the next round."
    },

    // Offer details
    offer: {
        company: "Vodafone Egypt",
        logo: "📡",
        role: "Flutter Developer",
        salary: "$3,200 / month",
        startDate: "June 1, 2026",
        location: "Giza, Egypt (Hybrid)",
        contractType: "Full-time",
        deadline: "May 10, 2026",
      status: "pending"   // pending / accepted / declined
    },

    // Onboarding checklist
    onboarding: [
        { id: 1, title: "Submit National ID copy",       detail: "Upload a clear scan of both sides",  done: true  },
        { id: 2, title: "Sign employment contract",      detail: "Review and e-sign your offer letter", done: true  },
        { id: 3, title: "Complete tax form",             detail: "Form 1 — required by HR",             done: false },
        { id: 4, title: "Upload university certificate", detail: "Original or notarized copy",          done: false },
        { id: 5, title: "Submit medical clearance",      detail: "From any certified clinic",           done: false },
        { id: 6, title: "Set up company email",          detail: "IT will send you credentials",        done: false }
    ],

    // Notifications
    notifications: [
        { id: 1, icon: "🎉", iconClass: "green",  title: "Offer received!",          body: "Vodafone Egypt has sent you a job offer for Flutter Developer.", time: "2 hours ago", read: false },
        { id: 2, icon: "📅", iconClass: "blue",   title: "Interview scheduled",      body: "Your technical interview is set for May 5 at 11:00 AM.",         time: "Yesterday",   read: false },
        { id: 3, icon: "📝", iconClass: "yellow", title: "Assessment reminder",      body: "You have a pending assessment for Vodafone Egypt. Due May 4.",   time: "2 days ago",  read: true  },
        { id: 4, icon: "✅", iconClass: "green",  title: "Application shortlisted",  body: "Paymob has moved your application to the interview stage.",       time: "3 days ago",  read: true  },
        { id: 5, icon: "💬", iconClass: "purple", title: "Feedback available",       body: "Your assessment feedback from Vodafone Egypt is ready to view.", time: "4 days ago",  read: true  }
    ],

    // Credentials for profile page
    credentials: [
        { title: "BSc Computer Science, Cairo University", year: "2021", status: "verified"  },
        { title: "React Native Certificate — Meta",         year: "2023", status: "verified"  },
        { title: "Flutter Developer Certificate — Google",  year: "2024", status: "pending"   }
    ]

};


/*SECTION 2: HELPER FUNCTIONS*/

  /* Returns initials from a full name: "Youssef Taleb" → "YT" */
    function getInitials(name) {
        var parts = name.split(' ');
        return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    }


/*SECTION 3: RENDER FUNCTIONS*/

  /* Fill sidebar user info and topbar */
    function renderUserProfile() {
        var c = data.candidate;
        document.getElementById('user-name').textContent       = c.name;
        document.getElementById('user-avatar').textContent     = c.initials;
        document.getElementById('topbar-avatar').textContent   = c.initials;
        document.getElementById('profile-avatar-big').textContent = c.initials;
        document.getElementById('profile-name-big').textContent   = c.name;
        document.getElementById('profile-email-big').textContent  = c.email;
        document.getElementById('profile-role-big').textContent   = c.role;

        // Fill form inputs
        document.getElementById('profile-fullname').value  = c.name;
        document.getElementById('profile-email').value     = c.email;
        document.getElementById('profile-phone').value     = c.phone;
        document.getElementById('profile-location').value  = c.location;
        document.getElementById('profile-linkedin').value  = c.linkedin;
        document.getElementById('profile-exp').value       = c.experience;

        // Today's date in topbar
        var today = new Date();
        var options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        document.getElementById('topbar-date').textContent = '📅 ' + today.toLocaleDateString('en-US', options);

        // Notification dot visibility
        var unread = data.notifications.filter(function(n) { return !n.read; }).length;
        document.getElementById('notif-dot').style.display = unread > 0 ? 'block' : 'none';
        document.getElementById('badge-notifs').textContent = unread;
        document.getElementById('notif-subtitle').textContent = unread + ' unread notifications.';
    }


  /* Fill dashboard page */
function renderDashboard() {
    var s = data.stats;
    document.getElementById('greeting').textContent          = 'Welcome back, ' + data.candidate.name + ' 👋';
    document.getElementById('stat-applied').textContent      = s.applied;
    document.getElementById('stat-applied-hint').textContent = s.appliedHint;
    document.getElementById('stat-interviews').textContent   = s.interviews;
    document.getElementById('stat-assessments').textContent  = s.assessments;
    document.getElementById('stat-asm-hint').textContent     = s.assessmentsHint;
    document.getElementById('stat-offers').textContent       = s.offers;

    // Badge counts
    document.getElementById('badge-jobs').textContent       = data.jobs.filter(function(j){ return !j.applied; }).length;
    document.getElementById('badge-interviews').textContent = data.interviews.length;
    document.getElementById('badge-offer').textContent      = data.offer.status === 'pending' ? '1' : '0';

    // Sidebar progress (based on onboarding items)
    var done  = data.onboarding.filter(function(o){ return o.done; }).length;
    var total = data.onboarding.length;
    var pct   = Math.round((done / total) * 100);
    document.getElementById('sidebar-progress-title').textContent   = data.offer.role + ' @ ' + data.offer.company;
    document.getElementById('sidebar-progress-fill').style.width    = pct + '%';
    document.getElementById('sidebar-progress-pct').textContent     = pct + '% onboarding complete';

    // Dashboard interview list
    var intHTML = '';
    if (data.interviews.length === 0) {
        intHTML = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No upcoming interviews</div></div>';
    } else {
            for (var i = 0; i < data.interviews.length; i++) {
            var iv = data.interviews[i];
            intHTML += '<div style="display:flex;align-items:center;gap:12px;padding:10px;border:1px solid var(--border);border-radius:10px;margin-bottom:8px;">'
            + '<div style="font-size:22px;">📅</div>'
            + '<div style="flex:1;"><div style="font-size:13px;font-weight:500;color:var(--blue-dark);">' + iv.role + '</div>'
            + '<div style="font-size:11px;color:var(--gray);">' + iv.company + ' · ' + iv.date + ' at ' + iv.time + '</div></div>'
            + '<span class="badge badge-pending">' + iv.type + '</span>'
            + '</div>';
        }
    }
    document.getElementById('dashboard-interviews-list').innerHTML = intHTML;

    // Dashboard recent notifications (show first 3)
    var notifHTML = '';
    var recent = data.notifications.slice(0, 3);
    for (var i = 0; i < recent.length; i++) {
        var n = recent[i];
        notifHTML += '<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">'
            + '<div class="notif-icon ' + n.iconClass + '" style="width:32px;height:32px;font-size:14px;">' + n.icon + '</div>'
            + '<div><div style="font-size:12px;font-weight:500;color:var(--blue-dark);">' + n.title + '</div>'
            + '<div style="font-size:11px;color:var(--gray);">' + n.time + '</div></div>'
            + (n.read ? '' : '<div class="unread-dot" style="margin-left:auto;margin-top:4px;"></div>')
            + '</div>';
    }
    document.getElementById('dashboard-notifs-list').innerHTML = notifHTML;

    // Dashboard onboarding preview (first 3 items)
    var onHTML = '';
    var preview = data.onboarding.slice(0, 3);
    for (var i = 0; i < preview.length; i++) {
        var o = preview[i];
        onHTML += '<div class="onboard-item ' + (o.done ? 'completed' : '') + '">'
            + '<div class="onboard-check">' + (o.done ? '✓' : '') + '</div>'
            + '<div class="onboard-info"><div class="onboard-title">' + o.title + '</div>'
            + '<div class="onboard-detail">' + o.detail + '</div></div>'
            + '</div>';
    }
    document.getElementById('dashboard-onboarding-preview').innerHTML = onHTML;
}


  /* Fill jobs page */
function renderJobs(list) {
    var jobs = list || data.jobs;
    document.getElementById('jobs-subtitle').textContent = jobs.length + ' positions matched to your profile.';

    var html = '';
    if (jobs.length === 0) {
        html = '<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-text">No jobs found</div></div>';
    } else {
            for (var i = 0; i < jobs.length; i++) {
            var j = jobs[i];
            html += '<div class="job-card">'
            + '<div class="job-top">'
            + '<div style="display:flex;gap:12px;align-items:flex-start;">'
            + '<div class="job-logo">' + j.logo + '</div>'
            + '<div><div class="job-title">' + j.title + '</div><div class="job-company">' + j.company + '</div></div>'
            + '</div>'
            + (j.applied ? '<span class="badge badge-done">Applied</span>' : '<span class="badge badge-new">New</span>')
            + '</div>'
            + '<div class="job-meta">'
            + '<span class="job-tag">📍 ' + j.location + '</span>'
            + '<span class="job-tag">🕐 ' + j.type + '</span>'
            + '</div>'
            + '<div class="job-footer">'
            + '<div class="job-salary">' + j.salary + '</div>'
            + '<div style="display:flex;align-items:center;gap:10px;">'
            + '<span class="job-posted">Posted ' + j.posted + '</span>'
            + (j.applied
                ? '<button class="btn" disabled style="opacity:0.5;cursor:default;">✓ Applied</button>'
                : '<button class="btn btn-primary" onclick="applyToJob(' + j.id + ')">Apply now</button>')
            + '</div></div>'
            + '</div>';
        }
        }
        document.getElementById('jobs-list').innerHTML = html;
}


  /* Search/filter jobs by title or company */
function filterJobs(text) {
    var lower = text.toLowerCase();
    var filtered = data.jobs.filter(function(j) {
        return j.title.toLowerCase().includes(lower) || j.company.toLowerCase().includes(lower);
    });
    renderJobs(filtered);
}


  /* Fill progress/applications page */
function renderProgress() {
    var html = '';
    if (data.applications.length === 0) {
        html = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No applications yet</div></div>';
    } else {
        for (var i = 0; i < data.applications.length; i++) {
            var app = data.applications[i];
            // Build pipeline steps
            var pipelineHTML = '';
            for (var s = 0; s < app.stages.length; s++) {
            var cls = s < app.stage ? 'done' : (s === app.stage ? 'current' : '');
            pipelineHTML += '<div class="pipeline-step">'
                + '<div class="step-dot ' + cls + '"></div>'
                + '<div class="step-label ' + cls + '">' + app.stages[s] + '</div>'
                + '</div>';
            if (s < app.stages.length - 1) {
                pipelineHTML += '<div class="step-line ' + (s < app.stage ? 'done' : '') + '"></div>';
            }
        }

            html += '<div class="app-card">'
            + '<div class="app-logo">' + app.logo + '</div>'
            + '<div class="app-info"><div class="app-title">' + app.title + '</div><div class="app-company">' + app.company + '</div></div>'
            + '<div class="pipeline" style="max-width:400px;">' + pipelineHTML + '</div>'
            + '</div>';
        }
    }
    document.getElementById('progress-list').innerHTML = html;
}


  /* Fill assessment page */
  function renderAssessment() {
    var asm = data.assessment;
    document.getElementById('asm-subtitle').textContent = asm.title;
    document.getElementById('q-total').textContent      = asm.totalQuestions;
    renderQuestion(asm.currentQuestion);
  }

  function renderQuestion(index) {
    var asm = data.assessment;
    var q   = asm.questions[index] || null;

    document.getElementById('q-current').textContent = index + 1;
    var pct = Math.round(((index + 1) / asm.totalQuestions) * 100);
    document.getElementById('q-pct').textContent = pct + '% complete';
    document.getElementById('asm-progress-fill').style.width = pct + '%';

    if (!q) {
      document.getElementById('question-card').innerHTML = '<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-text">Assessment complete!</div></div>';
      return;
    }

    var optionLetters = ['A', 'B', 'C', 'D'];
    var optionsHTML = '';
    for (var i = 0; i < q.options.length; i++) {
      optionsHTML += '<div class="option" onclick="selectOption(this,' + i + ')">'
        + '<div class="option-letter">' + optionLetters[i] + '</div>'
        + '<div class="option-text">' + q.options[i] + '</div>'
        + '</div>';
    }

    document.getElementById('question-card').innerHTML =
      '<div class="question-number">Question ' + (index + 1) + ' of ' + asm.questions.length + '</div>'
      + '<div class="question-text">' + q.text + '</div>'
      + '<div class="options">' + optionsHTML + '</div>';
  }

  function selectOption(el, index) {
    // Remove selected from all options
    var allOptions = el.closest('.options').querySelectorAll('.option');
    for (var i = 0; i < allOptions.length; i++) {
      allOptions[i].classList.remove('selected');
    }
    el.classList.add('selected');
  }

  function nextQuestion() {
    var asm = data.assessment;
    if (asm.currentQuestion < asm.questions.length - 1) {
      asm.currentQuestion++;
      renderQuestion(asm.currentQuestion);
    } else {
      alert('Assessment submitted! (In production: sends answers to backend API)');
    }
  }

  function prevQuestion() {
    var asm = data.assessment;
    if (asm.currentQuestion > 0) {
      asm.currentQuestion--;
      renderQuestion(asm.currentQuestion);
    }
  }

  function setDifficulty(level, btn) {
    var allBtns = btn.closest('.difficulty-row').querySelectorAll('.diff-btn');
    for (var i = 0; i < allBtns.length; i++) {
      allBtns[i].classList.remove('active');
    }
    btn.classList.add('active');
    alert('Difficulty set to "' + level + '". (In production: sends to backend, loads new question set)');
  }

  function requestExtension() {
    var panel = document.getElementById('extension-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  function submitExtensionRequest(minutes) {
    document.getElementById('extension-panel').style.display = 'none';
    alert('+' + minutes + ' min extension requested! Your interviewer will be notified. (In production: POST to backend API)');
  }


  /* Fill interviews page */
  function renderInterviews() {
    var html = '';
    if (data.interviews.length === 0) {
      html = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No interviews scheduled</div></div>';
    } else {
      for (var i = 0; i < data.interviews.length; i++) {
        var iv = data.interviews[i];
        html += '<div style="background:var(--white);border:1px solid var(--border);border-left:4px solid var(--blue-main);border-radius:12px;padding:18px;display:flex;align-items:center;gap:16px;">'
          + '<div style="font-size:32px;">📅</div>'
          + '<div style="flex:1;">'
          + '<div style="font-size:14px;font-weight:600;color:var(--blue-dark);">' + iv.role + ' — ' + iv.type + ' Interview</div>'
          + '<div style="font-size:12px;color:var(--gray);margin-top:4px;">📍 ' + iv.company + ' &nbsp;·&nbsp; 🕐 ' + iv.date + ' at ' + iv.time + '</div>'
          + '</div>'
          + '<span class="badge badge-pending">Upcoming</span>'
          + '<button class="btn btn-primary" onclick="joinInterview(' + iv.id + ')">Join Session</button>'
          + '</div>';
      }
    }
    document.getElementById('interview-list').innerHTML = html;
  }


  /* Fill feedback page */
  function renderFeedback() {
    var fb = data.feedback;

    // Competency bars
    var barsHTML = '';
    for (var i = 0; i < fb.competencies.length; i++) {
      var comp = fb.competencies[i];
      var pct  = (comp.score / 10) * 100;
      barsHTML += '<div class="competency-row">'
        + '<div class="comp-label">' + comp.label + '</div>'
        + '<div class="comp-track"><div class="comp-fill ' + comp.level + '" style="width:' + pct + '%"></div></div>'
        + '<div class="comp-val">' + comp.score + '/10</div>'
        + '</div>';
    }
    document.getElementById('competency-bars').innerHTML = barsHTML;

    // Gaps
    var gapHTML = '';
    for (var i = 0; i < fb.gaps.length; i++) {
      var g = fb.gaps[i];
      gapHTML += '<div class="gap-card" style="margin-bottom:10px;">'
        + '<div class="gap-icon">⚠️</div>'
        + '<div><div class="gap-title">' + g.area + '</div><div class="gap-text">' + g.note + '</div></div>'
        + '</div>';
    }
    document.getElementById('gap-list').innerHTML = gapHTML;

    // Interviewer comment
    document.getElementById('interviewer-comments').innerHTML =
      '<div style="font-size:13px;color:var(--gray);line-height:1.7;background:var(--blue-pale);border-left:3px solid var(--blue-main);border-radius:8px;padding:14px 16px;">'
      + fb.interviewerComment + '</div>';
  }


  /* Fill offer page */
  function renderOffer() {
    var o = data.offer;
    if (o.status === 'accepted') {
      document.getElementById('offer-content').innerHTML =
        '<div class="empty-state"><div class="empty-icon">🎉</div><div class="empty-text">You accepted this offer! Welcome aboard.</div></div>';
      return;
    }

    document.getElementById('offer-content').innerHTML =
      '<div class="offer-card">'
      + '<div class="offer-logo">' + o.logo + '</div>'
      + '<div class="offer-company">' + o.company + '</div>'
      + '<div class="offer-role">' + o.role + '</div>'
      + '<div class="offer-details">'
      + '<div class="offer-row"><span class="offer-row-label">💰 Salary</span><span class="offer-row-val">' + o.salary + '</span></div>'
      + '<div class="offer-row"><span class="offer-row-label">📅 Start date</span><span class="offer-row-val">' + o.startDate + '</span></div>'
      + '<div class="offer-row"><span class="offer-row-label">📍 Location</span><span class="offer-row-val">' + o.location + '</span></div>'
      + '<div class="offer-row"><span class="offer-row-label">📝 Contract</span><span class="offer-row-val">' + o.contractType + '</span></div>'
      + '<div class="offer-row"><span class="offer-row-label">⏳ Respond by</span><span class="offer-row-val" style="color:#ef4444;">' + o.deadline + '</span></div>'
      + '</div>'
      + '<div class="offer-actions">'
      + '<button class="btn-accept" onclick="acceptOffer()">✅ Accept Offer</button>'
      + '<button class="btn-negotiate" onclick="negotiateOffer()">💬 Negotiate</button>'
      + '<button class="btn-decline" onclick="declineOffer()">Decline</button>'
      + '</div>'
      + '</div>';
  }


  /* Fill onboarding page */
  function renderOnboarding() {
    var done  = data.onboarding.filter(function(o){ return o.done; }).length;
    var total = data.onboarding.length;
    document.getElementById('onboarding-subtitle').textContent = done + ' of ' + total + ' items completed.';

    var html = '';
    for (var i = 0; i < data.onboarding.length; i++) {
      var o = data.onboarding[i];
      html += '<div class="onboard-item ' + (o.done ? 'completed' : '') + '" onclick="toggleOnboarding(' + o.id + ', this)">'
        + '<div class="onboard-check">' + (o.done ? '✓' : '') + '</div>'
        + '<div class="onboard-info"><div class="onboard-title">' + o.title + '</div><div class="onboard-detail">' + o.detail + '</div></div>'
        + (o.done ? '<span class="badge badge-done">Done</span>' : '<button class="btn btn-primary" style="font-size:11px;padding:5px 12px;">Upload</button>')
        + '</div>';
    }
    document.getElementById('onboarding-list').innerHTML = html;
  }


  /* Fill notifications page */
  function renderNotifications() {
    var html = '';
    for (var i = 0; i < data.notifications.length; i++) {
      var n = data.notifications[i];
      html += '<div class="notif-item ' + (n.read ? '' : 'unread') + '" onclick="markRead(' + n.id + ', this)">'
        + '<div class="notif-icon ' + n.iconClass + '">' + n.icon + '</div>'
        + '<div class="notif-content">'
        + '<div class="notif-title">' + n.title + '</div>'
        + '<div class="notif-body">' + n.body + '</div>'
        + '<div class="notif-time">' + n.time + '</div>'
        + '</div>'
        + (!n.read ? '<div class="unread-dot"></div>' : '')
        + '</div>';
    }
    document.getElementById('notif-list').innerHTML = html;
  }


  /* Fill profile skills and credentials */
  function renderProfile() {
    // Skill tags
    var skillHTML = '';
    for (var i = 0; i < data.candidate.skills.length; i++) {
      var s = data.candidate.skills[i];
      skillHTML += '<div class="skill-tag">' + s + '<span class="skill-tag-remove" onclick="removeSkill(\'' + s + '\')">×</span></div>';
    }
    document.getElementById('skill-tag-list').innerHTML = skillHTML;

    // Credentials
    var credHTML = '';
    for (var i = 0; i < data.credentials.length; i++) {
      var c = data.credentials[i];
      var statusBadge = c.status === 'verified'
        ? '<span class="badge badge-accepted">✓ Verified</span>'
        : '<span class="badge badge-pending">Pending</span>';
      credHTML += '<div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:10px;margin-bottom:8px;">'
        + '<div style="font-size:22px;">🎓</div>'
        + '<div style="flex:1;"><div style="font-size:13px;font-weight:500;color:var(--blue-dark);">' + c.title + '</div>'
        + '<div style="font-size:11px;color:var(--gray);">' + c.year + '</div></div>'
        + statusBadge + '</div>';
    }
    document.getElementById('credential-list').innerHTML = credHTML;
  }


  /*SECTION 4: ACTION FUNCTIONS
    (Replace alert() with your real API calls)*/

  function applyToJob(id) {
    for (var i = 0; i < data.jobs.length; i++) {
      if (data.jobs[i].id === id) {
        data.jobs[i].applied = true;
        data.stats.applied++;
      }
    }
    renderJobs();
    alert('Application submitted! (In production: POST to /api/jobs/' + id + '/apply)');
  }

  function joinInterview(id) {
    alert('Joining interview session ' + id + '... (In production: redirects to live session URL from backend)');
  }

  function acceptOffer() {
    data.offer.status = 'accepted';
    renderOffer();
    alert('Offer accepted! 🎉 (In production: POST to /api/offers/' + data.offer.company + '/accept)\nHR will be notified.');
  }

  function negotiateOffer() {
    var msg = prompt('What would you like to negotiate? Write your message to HR:');
    if (msg) {
      alert('Negotiation message sent! (In production: POST to /api/offers/negotiate with message body)');
    }
  }

  function declineOffer() {
    if (confirm('Are you sure you want to decline this offer?')) {
      data.offer.status = 'declined';
      renderOffer();
      alert('Offer declined. (In production: POST to /api/offers/decline)');
    }
  }

  function toggleOnboarding(id, el) {
    for (var i = 0; i < data.onboarding.length; i++) {
      if (data.onboarding[i].id === id) {
        data.onboarding[i].done = !data.onboarding[i].done;
      }
    }
    renderOnboarding();
  }

  function markRead(id, el) {
    for (var i = 0; i < data.notifications.length; i++) {
      if (data.notifications[i].id === id) {
        data.notifications[i].read = true;
      }
    }
    el.classList.remove('unread');
    var dot = el.querySelector('.unread-dot');
    if (dot) dot.remove();
    // Update notification badge count
    var unread = data.notifications.filter(function(n){ return !n.read; }).length;
    document.getElementById('badge-notifs').textContent = unread;
    document.getElementById('notif-dot').style.display  = unread > 0 ? 'block' : 'none';
  }

  function addSkill() {
    var input = document.getElementById('new-skill-input');
    var skill = input.value.trim();
    if (!skill) return;
    data.candidate.skills.push(skill);
    input.value = '';
    renderProfile();
  }

  function removeSkill(skill) {
    data.candidate.skills = data.candidate.skills.filter(function(s){ return s !== skill; });
    renderProfile();
  }

  function saveProfile() {
    // Collect values from the form inputs
    data.candidate.name     = document.getElementById('profile-fullname').value;
    data.candidate.phone    = document.getElementById('profile-phone').value;
    data.candidate.location = document.getElementById('profile-location').value;
    data.candidate.linkedin = document.getElementById('profile-linkedin').value;
    data.candidate.experience = document.getElementById('profile-exp').value;
    alert('Profile saved! (In production: PUT to /api/candidate/profile with updated data)');
    renderUserProfile();
  }


  /*SECTION 5: PAGE NAVIGATION*/

  function showPage(pageKey, clickedLink) {
    // Hide all pages
    var allPages = document.querySelectorAll('.page');
    for (var i = 0; i < allPages.length; i++) {
      allPages[i].classList.remove('active');
    }

    // Show selected page
    document.getElementById('page-' + pageKey).classList.add('active');

    // Update nav link styles
    var allLinks = document.querySelectorAll('.nav-link');
    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].classList.remove('active');
    }
    if (clickedLink) clickedLink.classList.add('active');

    // Update breadcrumb
    var pageNames = {
      'dashboard':     'Dashboard',
      'jobs':          'Apply for Jobs',
      'progress':      'Monitor Progress',
      'assessment':    'Take Assessment',
      'interview':     'My Interviews',
      'feedback':      'Feedback & Gaps',
      'offer':         'Offer Letter',
      'onboarding':    'Pre-Onboarding',
      'notifications': 'Notifications',
      'profile':       'My Profile'
    };
    document.getElementById('breadcrumb-text').textContent = pageNames[pageKey] || pageKey;
  }




  renderUserProfile();
  renderDashboard();
  renderJobs();
  renderProgress();
  renderAssessment();
  renderInterviews();
  renderFeedback();
  renderOffer();
  renderOnboarding();
  renderNotifications();
  renderProfile();