function updateInterviewDate() {
    const newDate = document.getElementById('rescheduleDate').value;
    const newTime = document.getElementById('rescheduleTime').value;
    const API_BASE = 'http://127.0.0.1:8000/api';

    if (!newDate || !newTime) return;

    const activeRow = document.querySelector('tr[data-interview-id]');
    const interviewId = activeRow ? activeRow.getAttribute('data-interview-id') : null;
    if (!interviewId) {
        alert('No interview selected for rescheduling.');
        return;
    }

    fetch(API_BASE + '/interviews/reschedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            interviewId: interviewId,
            date: newDate,
            time: newTime
        })
    })
        .then(async (res) => {
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.message || 'Failed to reschedule');
            alert(`Successfully rescheduled to ${newDate} at ${newTime}`);
            const modal = bootstrap.Modal.getInstance(document.getElementById('rescheduleModal'));
            if (modal) modal.hide();
            const timeCell = document.querySelector('.interview-time-cell');
            if (timeCell) timeCell.innerText = `${newDate} ${newTime}`;
        })
        .catch((err) => {
            alert(err.message);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const API_BASE = 'http://127.0.0.1:8000/api';
    const tbody = document.querySelector('table tbody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">Loading interviews...</td></tr>';

    fetch(API_BASE + '/interviews', { headers: { Accept: 'application/json' } })
        .then(async (res) => {
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.message || 'Failed to load interviews');
            const interviews = Array.isArray(payload.interviews) ? payload.interviews : [];

            if (!interviews.length) {
                tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No interviews found.</td></tr>';
                return;
            }

            tbody.innerHTML = interviews.map((interview) => {
                const interviewId = interview.interviewId || interview.id;
                const candidate = interview.candidateName || interview.candidate_name || 'Candidate';
                const role = interview.role || 'Role';
                const type = interview.type || 'Interview';
                const dateLabel = interview.scheduled_at || interview.date || 'Not scheduled';
                const interviewerName = interview.interviewerName || 'Interviewer';
                const score = interview.score || '--';
                const status = interview.status || 'SCHEDULED';
                return `
                    <tr data-interview-id="${interviewId}">
                        <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                                <img src="https://i.pravatar.cc/150?u=${interviewId}" class="candidate-img me-3">
                                <div>
                                    <div class="fw-bold">${candidate}</div>
                                    <div class="x-small text-muted">${role}</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-soft-info text-info rounded-pill px-3 fw-600">${type}</span></td>
                        <td class="interview-time-cell">${dateLabel}</td>
                        <td>${interviewerName}</td>
                        <td><div class="ai-badge bg-soft-success">${score}</div></td>
                        <td><span class="status-pill status-interview">${status}</span></td>
                        <td class="text-end pe-4">
                            <button class="btn btn-primary btn-sm rounded-3 px-3 fw-bold">Join</button>
                        </td>
                    </tr>`;
            }).join('');
        })
        .catch((err) => {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-danger">${err.message}</td></tr>`;
        });
});