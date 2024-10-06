import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapeAndCapture() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 5,
        });
        const page = await browser.newPage();

        // Navigate to the page you want to scrape
        await page.goto('https://www.santaisabel.cl/lacteos/leches', { waitUntil: 'networkidle2' });

        // Extract the information you need
        const data = await page.evaluate(() => {
            let items = [];
            document.querySelectorAll('.product-card').forEach(item => {
                let name = item.querySelector('.product-card-name')?.innerText;
                let price = item.querySelector('.prices-main-price')?.innerText;
                let link = item.querySelector('a')?.href;
                if (name && price && link) {
                    items.push({
                        name: name,
                        price: price,
                        link: link,
                    });
                }
            });
            return items;
        });

        console.log(data);

        // Save the data to a text file
        fs.writeFileSync('data.txt', JSON.stringify(data, null, 2));

        // Capture screenshots at different stages
        await page.screenshot({ path: 'initial.png' });

        if (await page.$('.login')) {
            await page.click('.login');
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
            await page.screenshot({ path: 'after-login.png' });
        } else {
            console.log('Login button not found');
        }

        if (await page.$('.jumbo-icon-sisa-logo-vertical')) {
            await page.click('.jumbo-icon-sisa-logo-vertical');
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
            await page.screenshot({ path: 'after-click.png' });
        } else {
            console.log('Sisa logo not found');
        }

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

scrapeAndCapture();
