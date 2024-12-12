import db from '../../config/db.js'; // Importar la conexión a la base de datos
import bcrypt from 'bcrypt'; // Importar bcrypt

// Controlador para manejar el login
const login = (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).send('Faltan datos en el formulario');
    }

    const query = 'SELECT * FROM info1170_Usuario WHERE correo_Usuario = ?';
    
    db.query(query, [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.render('login', { mensaje: 'Credenciales inválidas' });
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
                return res.render(usuario.correo_Usuario === 'caciquedelahorro@gmail.com' ? 'admin_home' : 'index', { mensaje: 'Sesión iniciada correctamente' });
            } else {
                // Si las contraseñas no coinciden, redirigir con un error
                return res.render('login', { mensaje: 'Las contraseñas no coinciden' });	
            }
        });
    });
};

// Exportar el controlador usando ES6
export { login };
