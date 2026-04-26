  document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('jobSearchInput');
            const table = document.getElementById('jobsTable');
            const noResults = document.getElementById('noResults');

            if (searchInput && table) {
                const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

                searchInput.addEventListener('keyup', function() {
                    const filter = searchInput.value.toLowerCase();
                    let hasVisibleRow = false;
                    
                    for (let row of rows) {
                        if (row === noResults) continue;
                        
                        const rowText = row.textContent.toLowerCase();
                        if (rowText.includes(filter)) {
                            row.style.display = "";
                            row.style.animation = "fadeIn 0.3s forwards";
                            hasVisibleRow = true;
                        } else {
                            row.style.display = "none";
                        }
                    }
                    noResults.style.display = hasVisibleRow ? "none" : "";
                });
            }
        });