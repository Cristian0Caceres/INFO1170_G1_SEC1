const db = require('../../config/db'); 
const nodemailer = require('nodemailer');  // Nodemailer para enviar correos

// Controlador para manejar la recuperación de contraseña
const recuperarContrasena = (req, res) => {
    const { correo } = req.body;

    // Verificar que se haya ingresado un correo
    if (!correo) {
        return res.status(400).send('Falta el correo electrónico');
    }

    // Consulta para verificar si el correo existe
    const query = 'SELECT * FROM Usuario WHERE correo_Usuario = ?';

    db.query(query, [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return res.status(500).send('Error en el servidor');
        }

        // Si el correo no se encuentra en la base de datos
        if (results.length === 0) {
            return res.render('recuperar', { mensaje: 'correo no valido' });
        }

        // Si es un administrador, redirigir con un error
        const admins = ['caciquedelahorro@gmail.com'];
        const usuario = results[0];
        if (admins.includes(usuario.correo_Usuario)) {
            return res.render('recuperar', { mensaje: 'correo no valido' });
        }

        // Generar el código de recuperación de 5 dígitos
        const codigo = String(Math.floor(10000 + Math.random() * 90000));

        // Configuración de nodemailer para enviar el correo
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'caciquedelahorro@gmail.com',
                pass: 'hkli jqbb xbwx tkal',
            },
        });

        const mailOptions = {
            from: 'caciquedelahorro@gmail.com',
            to: correo,
            subject: 'Código de recuperación de cuenta',
            text: `Tu código de recuperación es: ${codigo}`,
        };

        // Enviar el correo con el código de recuperación
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo: ' + error);
                return res.render('recuperar', { mensaje: 'error' });
            }

            // Guardar el código y el correo en la sesión
            req.session.codigo_recuperacion = codigo;
            req.session.correo_usuario = correo;

            // Redirigir a la página de confirmación
            return res.render('confirmacion', { mensaje: 'correo enviado' });
        });
    });
};

module.exports = { recuperarContrasena };
