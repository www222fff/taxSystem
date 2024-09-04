console.info('search.js loaded');

(function() {
    function runScript() {
        
        let tableContainer = document.querySelector('.table-container');
        
        if (tableContainer) {
            let tbody = tableContainer.querySelector('tbody');
          
            let customContent = `
              <tr>
                <td style="text-align: center;">1</td>
                <td style="text-align: center;"><a href="https://www222fff.github.io/mysite1" target="_blank" class="t-link t-link--theme-primary t-link--hover-underline">《增值税及附加税费申报表（一般纳税人适用）》</a></td>
                <td style="text-align: center;">2024-01-15</td>
                <td style="text-align: center;">2023-12-01</td>
                <td style="text-align: center;">2023-12-31</td>
                <td style="text-align: center;">8096.67</td>
                <td style="text-align: center;">新产生申报表</td>
                <td style="text-align: center;">未作废</td>
                <td style="text-align: center;"></td>
              </tr>
            `;
          
            function updateTable() {
              tbody.innerHTML = "";
              tbody.innerHTML = customContent;
            }
            
            let queryButton = document.querySelector('button[type="submit"]');
            
            if (queryButton) {
              queryButton.addEventListener('click', updateTable);
            } else {
              console.error('query button not found');
            }
        } else {
            console.error('table container not found');
        }
    }

    // Use MutationObserver to detect dynamic changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                let queryButton = document.querySelector('button[type="submit"]');
                if (queryButton) {                    
                    runScript();
                    observer.disconnect(); // Stop observing after finding the element
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();