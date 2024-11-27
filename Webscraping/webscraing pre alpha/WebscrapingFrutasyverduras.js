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

const getProviderId = (url) => {
    if (url.toLowerCase().includes('santaisabel')) {
        return 1; // Santaisabel
    } else if (url.toLowerCase().includes('jumbo')) {
        return 2; // Jumbo
    }
    return null; // En caso de que no se encuentre un proveedor
};


async function scrapeAndCapture() {
    const urls = [
        'https://www.jumbo.cl/frutas-y-verduras',
        'https://www.santaisabel.cl/frutas-y-verduras'
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
            const category = 3; 
            const categoryId = 3;
            const providerId = getProviderId(url); // Obtener el ID del proveedor

            if (!providerId) {
                console.error(`Proveedor no encontrado para la URL: ${url}`);
                continue;
            }

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
                            const itemPrice = parseInt(item.price.replace(/\D/g, ''));
                            if (isNaN(itemPrice)) {
                                console.error(`Invalid price for item: ${item.name}`);
                                continue;
                            }
                            const [rows] = await connection.execute(
                                'SELECT * FROM Producto WHERE Nombre_producto = ? AND link_producto = ?',
                                [item.name, item.link]
                            );
                            if (rows.length > 0) {
                                await connection.execute(
                                    'UPDATE Producto SET Costo = ?, ID_Categoria = ?, imagen_producto = ?, ID_Proveedor = ? WHERE Nombre_producto = ? AND link_producto = ?',
                                    [itemPrice, categoryId, item.img, providerId, item.name, item.link]
                                );
                            } else {
                                await connection.execute(
                                    'INSERT INTO Producto (Nombre_producto, link_producto, Costo, ID_Categoria, imagen_producto, ID_Proveedor) VALUES (?, ?, ?, ?, ?, ?)',
                                    [item.name, item.link, itemPrice, categoryId, item.img, providerId]
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
