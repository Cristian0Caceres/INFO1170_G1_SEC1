import express from 'express';
import db from '../../config/db.js'; 
import bcrypt from 'bcrypt'; // Importar bcrypt

const router = express.Router();

export const cambiocontrasena = (req, res) => {
    const correo = req.session.correo_usuario;

    if (correo) {
        // Capturar y limpiar los datos de las contraseñas
        const contrasena = req.body.password; 
        const confirmarContrasena = req.body.confirm_password;

        // Verificar que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            return res.render('cambio', { mensaje: 'contraseñas no coinciden' });
        }

        // Hashear la nueva contraseña antes de actualizarla
        bcrypt.hash(contrasena, 7, (err, hash) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                return res.render('cambio', { mensaje: 'error' });
            }

            // Actualizar la contraseña hasheada en la base de datos
            const sql = 'UPDATE info1170_Usuario SET Contrasena_Usuario = ? WHERE correo_Usuario = ?';
            db.query(sql, [hash, correo], (error, results) => {
                if (error) {
                    console.error('Error al actualizar la contraseña:', error);
                    return res.render('cambio', { mensaje: 'error' });
                }

                // Verificar si se actualizó alguna fila
                if (results.affectedRows > 0) {
                    return res.render('login', { mensaje: 'cambio de contraseña exitoso' });
                } else {
                    return res.render('cambio', { mensaje: 'usuario no encontrado' });
                }
            });
        });
    } else {
        // Si no hay correo en la sesión, redirigir a la página de recuperación
        return res.render('recuperar', { mensaje: 'sesion expirada' });
    }
};
