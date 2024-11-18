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
        'https://www.santaisabel.cl/frutas-y-verduras',
        'https://www.santaisabel.cl/carniceria'
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
        try {
            const page = await browser.newPage();
            console.log(`Navegando a la URL: ${url}`);
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            console.log(`Página cargada: ${url}`);
            
            const category = path.basename(url); // Obtener la categoría desde el enlace URL
            const categoryId = getCategoryId(category); // Obtener el ID de la categoría
            
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
                                    'UPDATE Producto SET Costo = ?, ID_Categoria = ?, imagen_producto = ? WHERE Nombre_producto = ? AND link_producto = ?',
                                    [parseInt(item.price.replace(/\D/g, '')), categoryId, item.img, item.name, item.link]
                                );
                            } else {
                                // Si el producto no existe, insertar los datos nuevos
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

            await page.close();
        } catch (error) {
            console.error('Error en la URL:', url, error);
        }
    }

    await connection.end();
    await browser.close();
    console.log('Scraping completado.');
}

scrapeAndCapture();
