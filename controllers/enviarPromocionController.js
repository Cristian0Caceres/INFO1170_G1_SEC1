const nodemailer = require('nodemailer');
const db = require('../config/db'); // Conexión a la base de datos
const fs = require('fs'); // Para verificar la existencia de archivos

exports.enviarPromocion = (req, res) => {
    const { subject, message, productId } = req.body;

    const queryCorreos = 'SELECT correo_Usuario FROM usuario';
    const queryProducto = `
        SELECT p.Nombre_producto, p.Costo, p.imagen_producto, p.Descripcion_Producto,
               c.Nombre_Categoria, pr.Nombre_Proveedor
        FROM producto p
        JOIN categoria c ON p.ID_Categoria = c.ID_Categoria
        JOIN proveedor pr ON p.ID_Proveedor = pr.ID_Proveedor
        WHERE p.ID_Producto = ?
    `;

    db.query(queryCorreos, (error, resultados) => {
        if (error) {
            console.error('Error al obtener los correos:', error);
            return res.status(500).send('Error al obtener los correos.');
        }

        const emails = resultados.map(usuario => usuario.correo_Usuario);

        db.query(queryProducto, [productId], (error, productoRes) => {
            if (error || productoRes.length === 0) {
                console.error('Error al obtener el producto:', error);
                return res.status(500).send('Error al obtener el producto.');
            }

            const producto = productoRes[0];

            // Determinar rutas de los banners en función de la categoría
            const sanitizedCategory = producto.Nombre_Categoria.replace(/\s+/g, '_').toLowerCase();
            const headerBanner = `./public/img/${sanitizedCategory}_header.jpg`;
            const footerBanner = `./public/img/${sanitizedCategory}_footer.jpg`;

            // Verificar si existen los banners, usar los por defecto si no existen
            const headerExists = fs.existsSync(headerBanner);
            const footerExists = fs.existsSync(footerBanner);

            const finalHeader = headerExists ? headerBanner : './public/img/default_header.jpg';
            const finalFooter = footerExists ? footerBanner : './public/img/default_footer.jpg';

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'caciquedelahorro@gmail.com',
                    pass: 'hkli jqbb xbwx tkal',
                }
            });

            const mailOptions = {
                from: 'caciquedelahorro@gmail.com',
                to: emails,
                subject: subject || 'Promoción Especial',
                html: `
                    <!-- Espacio para Header -->
                    <div style="text-align: center; padding: 10px;">
                        <img src="cid:header@imagen" alt="Banner superior" style="width: 100%; max-width: 600px;">
                    </div>

                    <p>${message}</p>
                    <h3>Detalles del Producto en Promoción:</h3>
                    <p><strong>Producto:</strong> ${producto.Nombre_producto}</p>
                    <p><strong>Precio:</strong> $${producto.Costo}</p>
                    <p><strong>Categoría:</strong> ${producto.Nombre_Categoria}</p>
                    <p><strong>Tienda:</strong> ${producto.Nombre_Proveedor}</p>
                    <p><strong>Descripción:</strong> ${producto.Descripcion_Producto}</p>
                    <img src="cid:producto@imagen" alt="Imagen del producto" style="max-width: 150px; height: auto;">

                    <!-- Espacio para Footer -->
                    <div style="text-align: center; padding: 10px; margin-top: 20px;">
                        <img src="cid:footer@imagen" alt="Banner inferior" style="width: 100%; max-width: 600px;">
                    </div>
                `,
                attachments: [
                    {
                        filename: producto.Nombre_producto,
                        path: producto.imagen_producto,
                        cid: 'producto@imagen'
                    },
                    {
                        filename: 'header.jpg',
                        path: finalHeader,
                        cid: 'header@imagen'
                    },
                    {
                        filename: 'footer.jpg',
                        path: finalFooter,
                        cid: 'footer@imagen'
                    }
                ]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    return res.status(500).send('Error al enviar el correo.');
                }

                console.log('Correo enviado: ' + info.response);
                res.redirect('/enviar-promocion');
            });
        });
    });
};
