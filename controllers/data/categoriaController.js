const connection = require('../../config/db'); // Importar la conexión a la base de datos

// Función para obtener categorías
const obtenerCategorias = (req, res) => {
    const sql = 'SELECT ID_Categoria, Nombre_Categoria, Descripcion_Categoria FROM categoria'; // Incluye el ID de la categoría

    connection.query(sql, (error, categorias) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener categorías.');
        }

        // Renderizar la vista con las categorías
        res.render('categorias', { categorias, session: req.session }); 
    });
};


module.exports = { obtenerCategorias };
