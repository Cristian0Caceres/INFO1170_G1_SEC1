const db = require('../../config/db');

// Mostrar la lista de usuarios con paginación
exports.mostrarUsuarios = (req, res) => {
    const limite = 10; // Usuarios por página
    const pagina = parseInt(req.query.page) || 1; // Página actual
    const offset = (pagina - 1) * limite; // Desplazamiento

    // Obtener el número total de usuarios
    db.query('SELECT COUNT(*) AS total FROM usuario', (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al obtener la cantidad de usuarios');
        }

        const totalUsuarios = resultados[0].total;
        const totalPaginas = Math.ceil(totalUsuarios / limite);

        // Obtener los usuarios para la página actual
        db.query('SELECT ID_Usuario, Nombre_Usuario, correo_Usuario FROM usuario LIMIT ? OFFSET ?', [limite, offset], (error, usuarios) => {
            if (error) {
                return res.status(500).send('Error al obtener usuarios');
            }

            res.render('vista_usuarios', {
                usuarios,
                paginaActual: pagina,
                totalPaginas
            });
        });
    });
};

// Mostrar el formulario de edición de un usuario
exports.editarUsuario = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM usuario WHERE ID_Usuario = ?', [id], (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al obtener el usuario');
        }
        if (resultados.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('editar_usuario', { usuario: resultados[0] });
    });
};

// Actualizar un usuario
exports.actualizarUsuario = (req, res) => {
    const { id, nombre, correo } = req.body;
    db.query('UPDATE usuario SET Nombre_Usuario = ?, correo_Usuario = ? WHERE ID_Usuario = ?', [nombre, correo, id], (error) => {
        if (error) {
            return res.status(500).send('Error al actualizar el usuario');
        }
        res.redirect('/usuarios');
    });
};

// Eliminar un usuario
exports.eliminarUsuario = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuario WHERE ID_Usuario = ?', [id], (error) => {
        if (error) {
            return res.status(500).send('Error al eliminar el usuario');
        }
        res.redirect('/usuarios');
    });
};
