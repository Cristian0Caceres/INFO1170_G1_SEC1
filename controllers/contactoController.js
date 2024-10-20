const db = require('../config/db');
const nodemailer = require('nodemailer');

// Ruta para manejar el envío del formulario de contacto
exports.enviarFormularioContacto = (req, res) => {
    const { name, email, subject, message } = req.body;

    // Inserción en la tabla consulta
    const query = 'INSERT INTO consulta (Nombre_Usuario, correo_Usuario, Asunto, Mensaje_Usuario) VALUES (?, ?, ?, ?)';
    const values = [name, email, subject, message];

    db.query(query, values, (error, resultados) => {
        if (error) {
            console.error('Error al insertar la consulta:', error);
            return res.status(500).send('Error al enviar el formulario. Detalles: ' + error.message);
        }

        // BASE PARA NODEMAILER, SE NECESITAN CREDENCIALES PARA GMAIL
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'caciquedelahorro@gmail.com',
                pass: 'hkli jqbb xbwx tkal',
            }
        });

        // Opciones para enviar correo al usuario y al Casique del Ahorro
        let mailOptionsUser = {
            from: 'caciquedelahorro@gmail.com',
            to: email,
            subject: 'Confirmación de Consulta - Casique del Ahorro',
            text: `Hola ${name},\n\nSu consulta fue enviada con éxito, nos pondremos en contacto pronto.\n\nMensaje enviado: ${message}`
        };

        let mailOptionsAdmin = {
            from: 'caciquedelahorro@gmail.com',
            to: 'caciquedelahorro@gmail.com',
            subject: `Nueva consulta de ${name}`,
            text: `Ha recibido una nueva consulta:\n\nNombre: ${name}\nCorreo: ${email}\nAsunto: ${subject}\nMensaje: ${message}`
        };

        // Enviar correo al usuario
        transporter.sendMail(mailOptionsUser, (error, info) => {
            if (error) {
                return console.log('Error al enviar correo al usuario:', error);
            }
            console.log('Correo enviado al usuario:', info.response);
        });

        // Enviar correo al administrador
        transporter.sendMail(mailOptionsAdmin, (error, info) => {
            if (error) {
                return console.log('Error al enviar correo al administrador:', error);
            }
            console.log('Correo enviado al administrador:', info.response);
        });

        // Redirigir al usuario después de enviar el formulario
        res.send('Su consulta fue enviada con éxito.');
    });
};
