const connection = require('../../config/db');

// Función para obtener productos por ID de categoría
const mostrarProductosPorCategoria = (req, res) => {
    const idCategoria = req.params.id_categoria; // Obtener el ID de la categoría de los parámetros

    const sql = `
        SELECT p.ID_Producto, p.Nombre_producto, p.imagen_producto, MIN(pr.Costo) AS Precio_Minimo, c.Nombre_Categoria
        FROM producto p
        JOIN proveedor_producto pr ON p.ID_Producto = pr.ID_Producto_Proveedor
        JOIN categoria c ON p.ID_Categoria = c.ID_Categoria
        WHERE p.ID_Categoria = ?
        GROUP BY  p.Nombre_producto, c.Nombre_Categoria
        ORDER BY Precio_Minimo ASC
    `;

    connection.query(sql, [idCategoria], (error, productos) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener productos.');
        }

        if (productos.length > 0) {
            // Renderizar la vista con los productos y el nombre de la categoría
            const nombreCategoria = productos[0].Nombre_Categoria;
            res.render('productos', { productos, idCategoria, nombreCategoria });
        } else {
            res.status(404).send('No se encontraron productos para esta categoría.');
        }
    });
};



// Función para obtener detalles del producto por ID
const mostrarDetalleProducto = (req, res) => {
    const idProducto = req.params.id_producto; // Obtener el ID del producto de los parámetros

    const sql = `
        SELECT p.Nombre_producto, p.Descripcion_Producto, p.imagen_producto, p.link_producto, p.Costo AS Precio, t.Nombre_Proveedor
        FROM producto p
        JOIN proveedor_producto pr ON p.ID_Producto_Proveedor = pr.ID_Producto_Proveedor
        JOIN proveedor t ON pr.ID_Proveedor = t.ID_Proveedor
        WHERE p.Nombre_producto = (SELECT Nombre_producto FROM producto WHERE ID_Producto = ?)
    `;

    connection.query(sql, [idProducto], (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener los detalles del producto.');
        }

        if (resultados.length > 0) {
            res.render('vista_producto', { producto: resultados }); // Enviar todos los resultados como un array
        } else {
            res.status(404).send('Producto no encontrado.');
        }
    });
};




const buscarProductoPorNombre = (req, res) => {
    const termino = req.query.q; // Obtenemos el término de búsqueda desde la URL

    const sql = `
        SELECT p.ID_Producto, p.Nombre_producto, p.imagen_producto, MIN(p.Costo) AS Precio_Minimo
        FROM producto p
        JOIN proveedor_producto pr ON p.ID_Producto = pr.ID_Producto_Proveedor
        WHERE p.Nombre_producto LIKE ?
        GROUP BY  p.Nombre_producto, p.imagen_producto
    `;

    connection.query(sql, [`%${termino}%`], (error, productos) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al realizar la búsqueda de productos.');
        }

        // Renderizar la vista de resultados de búsqueda con los productos encontrados
        res.render('busqueda_producto', { productos, termino });
    });
};

module.exports = { mostrarProductosPorCategoria, mostrarDetalleProducto, buscarProductoPorNombre };