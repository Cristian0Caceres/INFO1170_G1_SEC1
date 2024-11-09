const nodemailer = require('nodemailer');
const db = require('../config/db'); // Conexión a la base de datos

exports.enviarPromocion = (req, res) => {
    const { subject, message, productId } = req.body;

    const queryCorreos = 'SELECT correo_Usuario FROM usuario';
    const queryProducto = 'SELECT Nombre_producto, Costo, imagen_producto FROM producto WHERE ID_Producto = ?';

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
                text: message || 'Tenemos una promoción especial para ti en El Cacique del Ahorro.',
                attachments: [
                    {
                        filename: producto.Nombre_producto,
                        path: producto.imagen_producto,
                        cid: 'producto@imagen'
                    }
                ],
                html: `
                    <p>${message}</p>
                    <p>Producto en promoción: <strong>${producto.Nombre_producto}</strong> - $${producto.Costo}</p>
                    <!-- Imagen con estilo en línea para tamaño máximo controlado -->
                    <img src="cid:producto@imagen" alt="Imagen del producto" style="max-width: 60px; height: auto;">
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    return res.status(500).send('Error al enviar el correo.');
                }

                console.log('Correo enviado: ' + info.response);
                res.redirect('/helper-zone');
            });
        });
    });
};
