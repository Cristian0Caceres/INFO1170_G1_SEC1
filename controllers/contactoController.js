const db = require('../config/db');

// Ruta para manejar el envío del formulario de contacto
exports.enviarFormularioContacto = (req, res) => {
    const { name, email, subject, message } = req.body;

    // Inserción en la tabla consulta (sin especificar ID_Consulta, ya que se generará automáticamente)
    const query = 'INSERT INTO consulta (Nombre_Usuario, correo_Usuario, Asunto, Mensaje_Usuario) VALUES (?, ?, ?, ?)';
    const values = [name, email, subject, message];

    db.query(query, values, (error, resultados) => {
        if (error) {
            console.error('Error al insertar la consulta:', error);
            return res.status(500).send('Error al enviar el formulario. Detalles: ' + error.message);
        }
        res.redirect('/contacto');
    });
};
