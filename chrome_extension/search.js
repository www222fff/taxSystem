console.info('search.js loaded');

(function() {
    const observer1 = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length) {
              // Check for the table element
              let tableElement = document.querySelector('.t-table__content table');
              if (tableElement) {
                  console.info('Table found, checking contents');
                  let tbody = tableElement.querySelector('tbody');
                  console.info(tbody);
                  if (tbody && tbody.querySelector('tr')) {
                      console.info('Table body has rows, clearing contents');

                      // Log all rows
                      let rows = tbody.querySelectorAll('tr');
                      rows.forEach((row, index) => {
                          console.info(`Row ${index + 1}: ${row.innerHTML}`);
                      });

                      tbody.innerHTML = ""; // Clear the table body contents

                      // Update the data count
                      let dataCountElement = document.querySelector('.t-pagination__total');
                      if (dataCountElement) {
                          console.info(dataCountElement.textContent);
                          dataCountElement.textContent = "共 0 项数据";                              
                          
                      }

                  }
              }
          }
      });
    });

    const observer2 = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length) {
              let queryButton = document.querySelector('button[type="submit"]');
              if (queryButton) {                    
                  modifyTable();
                  observer2.disconnect(); // Stop observing after finding the element
              }
          }
      });
    });

    const observer3 = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length) {
              let alertElement = document.querySelector('.alert');
              if (alertElement) {                    
                  alertElement.remove();
                  observer3.disconnect(); // Stop observing after finding the element
              }
          }
      });
    });

    document.addEventListener('DOMContentLoaded', function() {
      // Ensure document.body exists before initializing the observer
      if (document.body) {
          observer1.observe(document.body, { childList: true, subtree: true });
          observer2.observe(document.body, { childList: true, subtree: true });
          observer3.observe(document.body, { childList: true, subtree: true });
      } else {
          console.error('document.body is not available');
      }
    });

    function modifyTable() {
        
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
              observer1.disconnect();

              tbody.innerHTML = "";
                
              datePickers.forEach((picker) => {
                const label = picker.closest('.form-item-wrap').querySelector('.t-form__label span').textContent.trim();      
          
                if (label === '申报日期起') { 
                  const input = picker.querySelector('.t-input__inner');  
                  
                  if (input.value ==  "2022-01-01") {
                    link = "https://etax-qingdao-chinatax-gov-cn-2112.pages.dev/";
                    apply_date = "2022-01-14";
                    start_date = "2022-12-01";
                    end_date = "2022-12-31";
                    amount = "82437.67";                    
                  } else if (input.value ==  "2023-01-01") {
                    link = "https://etax-qingdao-chinatax-gov-cn-2212.pages.dev/";
                    apply_date = "2023-01-14";
                    start_date = "2022-12-01";
                    end_date = "2022-12-31";
                    amount = "11322.00";                    
                  } else if (input.value ==  "2024-01-01") {
                    link = "https://etax-qingdao-chinatax-gov-cn-2312.pages.dev/";
                    apply_date = "2024-01-15";
                    start_date = "2023-12-01";
                    end_date = "2023-12-31";
                    amount = "4299.83";                    
                  } else if (input.value ==  "2024-11-01") {
                    link = "https://etax-qingdao-chinatax-gov-cn-2410.pages.dev/";
                    apply_date = "2024-11-01";
                    start_date = "2024-10-01";
                    end_date = "2024-10-31";
                    amount = "75388.67";                    
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

              // Update the data count
              let dataCountElement = document.querySelector('.t-pagination__total');
              if (dataCountElement) {
                  console.info(dataCountElement.textContent);
                  dataCountElement.textContent = "共 1 项数据";                              
                  
              }
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
    
})();