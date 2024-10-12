const connection = require('../../config/db');

// Función para obtener productos por ID de categoría
const mostrarProductosPorCategoria = (req, res) => {
    const idCategoria = req.params.id_categoria; // Obtener el ID de la categoría de los parámetros

    const sql = `
        SELECT Producto.Nombre_Producto, MIN(Precios.coste) as Precio_Minimo, Producto.imagen_producto
        FROM Producto
        JOIN Precios ON Producto.ID_Producto = Precios.ID_Productos
        WHERE Producto.ID_Categoria = ?
        GROUP BY Producto.Nombre_Producto, Producto.imagen_producto
    `;

    connection.query(sql, [idCategoria], (error, productos) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener productos.');
        }

        // Renderizar la vista con los productos y el ID de la categoría
        res.render('productos', { productos, idCategoria });
    });
};

module.exports = { mostrarProductosPorCategoria };
