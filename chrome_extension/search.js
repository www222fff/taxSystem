console.info('search.js loaded');

(function() {
    function runScript() {
        
        let tableContainer = document.querySelector('.table-container');
        let datePickers = document.querySelectorAll('.t-date-picker');
        let link = "";
        let apply_date = "";
        let start_date = "";
        let end_date = "";
        let amount = "";

       
        if (tableContainer) {
            let tbody = tableContainer.querySelector('tbody');
          
        
            function updateTable() {
              tbody.innerHTML = "";
                
              datePickers.forEach((picker) => {
                const label = picker.closest('.form-item-wrap').querySelector('.t-form__label span').textContent.trim();      
          
                if (label === '申报日期起') { 
                  const input = picker.querySelector('.t-input__inner');  
                  
                  if (input.value ==  "2024-09-01") {
                    link = "https://etax-qingdao-chinatax-gov-cn-2408.pages.dev/";
                    apply_date = "2024-09-03";
                    start_date = "2024-08-01";
                    end_date = "2024-08-31";
                    amount = "7014.17";                    
                  } else if (input.value ==  "2024-01-01") {
                    link = "https://etax-qingdao-chinatax-gov-cn-2312.pages.dev/";
                    apply_date = "2024-01-15";
                    start_date = "2023-12-01";
                    end_date = "2023-12-31";
                    amount = "8096.67";                    
                  } else if (input.value ==  "2023-09-01") {
                    link = "https://etax-qingdao-chinatax-gov-cn-2308.pages.dev/";
                    apply_date = "2023-09-15";
                    start_date = "2023-08-01";
                    end_date = "2023-08-31";
                    amount = "7212.33";                    
                  }             
                }
              });

              let customContent = `
              <tr>
                <td style="text-align: center;">1</td>
                <td style="text-align: center;"><a href="${link}" target="_blank" class="t-link t-link--theme-primary t-link--hover-underline">《增值税及附加税费申报表（一般纳税人适用）》</a></td>
                <td style="text-align: center;">${apply_date}</td>
                <td style="text-align: center;">${start_date}</td>
                <td style="text-align: center;">${end_date}</td>
                <td style="text-align: center;">${amount}</td>
                <td style="text-align: center;">新产生申报表</td>
                <td style="text-align: center;">未作废</td>
                <td style="text-align: center;"></td>
              </tr>
            `;

              tbody.innerHTML = customContent;
            };
            
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