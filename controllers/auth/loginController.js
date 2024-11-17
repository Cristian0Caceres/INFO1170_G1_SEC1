const db = require('../../config/db'); // Importar la conexión a la base de datos
const bcrypt = require('bcrypt'); // Importar bcrypt

// Controlador para manejar el login
const login = (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).send('Faltan datos en el formulario');
    }

    const query = 'SELECT * FROM Usuario WHERE correo_Usuario = ?';
    
    db.query(query, [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.render('login', { error: 'credenciales_invalidas' });
        }

        const usuario = results[0];

        // Comparar la contraseña ingresada con la almacenada usando bcrypt
        bcrypt.compare(password, usuario.Contrasena_Usuario, (err, isMatch) => {
            if (err) {
                console.error('Error en la comparación de contraseñas: ' + err.stack);
                return res.status(500).send('Error en el servidor');
            }

            if (isMatch) {
                // Si las contraseñas coinciden, iniciar sesión y redirigir
                req.session.isLoggedIn = true;
                req.session.usuario = usuario;
                return res.redirect(usuario.correo_Usuario === 'caciquedelahorro@gmail.com' ? '/admin' : '/');
            } else {
                // Si las contraseñas no coinciden, redirigir con un error
                return res.render('login', { error: 'credenciales_invalidas' });
            }
        });
    });
};

module.exports = { login };
