import db from '../../config/db.js'; // Asegúrate de que el archivo db.js esté exportado como ESModule
import bcrypt from 'bcrypt';

const registerUser = (req, res) => {
    const { nombre, correo, contrasena, confirmacion_contrasena } = req.body;

    // Validar que la contraseña y la confirmación coincidan
    if (contrasena !== confirmacion_contrasena) {
        return res.render('register', { error: 'contrasenas_no_coinciden' });
    }

    // Verificar si el correo ya existe en la base de datos
    const checkEmailQuery = 'SELECT * FROM info1170_Usuario WHERE correo_Usuario = ?';
    db.query(checkEmailQuery, [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            return res.render('register', { error: 'correo_existente' });
        }

        // Si el correo no existe, generar el hash de la contraseña
        const saltRounds = 7; // valor de hash usado
        bcrypt.hash(contrasena, saltRounds, (err, hash) => {
            if (err) {
                console.error('Error al hashear la contraseña: ' + err.stack);
                return res.render('register', { error: 'no_exitoso' });
            }

            // Insertar el nuevo usuario con la contraseña hasheada
            const insertUserQuery = 'INSERT INTO info1170_Usuario (Nombre_Usuario, correo_Usuario, Contrasena_Usuario) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [nombre, correo, hash], (err, result) => {
                if (err) {
                    console.error('Error en la consulta: ' + err.stack);
                    return res.render('register', { error: 'no_exitoso' });
                }

                // Registro exitoso
                return res.render('login', { error: 'exitoso' });
            });
        });
    });
};

export { registerUser };  // Exportación usando ESModule
