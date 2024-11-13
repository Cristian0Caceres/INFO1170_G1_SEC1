import puppeteer from 'puppeteer';
import mysql from 'mysql2/promise';
import path from 'path';

async function scrapeAndCapture() {
    const urls = [
        'https://www.santaisabel.cl/lacteos',
        'https://www.santaisabel.cl/despensa',
        'https://www.santaisabel.cl/frutas-y-verduras',
        'https://www.santaisabel.cl/carniceria',
        'https://www.santaisabel.cl/vinos-cervezas-y-licores'
    ];

    const browser = await puppeteer.launch({
        headless: true,
    });

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    });

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const page = await browser.newPage();
        console.log(`Navegando a la URL: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            const category = path.basename(url);
            let pageIndex = 1;
            const totalPages = await page.evaluate(() => {
                const pages = document.querySelectorAll('.select-page-dropdown-item');
                return pages.length;
            });

            while (pageIndex <= totalPages) {
                await page.waitForSelector('.product-card', { timeout: 5000 });

                // Extraer la información necesaria, incluyendo la imagen
                const data = await page.evaluate(() => {
                    let items = [];
                    document.querySelectorAll('.product-card').forEach(item => {
                        let name = item.querySelector('.product-card-name')?.innerText;
                        let price = item.querySelector('.prices-main-price')?.innerText;
                        let link = item.querySelector('a')?.href;
                        let img = item.querySelector('img')?.src; // Extraer el link de la imagen
                        if (name && price && link && img) {
                            items.push({
                                name: name,
                                price: price,
                                link: link,
                                img: img // Incluir el link de la imagen en los datos extraídos
                            });
                        }
                    });
                    return items;
                });
                console.log(`URL: ${url}, Page ${pageIndex} data:`, data);

                for (const item of data) {
                    if (item.name && item.price && item.link && item.img) {
                        try {
                            // Comprobar si el producto ya existe
                            const [rows] = await connection.execute(
                                'SELECT * FROM Producto WHERE Nombre_producto = ? AND link_producto = ?',
                                [item.name, item.link]
                            );
                            if (rows.length > 0) {
                                // Si el producto existe, actualizar los datos
                                await connection.execute(
                                    'UPDATE Producto SET Precio_producto = ?, Categoria_producto = ?, IMG_producto = ? WHERE Nombre_producto = ? AND link_producto = ?',
                                    [parseInt(item.price.replace(/\D/g, '')), category, item.img, item.name, item.link]
                                );
                            } else {
                                // Si el producto no existe, insertar los datos nuevos
                                await connection.execute(
                                    'INSERT INTO Producto (Nombre_producto, link_producto, Precio_producto, Categoria_producto, IMG_producto) VALUES (?, ?, ?, ?, ?)',
                                    [item.name, item.link, parseInt(item.price.replace(/\D/g, '')), category, item.img]
                                );
                            }
                        } catch (dbError) {
                            console.error('Database Error:', dbError);
                            continue; // Si hay un error, pasar a la siguiente iteración del bucle
                        }
                    }
                }

                // Avanzar a la siguiente página si no es la última
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
                        break; // Si el botón de la siguiente página no existe, salir del bucle
                    }
                }
                pageIndex++;
            }

        } catch (error) {
            
            await page.clconsole.error('Error:', error);
        } finally { await page.close(); ;
        }
    }

    await connection.end();
    await browser.close();
    console.log('Scraping completado.');
}

scrapeAndCapture();
