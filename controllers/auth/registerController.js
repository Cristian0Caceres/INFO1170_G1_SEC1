const db = require('../../config/db'); // Importar la conexión a la base de datos

const registerUser = (req, res) => {
    const { nombre, correo, contrasena, confirmacion_contrasena } = req.body;

    // Validar que la contraseña y la confirmación coincidan
    if (contrasena !== confirmacion_contrasena) {
        return res.redirect('/html/register.html?error=contrasenas_no_coinciden');
    }

    // Verificar si el correo ya existe en la base de datos
    const checkEmailQuery = 'SELECT * FROM Usuario WHERE correo_Usuario = ?';
    db.query(checkEmailQuery, [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            return res.redirect('/html/register.html?error=correo_existente');
        }

        // Si no existe el correo, insertar el nuevo usuario
        const insertUserQuery = 'INSERT INTO Usuario (Nombre_Usuario, correo_Usuario, Contrasena_Usuario) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [nombre, correo, contrasena], (err, result) => {
            if (err) {
                console.error('Error en la consulta: ' + err.stack);
                return res.redirect('/html/register.html?error=no_exitoso');
            }

            // Registro exitoso
            return res.redirect('/html/login.html?registro=exitoso');
        });
    });
};

module.exports = { registerUser };
