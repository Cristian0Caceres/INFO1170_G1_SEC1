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
                pass: 'hkli jqbb xbwx tkal',
            }
        });

        // Configura el contenido del correo
        const mailOptions = {
            from: 'caciquedelahorro@gmail.com',  // Coloca tu correo aquí
            to: emails,                  // A todos los usuarios
            subject: '¡Gran Descuento en Productos!',
            text: 'HAY UN GRAN DESCUENTO EN EL PRODUCTO (por agregar)'  // Mensaje del correo
        };

        // Envía el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).send('Error al enviar el correo.');
            }

            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo enviado correctamente');
        });
    });
};
