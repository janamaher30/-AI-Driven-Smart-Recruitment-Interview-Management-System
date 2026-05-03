document.addEventListener('DOMContentLoaded', function() {
    const API_BASE = 'http://127.0.0.1:8000/api';
    const searchInput = document.getElementById('jobSearchInput');
    const table = document.getElementById('jobsTable');
    const tbody = table ? table.querySelector('tbody') : null;
    let jobs = [];

    function renderRows(list) {
        if (!tbody) return;
        if (!list.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-5 text-muted">
                        No jobs found.
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = list.map((job) => {
            const title = job.title || job.jobTitle || 'Untitled Job';
            const location = job.location || 'N/A';
            const status = (job.status || 'active').toString();
            const applicants = Number(job.applicants_count || 0);
            const aiMatch = Number(job.ai_match || 0);
            const posted = job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A';
            return `
                <tr>
                    <td>
                        <div class="fw-bold">${title}</div>
                        <div class="x-small text-muted">${location}</div>
                    </td>
                    <td><span class="status-badge ${status.toLowerCase() === 'active' ? 'status-active' : 'status-closed'}">${status}</span></td>
                    <td><div class="fw-bold">${applicants}</div><div class="x-small text-muted">Applications</div></td>
                    <td><span class="x-small fw-bold text-primary">${aiMatch}%</span></td>
                    <td class="x-small text-muted">${posted}</td>
                    <td class="text-end"><button class="btn btn-light btn-sm rounded-3"><i class="bi bi-eye"></i></button></td>
                </tr>`;
        }).join('');
    }

    function applyFilter() {
        const filter = (searchInput?.value || '').toLowerCase();
        const filtered = jobs.filter((job) => {
            const rowText = `${job.title || ''} ${job.location || ''} ${job.status || ''}`.toLowerCase();
            return rowText.includes(filter);
        });
        renderRows(filtered);
    }

    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-5 text-muted">Loading jobs...</td></tr>';
    }

    fetch(API_BASE + '/jobs', { headers: { Accept: 'application/json' } })
        .then(async (res) => {
            const payload = await res.json();
            if (!res.ok) throw new Error(payload.message || 'Failed to load jobs');
            jobs = Array.isArray(payload.jobs) ? payload.jobs : [];
            renderRows(jobs);
        })
        .catch((err) => {
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="6" class="text-center py-5 text-danger">${err.message}</td></tr>`;
            }
        });

    if (searchInput) {
        searchInput.addEventListener('keyup', applyFilter);
    }
});