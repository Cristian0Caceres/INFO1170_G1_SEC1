const db = require('../../config/db'); // Asegúrate de que esta ruta sea correcta

// Controlador para mostrar productos por ID de categoría
exports.mostrarProductosPorCategoria = (req, res) => {
    const idCategoria = req.params.id_categoria; // Obtener ID de categoría de los parámetros

    // Consulta SQL que selecciona los productos, el proveedor, el precio más bajo y la imagen
    const sql = `
        SELECT Producto.Nombre_Producto, MIN(Precios.coste) as Precio_Minimo, Producto.imagen_producto
        FROM Producto
        JOIN Precios ON Producto.ID_Producto = Precios.ID_Productos
        WHERE Producto.ID_Categoria = ?
        GROUP BY Producto.Nombre_Producto, Producto.imagen_producto
    `;

    db.query(sql, [idCategoria], (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error en la base de datos');
        }

        // Verificar si hay resultados
        if (resultados.length > 0) {
            // Renderizar la vista de productos y pasar los resultados
            res.render('productos', { productos: resultados, idCategoria: idCategoria });
        } else {
            // Si no hay productos, enviar un mensaje
            res.render('productos', { productos: [], idCategoria: idCategoria });
        }
    });
};
