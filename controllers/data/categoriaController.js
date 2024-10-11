const db = require('../../config/db');

// Obtener la lista de categorías
exports.obtenerCategorias = (req, res) => {
    const sql = "SELECT Nombre_Categoria, Descripcion_Categoria FROM categoria";

    db.query(sql, (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en la consulta');
        }

        // Enviar resultados como JSON
        res.json(resultados);
    });
};
