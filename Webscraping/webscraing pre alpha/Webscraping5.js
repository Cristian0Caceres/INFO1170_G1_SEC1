import puppeteer from 'puppeteer';
import mysql from 'mysql2/promise';
import path from 'path';

async function scrapeAndCapture() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();

        // Navegar a la página deseada
        await page.goto('https://www.santaisabel.cl/carniceria', { waitUntil: 'networkidle2' });

        // Extraer la categoría de la URL
        const category = path.basename(page.url());

        // Conectar a la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test'
        });

        let pageIndex = 1;
        let totalPages = await page.evaluate(() => {
            const pages = document.querySelectorAll('.select-page-dropdown-item');
            return pages.length;
        });

        while (pageIndex <= totalPages) {
            // Esperamos explícitamente hasta que los elementos "product-card" se carguen
            await page.waitForSelector('.product-card', { timeout: 5000 });

            // Extraer la información necesaria
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
            console.log(`Page ${pageIndex} data:`, data);

            // Insertar o actualizar datos en la base de datos
            for (const item of data) {
                if (item.name && item.price && item.link) {
                    try {
                        // Comprobar si el producto ya existe
                        const [rows] = await connection.execute(
                            'SELECT * FROM Producto WHERE Nombre_producto = ? AND link_producto = ?',
                            [item.name, item.link]
                        );

                        if (rows.length > 0) {
                            // Si el producto existe, actualizar los datos
                            await connection.execute(
                                'UPDATE Producto SET Precio_producto = ?, Categoria_producto = ? WHERE Nombre_producto = ? AND link_producto = ?',
                                [parseInt(item.price.replace(/\D/g, '')), category, item.name, item.link]
                            );
                        } else {
                            // Si el producto no existe, insertar los datos nuevos
                            await connection.execute(
                                'INSERT INTO Producto (Nombre_producto, link_producto, Precio_producto, Categoria_producto) VALUES (?, ?, ?, ?)',
                                [item.name, item.link, parseInt(item.price.replace(/\D/g, '')), category]
                            );
                        }
                    } catch (dbError) {
                        console.error('Database Error:', dbError);
                        continue;  // Si hay un error, pasar a la siguiente iteración del bucle
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
                    break; // Si el botón de la siguiente página no existe, salimos del bucle
                }
            }
            pageIndex++;
        }

        // Cerrar la conexión a la base de datos
        await connection.end();
        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

scrapeAndCapture();
