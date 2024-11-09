const nodemailer = require('nodemailer');
const db = require('../config/db'); // Conexión a la base de datos

exports.enviarPromocion = (req, res) => {
    const { subject, message } = req.body;

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
                pass: 'hkli jqbb xbwx tkal', // Credenciales de correo
            }
        });

        // Configura el contenido del correo usando los datos personalizados del formulario
        const mailOptions = {
            from: 'caciquedelahorro@gmail.com',   // Remitente
            to: emails,                           // Correos de los usuarios
            subject: subject || 'Promoción Especial',
            text: message || 'Tenemos una promoción especial para ti en El Cacique del Ahorro.',  // Mensaje de texto
            attachments: [
                {
                    filename: 'Carne.jpg',            // Nombre del archivo adjunto
                    path: './public/img/Carne.jpg',   // Ruta de la imagen en el proyecto
                    cid: 'carne@imagen'               // Identificador único para incrustar en HTML
                }
            ],
            html: `
                <p>${message || '¡Hola! Tenemos una oferta especial para ti en El Cacique del Ahorro.'}</p>
                <img src="cid:carne@imagen" alt="Descuento en productos" />
            `  // Contenido HTML
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
