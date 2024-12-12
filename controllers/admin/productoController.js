import db from '../../config/db.js';  // Asegúrate de que tu db esté utilizando exportación de ESModules

// Buscar productos con paginación
const buscarProductos = (req, res) => {
    const search = req.query.search || '';
    const limite = 100; // Máximo de productos por página
    const pagina = parseInt(req.query.page) || 1; // Página actual
    const offset = (pagina - 1) * limite; // Desplazamiento para la paginación

    // Contar total de productos
    const sqlContar = `SELECT COUNT(*) AS total 
                       FROM info1170_producto 
                       WHERE Nombre_producto LIKE ?`;

    db.query(sqlContar, [`%${search}%`], (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al contar productos');
        }

        const totalProductos = resultados[0].total;
        const totalPaginas = Math.ceil(totalProductos / limite);

        // Obtener productos con límite y desplazamiento
        let sqlProductos = `SELECT info1170_producto.ID_Producto AS id, 
                                   info1170_producto.Nombre_producto AS name, 
                                   info1170_producto.Descripcion_Producto AS description, 
                                   info1170_producto.imagen_producto AS image, 
                                   info1170_producto.Costo AS price, 
                                   info1170_categoria.Nombre_Categoria AS category, 
                                   info1170_proveedor.Nombre_Proveedor AS provider
                            FROM info1170_producto
                            JOIN info1170_categoria ON info1170_producto.ID_Categoria = info1170_categoria.ID_Categoria
                            JOIN info1170_proveedor ON info1170_producto.ID_Proveedor = info1170_proveedor.ID_Proveedor
                            WHERE info1170_producto.Nombre_producto LIKE ?
                            ORDER BY info1170_producto.Nombre_producto, info1170_producto.Costo DESC
                            LIMIT ? OFFSET ?`;

        db.query(sqlProductos, [`%${search}%`, limite, offset], (error, productos) => {
            if (error) {
                return res.status(500).send('Error al obtener productos');
            }

            res.render('lista_productos', {
                productos,
                search,
                paginaActual: pagina,
                totalPaginas
            });
        });
    });
};

// Editar producto
const editarProducto = (req, res) => {
    const id = req.query.id;

    const sql = `SELECT info1170_producto.ID_Producto AS id, 
                        info1170_producto.Nombre_producto AS Nombre_producto, 
                        info1170_producto.Descripcion_Producto AS Descripcion_Producto, 
                        info1170_producto.imagen_producto AS imagen_producto, 
                        info1170_categoria.ID_Categoria AS ID_Categoria, 
                        info1170_proveedor.ID_Proveedor AS ID_Proveedor 
                 FROM info1170_producto
                 JOIN info1170_categoria ON info1170_producto.ID_Categoria = info1170_categoria.ID_Categoria
                 JOIN info1170_proveedor ON info1170_producto.ID_Proveedor = info1170_proveedor.ID_Proveedor
                 WHERE info1170_producto.ID_Producto = ?`;

    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (results.length > 0) {
            const producto = results[0];
            // Obtener las categorías y proveedores para mostrarlos en el formulario
            const sqlCategorias = `SELECT * FROM info1170_categoria`;
            const sqlProveedores = `SELECT * FROM info1170_proveedor`;

            db.query(sqlCategorias, (errorCategorias, categorias) => {
                if (errorCategorias) {
                    return res.status(500).send(errorCategorias);
                }

                db.query(sqlProveedores, (errorProveedores, proveedores) => {
                    if (errorProveedores) {
                        return res.status(500).send(errorProveedores);
                    }

                    // Renderizar la vista de edición con el producto, categorías y proveedores
                    res.render('editar_producto', { producto, categorias, proveedores });
                });
            });
        } else {
            res.status(404).send("Producto no encontrado");
        }
    });
};

// Actualizar producto
const actualizarProducto = (req, res) => {
    const { id, nombre, categoria, proveedor, precio, descripcion, imagen } = req.body;

    if (!descripcion) {
        return res.status(400).send("La descripción no puede estar vacía.");
    }

    const sqlProducto = `UPDATE info1170_producto 
                         SET Nombre_producto = ?, ID_Categoria = ?, ID_Proveedor = ?, 
                             Descripcion_Producto = ?, imagen_producto = ? 
                         WHERE ID_Producto = ?`;

    db.query(sqlProducto, [nombre, categoria, proveedor, descripcion, imagen, id], (error) => {
        if (error) {
            return res.status(500).send(error);
        }

        const sqlPrecio = `UPDATE info1170_producto 
                           SET Costo = ? 
                           WHERE ID_Producto = ?`;

        db.query(sqlPrecio, [precio, id], (error) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.redirect('/productos_admin'); // Redirigir a la lista de productos
        });
    });
};

// Eliminar producto
const eliminarProducto = (req, res) => {
    const id_producto = req.query.id;

    // Primero eliminar de la tabla lista_de_compra
    const sqlEliminarCompra = `DELETE FROM info1170_lista_de_compra WHERE ID_Producto = ?`;
    
    db.query(sqlEliminarCompra, [id_producto], (error) => {
        if (error) {
            return res.status(500).send(error);
        }

        // Finalmente eliminar de la tabla producto
        const sqlEliminarProducto = `DELETE FROM info1170_producto WHERE ID_Producto = ?`;
        
        db.query(sqlEliminarProducto, [id_producto], (error) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.redirect('/productos_admin');
        });
    });
};

// Añadir producto
const agregarProducto = (req, res) => {
    const { nombre, categoria, proveedor, precio, descripcion, imagen } = req.body;

    const sqlProducto = `INSERT INTO info1170_producto (Nombre_producto, ID_Categoria, ID_Proveedor, 
                                               Descripcion_Producto, imagen_producto, Costo) 
                         VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sqlProducto, [nombre, categoria, proveedor, descripcion, imagen, precio], (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.redirect('/productos');
    });
};


// Exportar un objeto por defecto
export default {
    buscarProductos,
    editarProducto,
    actualizarProducto,
    eliminarProducto,
    agregarProducto
};