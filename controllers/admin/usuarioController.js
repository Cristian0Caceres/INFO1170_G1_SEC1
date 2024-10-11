const db = require('../../config/db');

// Mostrar la lista de usuarios
exports.mostrarUsuarios = (req, res) => {
    db.query('SELECT ID_Usuario, Nombre_Usuario, correo_Usuario FROM Usuario', (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al obtener usuarios');
        }
        res.render('vista_usuarios', { usuarios: resultados });
    });
};


// Mostrar el formulario de edición de un usuario
exports.editarUsuario = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Usuario WHERE ID_Usuario = ?', [id], (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al obtener el usuario');
        }
        res.render('editar_usuario', { usuario: resultados[0] });
    });
};

// Actualizar un usuario
exports.actualizarUsuario = (req, res) => {
    const { id, nombre, correo } = req.body;
    db.query('UPDATE Usuario SET Nombre_Usuario = ?, correo_Usuario = ? WHERE ID_Usuario = ?', [nombre, correo, id], (error) => {
        if (error) {
            return res.status(500).send('Error al actualizar el usuario');
        }
        res.redirect('/usuarios');
    });
};

// Eliminar un usuario
exports.eliminarUsuario = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Usuario WHERE ID_Usuario = ?', [id], (error) => {
        if (error) {
            return res.status(500).send('Error al eliminar el usuario');
        }
        res.redirect('/usuarios');
    });
};
