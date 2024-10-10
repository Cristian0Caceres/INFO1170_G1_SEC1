const express = require('express');
const router = express.Router();
const db = require('../../config/db'); 

router.post('/cambio', (req, res) => {
    // Obtener el correo almacenado en la sesión
    const correo = req.session.correo_usuario;

    if (correo) {
        // Capturar y limpiar los datos de las contraseñas
        const contrasena = req.body.password;
        const confirmarContrasena = req.body.confirm_password;

        // Verificar que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            // Redirigir con el mensaje de que no coinciden
            return res.redirect('/html/cambio.html?confirmacion=contrasenas_no_coinciden');
        }

        // Actualizar la contraseña en la base de datos
        const sql = 'UPDATE Usuario SET contrasena_Usuario = ? WHERE correo_Usuario = ?';
        db.query(sql, [contrasena, correo], (error, results) => {
            if (error) {
                console.error('Error al actualizar la contraseña:', error);
                return res.redirect('/html/cambio.html?confirmacion=error');
            }
            return res.redirect('/html/login.html?confirmacion=exito');
        });
    } else {
        // Si no hay correo en la sesión, redirigir a la página de recuperación
        return res.redirect('/html/recuperar.html?confirmacion=sesion_expirada');
    }
});

module.exports = router;
