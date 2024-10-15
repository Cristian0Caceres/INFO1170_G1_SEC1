const db = require('../../config/db'); // Importar la conexión a la base de datos

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
            return res.redirect('/html/login.html?error=credenciales_invalidas');
        }

        const usuario = results[0];

        if (password === usuario.Contrasena_Usuario) {
            req.session.usuario = usuario;
            return res.redirect(usuario.correo_Usuario === 'caciquedelahorro@gmail.com' ? '/html/admin_home.html' : '/index.html');
        } else {
            return res.redirect('/html/login.html?error=credenciales_invalidas');
        }
    });
};

module.exports = { login };
