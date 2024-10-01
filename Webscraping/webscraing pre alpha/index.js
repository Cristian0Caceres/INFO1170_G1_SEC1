import puppeteer from "puppeteer";

async function openWebpage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
    });
    const page = await browser.newPage();

    await page.goto("https://example.com");
    await browser.close();
}

// openWebpage();

async function openWebpagecapture() {
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com');
    await page.screenshot({ path: 'example1.png' });
    await page.click('a[href="/login"]');
    await page.screenshot({ path: 'example2.png' });
    await page.click('a[href="/"]');
    await page.screenshot({ path: 'example3.png' });
    await browser.close();
}

openWebpagecapture();
