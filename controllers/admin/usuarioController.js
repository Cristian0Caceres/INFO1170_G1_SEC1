import db from '../../config/db.js';  // Actualiza la importación de db

// Mostrar la lista de usuarios con búsqueda y paginación
const mostrarUsuarios = (req, res) => {
    const limite = 10; // Usuarios por página
    const pagina = parseInt(req.query.page) || 1; // Página actual
    const offset = (pagina - 1) * limite; // Desplazamiento
    const search = req.query.search ? `%${req.query.search}%` : '%'; // Búsqueda

    // Obtener el número total de usuarios que coincidan con la búsqueda
    const countQuery = `SELECT COUNT(*) AS total FROM info1170_usuario WHERE Nombre_Usuario LIKE ? OR ID_Usuario LIKE ?`;
    db.query(countQuery, [search, search], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la cantidad de usuarios:', error);
            return res.status(500).send('Error al obtener la cantidad de usuarios');
        }

        const totalUsuarios = resultados[0].total;
        const totalPaginas = Math.ceil(totalUsuarios / limite);

        // Obtener los usuarios que coincidan con la búsqueda para la página actual
        const query = `
            SELECT ID_Usuario, Nombre_Usuario, correo_Usuario 
            FROM info1170_usuario 
            WHERE Nombre_Usuario LIKE ? OR ID_Usuario LIKE ?
            LIMIT ? OFFSET ?`;
        db.query(query, [search, search, limite, offset], (error, usuarios) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
                return res.status(500).send('Error al obtener usuarios');
            }

            res.render('vista_usuarios', {
                usuarios,
                paginaActual: pagina,
                totalPaginas,
                search: req.query.search || '' // Mantener el término de búsqueda en la vista
            });
        });
    });
};

// Mostrar el formulario de edición de un usuario
const editarUsuario = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM info1170_usuario WHERE ID_Usuario = ?', [id], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).send('Error al obtener el usuario');
        }
        if (resultados.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('editar_usuario', { usuario: resultados[0] });
    });
};

// Actualizar un usuario
const actualizarUsuario = (req, res) => {
    const { id, nombre, correo } = req.body;
    db.query(
        'UPDATE info1170_usuario SET Nombre_Usuario = ?, correo_Usuario = ? WHERE ID_Usuario = ?',
        [nombre, correo, id],
        (error) => {
            if (error) {
                console.error('Error al actualizar el usuario:', error);
                return res.status(500).send('Error al actualizar el usuario');
            }
            res.redirect('/usuarios');
        }
    );
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM info1170_usuario WHERE ID_Usuario = ?', [id], (error) => {
        if (error) {
            console.error('Error al eliminar el usuario:', error);
            return res.status(500).send('Error al eliminar el usuario');
        }
        res.redirect('/usuarios');
    });
};

export default {mostrarUsuarios, editarUsuario, actualizarUsuario, eliminarUsuario};