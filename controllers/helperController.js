const db = require('../config/db');
const nodemailer = require('nodemailer');

// Configurar NodeMailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'caciquedelahorro@gmail.com',
        pass: 'hkli jqbb xbwx tkal',
    }
});

// Obtener datos de consultas con paginación
exports.obtenerConsultas = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const queryCount = 'SELECT COUNT(*) AS total FROM consulta';
    const queryConsultas = 'SELECT * FROM consulta LIMIT ? OFFSET ?';

    // Consultar el total de registros para calcular el número de páginas
    db.query(queryCount, (error, countResult) => {
        if (error) {
            console.error('Error al contar las consultas:', error);
            return res.status(500).send('Error al contar las consultas.');
        }

        const totalConsultas = countResult[0].total;
        const totalPages = Math.ceil(totalConsultas / limit);

        // Consultar las consultas con límite y desplazamiento
        db.query(queryConsultas, [limit, offset], (error, consultas) => {
            if (error) {
                console.error('Error al obtener las consultas:', error);
                return res.status(500).send('Error al obtener las consultas.');
            }

            res.render('helper_zone', {
                consultas,
                currentPage: page,
                totalPages
            });
        });
    });
};

// Resto de funciones de responderConsulta y eliminarConsulta...

// Insertar respuesta en la columna "Respuesta_Cacique" y enviar correo al usuario
exports.responderConsulta = (req, res) => {
    const { respuesta } = req.body;
    const consultaId = req.params.idConsulta;

    if (!respuesta || !consultaId) {
        return res.status(400).send('Faltan datos necesarios.');
    }

    const queryConsulta = 'SELECT * FROM consulta WHERE ID_Consulta = ?';
    db.query(queryConsulta, [consultaId], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la consulta:', error);
            return res.status(500).send('Error al obtener la consulta.');
        }

        const consulta = resultados[0];
        const queryUpdate = 'UPDATE consulta SET Respuesta_Cacique = ? WHERE ID_Consulta = ?';

        db.query(queryUpdate, [respuesta, consultaId], (error, resultado) => {
            if (error) {
                console.error('Error al actualizar la respuesta:', error);
                return res.status(500).send('Error al actualizar la respuesta.');
            }

            // Enviar correo al usuario
            const mailOptions = {
                from: 'caciquedelahorro@gmail.com', 
                to: consulta.correo_Usuario, // Email del usuario que hizo la consulta
                subject: 'Respuesta a tu consulta',
                text: `Hola ${consulta.Nombre_Usuario},\n\nGracias por tu consulta. Aquí está nuestra respuesta:\n\n${respuesta}\n\nSaludos,\nEl Cacique del Ahorro.`
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

// Eliminar consulta de la base de datos
exports.eliminarConsulta = (req, res) => {
    const consultaId = req.params.idConsulta;

    const query = 'DELETE FROM consulta WHERE ID_Consulta = ?';

    db.query(query, [consultaId], (error, resultado) => {
        if (error) {
            console.error('Error al eliminar la consulta:', error);
            return res.status(500).send('Error al eliminar la consulta.');
        }
        res.status(200).send('Consulta eliminada correctamente');
    });
};
