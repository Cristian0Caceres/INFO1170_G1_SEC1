const nodemailer = require('nodemailer');
const db = require('../config/db'); // Asegúrate de que la conexión a la base de datos esté configurada

exports.enviarPromocion = (req, res) => {
    const query = 'SELECT correo_Usuario FROM usuario';  // Selecciona todos los correos de los usuarios

    db.query(query, (error, resultados) => {
        if (error) {
            console.error('Error al obtener los correos:', error);
            return res.status(500).send('Error al obtener los correos.');
        }

        const emails = resultados.map(usuario => usuario.correo_Usuario);

        // Configura el transporte para enviar correos
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'caciquedelahorro@gmail.com',
                pass: 'hkli jqbb xbwx tkal', // Cambia a tus credenciales reales
            }
        });

        // Configura el contenido del correo
        const mailOptions = {
            from: 'caciquedelahorro@gmail.com',  // Correo del remitente
            to: emails,                          // Correos de los usuarios
            subject: '¡Gran Descuento en Productos!',
            text: 'Oye! te espera un descuento por aqui!',  // Mensaje del correo
            attachments: [
                {
                    // Ruta a la imagen Carne.jpg dentro de public/img
                    filename: 'Carne.jpg',    // Nombre del archivo adjunto
                    path: './public/img/Carne.jpg', // Ruta a la imagen en tu proyecto
                    cid: 'carne@imagen'       // Identificador único para la imagen si deseas incrustarla en el HTML
                }
            ],
            html: `
                <p>¡Hola!</p>
                <p>HAY UN GRAN DESCUENTO EN EL PRODUCTO: Carne.</p>
                <img src="cid:carne@imagen" alt="Descuento en productos" />
                <p>Que esperas para entrar a el cacique del ahorro y cotizar?.</p>
            `  // Contenido del correo en HTML con la imagen incrustada
        };

        // Envía el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).send('Error al enviar el correo.');
            }

            console.log('Correo enviado: ' + info.response);
            res.redirect('/helper-zone');
        });
    });
};
