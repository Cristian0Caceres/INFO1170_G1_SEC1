const connection = require('../../config/db');

// Función para obtener productos por ID de categoría
const mostrarProductosPorCategoria = (req, res) => {
    const idCategoria = req.params.id_categoria; // Obtener el ID de la categoría de los parámetros

    const sql = `
        SELECT p.ID_Producto, p.Nombre_producto, p.imagen_producto, MIN(pr.Costo) AS Precio_Minimo
        FROM producto p
        JOIN proveedor_producto pr ON p.ID_Producto = pr.ID_Producto_Proveedor
        WHERE p.ID_Categoria = ?
        GROUP BY p.ID_Producto, p.Nombre_producto, p.imagen_producto
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

// Función para obtener detalles del producto por ID
const mostrarDetalleProducto = (req, res) => {
    const idProducto = req.params.id_producto; // Obtener el ID del producto de los parámetros

    const sql = `
        SELECT p.Nombre_producto, p.Descripcion_Producto, p.imagen_producto, pr.Costo AS Precio, t.Nombre_Proveedor
        FROM producto p
        JOIN proveedor_producto pr ON p.ID_Producto = pr.ID_Producto_Proveedor
        JOIN proveedor t ON pr.ID_Proveedor = t.ID_Proveedor
        WHERE p.ID_Producto = ?
    `;

    connection.query(sql, [idProducto], (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener los detalles del producto.');
        }

        if (resultados.length > 0) {
            const producto = resultados[0]; // Obtener el primer resultado
            res.render('vista_producto', { producto }); // Renderizar la vista con los detalles del producto
        } else {
            res.status(404).send('Producto no encontrado.');
        }
    });
};

module.exports = { mostrarProductosPorCategoria, mostrarDetalleProducto };
