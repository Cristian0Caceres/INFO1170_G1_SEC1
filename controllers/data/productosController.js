import connection from '../../config/db.js';  // Asegúrate de que la conexión a la base de datos también use ESModules

// Función para mostrar productos por categoría con paginación
export const mostrarProductosPorCategoria = (req, res) => {
    const idCategoria = req.params.id_categoria; // Obtener el ID de la categoría de los parámetros
    const page = parseInt(req.query.page) || 1; // Página actual
    const limit = parseInt(req.query.limit) || 80; // Límite de productos por página (por defecto 80)
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    const sqlProductos = `
        SELECT p.ID_Producto, p.Nombre_producto, p.imagen_producto, MIN(p.Costo) AS Precio_Minimo, c.Nombre_Categoria
        FROM info1170_producto p
        JOIN info1170_proveedor pr ON p.ID_Proveedor = pr.ID_Proveedor
        JOIN info1170_categoria c ON p.ID_Categoria = c.ID_Categoria
        WHERE p.ID_Categoria = ?
        GROUP BY p.Nombre_producto, c.Nombre_Categoria
        ORDER BY Precio_Minimo ASC
        LIMIT ? OFFSET ?
    `;

    const sqlTotal = `
        SELECT COUNT(*) AS total
        FROM info1170_producto
        WHERE ID_Categoria = ?
    `;

    // Consultar el total de productos
    connection.query(sqlTotal, [idCategoria], (errorTotal, totalResult) => {
        if (errorTotal) {
            console.error(errorTotal);
            return res.status(500).send('Error al obtener el total de productos.');
        }

        const totalProductos = totalResult[0].total;
        const totalPages = Math.ceil(totalProductos / limit);

        // Consultar los productos con paginación
        connection.query(sqlProductos, [idCategoria, limit, offset], (error, productos) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error al obtener productos.');
            }

            if (productos.length > 0) {
                const nombreCategoria = productos[0].Nombre_Categoria;

                res.render('productos', {
                    productos,
                    idCategoria,
                    nombreCategoria,
                    pagination: {
                        totalProductos,
                        totalPages,
                        currentPage: page,
                        limit,
                    },
                });
            } else {
                res.status(404).send('No se encontraron productos para esta categoría.');
            }
        });
    });
};

// Función para obtener detalles del producto por ID
export const mostrarDetalleProducto = (req, res) => {
    const idProducto = req.params.id_producto;

    const sql = `
        SELECT p.Nombre_producto, p.Descripcion_Producto, p.imagen_producto, p.link_producto, p.Costo AS Precio, t.Nombre_Proveedor
        FROM info1170_producto p
        JOIN info1170_proveedor t ON p.ID_Proveedor = t.ID_Proveedor
        WHERE p.Nombre_producto = (SELECT Nombre_producto FROM info1170_producto WHERE ID_Producto = ?)
    `;

    connection.query(sql, [idProducto], (error, resultados) => {
        if (error) {
            console.error('Error al obtener detalles del producto:', error);
            return res.status(500).send('Error al obtener los detalles del producto.');
        }

        if (resultados.length > 0) {
            res.render('vista_producto', { producto: resultados });
        } else {
            res.status(404).send('Producto no encontrado.');
        }
    });
};

// Función para buscar productos por nombre con paginación
export const buscarProductoPorNombre = (req, res) => {
    const termino = req.query.q || ''; // Término de búsqueda
    const page = parseInt(req.query.page) || 1; // Página actual
    const limit = parseInt(req.query.limit) || 80; // Productos por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    const sqlProductos = `
        SELECT p.ID_Producto, p.Nombre_producto, p.imagen_producto, MIN(p.Costo) AS Precio_Minimo
        FROM info1170_producto p
        WHERE p.Nombre_producto LIKE ?
        GROUP BY p.Nombre_producto
        ORDER BY Precio_Minimo ASC
        LIMIT ? OFFSET ?
    `;

    const sqlTotal = `
        SELECT COUNT(*) AS total
        FROM info1170_producto
        WHERE Nombre_producto LIKE ?
    `;

    // Consultar el total de productos
    connection.query(sqlTotal, [`%${termino}%`], (errorTotal, totalResult) => {
        if (errorTotal) {
            console.error('Error al obtener el total de productos:', errorTotal);
            return res.status(500).send('Error al buscar productos.');
        }

        const totalProductos = totalResult[0].total;
        const totalPages = Math.ceil(totalProductos / limit);

        // Consultar los productos con paginación
        connection.query(sqlProductos, [`%${termino}%`, limit, offset], (error, productos) => {
            if (error) {
                console.error('Error al buscar productos:', error);
                return res.status(500).send('Error al buscar productos.');
            }

            res.render('busqueda_producto', {
                productos,
                termino,
                pagination: {
                    totalProductos,
                    totalPages,
                    currentPage: page,
                    limit,
                },
            });
        });
    });
};
