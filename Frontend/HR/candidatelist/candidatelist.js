document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[placeholder="Search name or skill..."]');
    const tableRows = document.querySelectorAll('tbody tr');
    const tabs = document.querySelectorAll('.nav-pills .nav-link');
    const scoreFilter = document.getElementById('scoreFilter'); 
    const expFilter = document.getElementById('expFilter');

    // 1. وظيفة الفلترة (زي ما هي مع تحسين بسيط للـ selectors)
    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeTabEl = document.querySelector('.nav-pills .nav-link.active');
        const activeTab = activeTabEl ? activeTabEl.textContent.trim().split(' ')[0].toLowerCase() : 'all';
        
        const selectedScore = scoreFilter.value;
        const selectedExp = expFilter.value;

        tableRows.forEach(row => {
            const name = row.querySelector('.fw-bold').textContent.toLowerCase();
            const skills = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
            const status = row.querySelector('.status-pill').textContent.toLowerCase();
            const score = parseInt(row.querySelector('.ai-badge').textContent);
            
            const expText = row.querySelector('td:nth-child(3)').textContent;
            const expValue = parseFloat(expText.replace(/[^0-9.]/g, '')) || 0;

            const matchesSearch = name.includes(searchTerm) || skills.includes(searchTerm);
            const matchesTab = (activeTab === 'all') || status.includes(activeTab);
            
            let matchesScore = true;
            if (selectedScore.includes('>90%')) matchesScore = score > 90;
            else if (selectedScore.includes('70-90%')) matchesScore = score >= 70 && score <= 90;

            let matchesExp = true;
            if (selectedExp.includes('Junior')) matchesExp = expValue <= 2;
            else if (selectedExp.includes('Mid-level')) matchesExp = expValue > 2 && expValue <= 5;
            else if (selectedExp.includes('Senior')) matchesExp = expValue > 5;

            row.style.display = (matchesSearch && matchesTab && matchesScore && matchesExp) ? "" : "none";
        });
    }

    // 2. وظيفة الـ Modal (تحديث البيانات ديناميكياً)
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.addEventListener('show.bs.modal', function (event) {
            // الزرار اللي فتح المودال
            const button = event.relatedTarget;
            
            // سحب البيانات من الـ data-attributes اللي في الـ HTML
            const name = button.getAttribute('data-name');
            const role = button.getAttribute('data-role');
            const score = button.getAttribute('data-score');
            const img = button.getAttribute('data-img');
            const summary = button.getAttribute('data-summary');

            // حقن البيانات في عناصر المودال
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalRole').textContent = role;
            document.getElementById('modalScore').textContent = score;
            document.getElementById('modalImg').src = img;
            document.getElementById('modalSummary').textContent = summary;
            
            // تغيير لون الـ Score حسب النسبة (اختياري - لمسة احترافية)
            const scoreDisplay = document.getElementById('modalScore');
            const scoreValue = parseInt(score);
            if (scoreValue > 90) {
                scoreDisplay.parentElement.className = "card bg-primary text-white border-0 rounded-4 p-4 text-center h-100 shadow-sm";
            } else {
                scoreDisplay.parentElement.className = "card bg-warning text-dark border-0 rounded-4 p-4 text-center h-100 shadow-sm";
            }
        });
    }

    // المستمعات (Listeners)
    if(searchInput) searchInput.addEventListener('input', filterTable);
    if(scoreFilter) scoreFilter.addEventListener('change', filterTable);
    if(expFilter) expFilter.addEventListener('change', filterTable);

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterTable();
        });
    });
});
// وظيفة اختيار الكل (Select All)
const selectAll = document.getElementById('selectAll');
const rowCheckboxes = document.querySelectorAll('.row-checkbox');

if (selectAll) {
    selectAll.addEventListener('change', function() {
        rowCheckboxes.forEach(cb => {
            cb.checked = this.checked;
            // إضافة لون خلفية خفيف للصف المختار
            const row = cb.closest('tr');
            if (this.checked) row.classList.add('selected-row');
            else row.classList.remove('selected-row');
        });
    });
}

// تغيير حالة الصف عند اختيار checkbox واحد
rowCheckboxes.forEach(cb => {
    cb.addEventListener('change', function() {
        const row = this.closest('tr');
        if (this.checked) row.classList.add('selected-row');
        else row.classList.remove('selected-row');
    });
});