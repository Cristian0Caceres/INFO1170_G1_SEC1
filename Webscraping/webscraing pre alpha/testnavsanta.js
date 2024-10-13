import puppeteer from 'puppeteer';

async function scrapeAndCapture() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();

        // Navegar a la página deseada
        await page.goto('https://www.santaisabel.cl/lacteos', { waitUntil: 'networkidle2', timeout: 60000 });

        let pageIndex = 1;
        while (true) {
            // Tomar captura de pantalla de la página actual
            console.log(`Tomando captura de pantalla de la página ${pageIndex}`);
            await page.screenshot({ path: `page-${pageIndex}.png` });

            // Buscar el siguiente botón de paginación activo y hacer clic
            const nextPageButtonExists = await page.evaluate(() => {
                const activePageButton = document.querySelector('.page-number.active');
                if (!activePageButton) {
                    console.error('No se encontró el botón de la página activa.');
                    return false;
                }
                const nextPageButton = activePageButton.nextElementSibling;
                if (!nextPageButton || !nextPageButton.classList.contains('page-number')) {
                    console.error('No se encontró el botón de la siguiente página.');
                    return false;
                }
                nextPageButton.click();
                return true;
            });

            if (!nextPageButtonExists) {
                console.log('No se encontró el botón de la siguiente página.');
                break;
            } else {
                console.log('Botón de la siguiente página encontrado y clicado.');
            }

            // Esperar a que la navegación esté completa
            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

            pageIndex++;
        }

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

scrapeAndCapture();
