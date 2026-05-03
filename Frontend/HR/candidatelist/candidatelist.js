const API_BASE = "http://127.0.0.1:8000/api";

const tableBody = document.querySelector("tbody");
const searchInput = document.querySelector('input[placeholder*="Search"]');
const modal = document.getElementById("profileModal");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalScore = document.getElementById("modalScore");
const modalSummary = document.getElementById("modalSummary");
const modalImg = document.getElementById("modalImg");
const selectAll = document.getElementById("selectAll");

let candidates = [];

const initialsAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Candidate")}&background=EEF2FF&color=3730A3`;

function renderRows(list) {
    if (!tableBody) return;

    if (!list.length) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-5 text-muted">
                    No candidates found.
                </td>
            </tr>`;
        return;
    }

    tableBody.innerHTML = list.map((candidate) => {
        const id = candidate.userId || candidate.id;
        const name = candidate.name || "Unknown Candidate";
        const role = candidate.role || "Candidate";
        const score = Number(candidate.matchScore || 0);
        const status = candidate.status || "Screening";
        const email = candidate.email || "No email";
        return `
            <tr data-candidate-id="${id}">
                <td class="ps-4"><div class="form-check"><input class="form-check-input row-checkbox" type="checkbox"></div></td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${initialsAvatar(name)}" class="candidate-img me-3">
                        <div>
                            <div class="fw-bold">${name}</div>
                            <div class="x-small text-muted">${email}</div>
                        </div>
                    </div>
                </td>
                <td><div class="ai-badge ${score >= 80 ? "bg-soft-success" : "bg-soft-warning"}">${score}%</div></td>
                <td class="small fw-600">N/A</td>
                <td><span class="status-pill status-screening">${status}</span></td>
                <td><span class="skill-tag">${role}</span></td>
                <td class="text-end pe-4">
                    <button class="btn btn-outline-primary btn-sm rounded-3 px-3 fw-bold view-profile-btn" data-id="${id}">
                        View Profile
                    </button>
                </td>
            </tr>`;
    }).join("");

    document.querySelectorAll(".view-profile-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const found = candidates.find((c) => String(c.userId || c.id) === String(btn.dataset.id));
            if (!found) return;
            modalName.textContent = found.name || "Candidate";
            modalRole.textContent = found.role || "Candidate";
            modalScore.textContent = `${Number(found.matchScore || 0)}%`;
            modalSummary.textContent = found.summary || "No AI summary available yet.";
            modalImg.src = initialsAvatar(found.name);
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
}

function applySearch() {
    const text = (searchInput?.value || "").toLowerCase();
    const filtered = candidates.filter((c) => {
        return `${c.name || ""} ${c.email || ""} ${c.role || ""}`.toLowerCase().includes(text);
    });
    renderRows(filtered);
}

async function loadCandidates() {
    if (tableBody) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-5 text-muted">Loading candidates...</td></tr>`;
    }

    try {
        const res = await fetch(API_BASE + "/candidates/pipeline", { headers: { Accept: "application/json" } });
        const payload = await res.json();
        if (!res.ok) throw new Error(payload.message || "Failed to load candidates");
        candidates = Array.isArray(payload.candidates) ? payload.candidates : [];
        renderRows(candidates);
    } catch (err) {
        if (tableBody) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-5 text-danger">${err.message}</td></tr>`;
        }
    }
}

if (searchInput) searchInput.addEventListener("input", applySearch);

if (selectAll) {
    selectAll.addEventListener("change", function() {
        document.querySelectorAll(".row-checkbox").forEach((cb) => {
            cb.checked = this.checked;
        });
    });
}

loadCandidates();
