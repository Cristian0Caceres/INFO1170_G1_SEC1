const db = require('../../config/db'); // Importar la conexión a la base de datos
const path = require('path');

// Controlador para manejar el login
const login = (req, res) => {
    const { correo, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!correo || !password) {
        return res.status(400).send('Faltan datos en el formulario');
    }

    // Consulta para verificar si el correo y la contraseña son correctos
    const query = 'SELECT * FROM Usuario WHERE correo_Usuario = ? AND Contrasena_Usuario = ?';
    
    db.query(query, [correo, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return res.status(500).send('Error en el servidor');
        }

        // Si se encuentra un usuario, las credenciales son correctas
        if (results.length > 0) {
            const usuario = results[0];

            // Redirigir según el correo del usuario
            if (usuario.correo_Usuario === 'caciquedelahorro@gmail.com') {
                return res.redirect('/html/admin_home.html'); // Redirigir a la página de administrador
            } else {
                return res.redirect('/index.html'); // Redirigir a la página de inicio del usuario
            }
        } else {
            // Si las credenciales no son correctas, redirigir al login con un mensaje de error
            return res.redirect('/public/html/login.html?error=credenciales_invalidas');
        }
    });
};

module.exports = { login };
