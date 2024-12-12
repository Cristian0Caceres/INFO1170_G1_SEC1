// Importación de la conexión con la base de datos
import connection from '../../config/db.js'; // Usamos `import` en lugar de `require`

// Función para obtener categorías
const obtenerCategorias = (req, res) => {
    const sql = 'SELECT ID_Categoria, Nombre_Categoria, Descripcion_Categoria, imagen_categoria FROM info1170_categoria';

    connection.query(sql, (error, categorias) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener categorías.');
        }

        // Renderizar la vista con las categorías
        res.render('categorias', { categorias });
    });
};

export { obtenerCategorias }; // Usamos export en lugar de module.exports
