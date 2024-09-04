console.info('login.js loaded');

(function() {
    // Function to modify the target div
    function modifyTargetDiv(targetDiv) {
        if (targetDiv) {
            // Remove the old class and add the new class
            targetDiv.classList.remove('jbtextC');
            targetDiv.classList.add('jbtextB');

            // Modify the text content of span elements
            let spanAtext1 = targetDiv.querySelector('span.Atext1');
            let spanAtext2 = targetDiv.querySelector('span.Atext2');

            if (spanAtext1) {
                spanAtext1.textContent = 'B';
            }

            if (spanAtext2) {
                spanAtext2.textContent = '级纳税人';
            }
        }
    }

    // Function to initialize the MutationObserver
    function initObserver() {
        let initialTargetDiv = document.querySelector('div.Atext.clearfix.jbtextC');
        if (initialTargetDiv) {
            modifyTargetDiv(initialTargetDiv);
        }

        // Create a MutationObserver to monitor DOM changes
        const observer = new MutationObserver(function(mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        // If the added node is the target div, modify it
                        if (node.nodeType === 1 && node.matches('div.Atext.clearfix.jbtextC')) {
                            modifyTargetDiv(node);
                        }
                    });
                }
            }
        });

        // Configure and start the MutationObserver
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    }

    // Run the initialization function after the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Ensure document.body exists before initializing the observer
        if (document.body) {
            initObserver();
        } else {
            console.error('document.body is not available');
        }
    });
})();
