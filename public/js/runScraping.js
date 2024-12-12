document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('runScraping');
    const statusElement = document.getElementById('status');

    runButton.addEventListener('click', async () => {
        statusElement.textContent = 'Ejecutando web scraping...';
        try {
            const response = await fetch('/admin/run-scraping', { method: 'POST' });
            const result = await response.json();
            if (response.ok) {
                statusElement.textContent = result.message;
            } else {
                statusElement.textContent = 'Error: ' + result.message;
            }
        } catch (error) {
            statusElement.textContent = 'Error conectando al servidor.';
            console.error(error);
        }
    });
});
