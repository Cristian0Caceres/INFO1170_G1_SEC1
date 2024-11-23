import puppeteer from 'puppeteer';
import mysql from 'mysql2/promise';
import path from 'path';

const getCategoryId = (categoryName) => {
    const categories = {
        'lacteos': 1,
        'despensa': 2,
        'frutas-y-verduras': 3,
        'carniceria': 4,
        'vinos-cervezas-y-licores': 5
    };
    return categories[categoryName] || null;
};

async function scrapeAndCapture() {
    const urls = [
        'https://www.santaisabel.cl/lacteos',
        'https://www.santaisabel.cl/despensa',
        'https://www.jumbo.cl/lacteos-y-quesos',
        'https://www.jumbo.cl/despensa'
    ];

    const browser = await puppeteer.launch({
        headless: true,
    });

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bd'
    });

    for (const url of urls) {
        const page = await browser.newPage();
        console.log(`Navigating to URL: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            const category = path.basename(url); 
            const categoryId = getCategoryId(category);
            let pageIndex = 1;
            const totalPages = await page.evaluate(() => {
                const pages = document.querySelectorAll('.select-page-dropdown-item');
                return pages.length;
            });

            while (pageIndex <= totalPages) {
                console.log(`Scraping ${category}, Page ${pageIndex}/${totalPages}`);
                await page.waitForSelector('.product-card', { timeout: 10000 });

                const data = await page.evaluate(() => {
                    let items = [];
                    document.querySelectorAll('.product-card').forEach(item => {
                        let name = item.querySelector('.product-card-name')?.innerText;
                        let price = item.querySelector('.prices-main-price')?.innerText;
                        let link = item.querySelector('a')?.href;
                        let img = item.querySelector('img')?.src;
                        if (name && price && link && img) {
                            items.push({
                                name: name,
                                price: price,
                                link: link,
                                img: img
                            });
                        }
                    });
                    return items;
                });

                console.log(`URL: ${url}, Page ${pageIndex} data:`, data);

                for (const item of data) {
                    if (item.name && item.price && item.link && item.img) {
                        try {
                            const [rows] = await connection.execute(
                                'SELECT * FROM Producto WHERE Nombre_producto = ? AND link_producto = ?',
                                [item.name, item.link]
                            );
                            if (rows.length > 0) {
                                await connection.execute(
                                    'UPDATE Producto SET Costo = ?, ID_Categoria = ?, imagen_producto = ? WHERE Nombre_producto = ? AND link_producto = ?',
                                    [parseInt(item.price.replace(/\D/g, '')), categoryId, item.img, item.name, item.link]
                                );
                            } else {
                                await connection.execute(
                                    'INSERT INTO Producto (Nombre_producto, link_producto, Costo, ID_Categoria, imagen_producto) VALUES (?, ?, ?, ?, ?)',
                                    [item.name, item.link, parseInt(item.price.replace(/\D/g, '')), categoryId, item.img]
                                );
                            }
                        } catch (dbError) {
                            console.error('Database Error:', dbError);
                            continue;
                        }
                    }
                }

                if (pageIndex < totalPages) {
                    const nextPageExists = await page.evaluate((index) => {
                        const pages = document.querySelectorAll('.select-page-dropdown-item');
                        return pages[index] ? true : false;
                    }, pageIndex);

                    if (nextPageExists) {
                        await Promise.all([
                            page.waitForNavigation({ waitUntil: 'networkidle2' }),
                            page.evaluate((index) => {
                                document.querySelectorAll('.select-page-dropdown-item')[index].click();
                            }, pageIndex)
                        ]);
                    } else {
                        break;
                    }
                }
                pageIndex++;
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            await page.close();
        }
    }

    await connection.end();
    await browser.close();
    console.log('Scraping completado.');
}

scrapeAndCapture();
