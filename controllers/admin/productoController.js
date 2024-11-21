const db = require('../../config/db');

// Buscar productos con paginación
const buscarProductos = (req, res) => {
    const search = req.query.search || '';
    const limite = 20; // Máximo de productos por página
    const pagina = parseInt(req.query.page) || 1; // Página actual
    const offset = (pagina - 1) * limite; // Desplazamiento para la paginación

    // Contar total de productos
    const sqlContar = `SELECT COUNT(*) AS total 
                       FROM producto 
                       WHERE Nombre_producto LIKE ?`;

    db.query(sqlContar, [`%${search}%`], (error, resultados) => {
        if (error) {
            return res.status(500).send('Error al contar productos');
        }

        const totalProductos = resultados[0].total;
        const totalPaginas = Math.ceil(totalProductos / limite);

        // Obtener productos con límite y desplazamiento
        let sqlProductos = `SELECT producto.ID_Producto AS id, 
                                   producto.Nombre_producto AS name, 
                                   producto.Descripcion_Producto AS description, 
                                   producto.imagen_producto AS image, 
                                   producto.Costo AS price, 
                                   categoria.Nombre_Categoria AS category, 
                                   proveedor.Nombre_Proveedor AS provider
                            FROM producto
                            JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria
                            JOIN proveedor ON producto.ID_Proveedor = proveedor.ID_Proveedor
                            WHERE producto.Nombre_producto LIKE ?
                            ORDER BY producto.Nombre_producto, producto.Costo DESC
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

    const sql = `SELECT producto.ID_Producto AS id, 
                        producto.Nombre_producto AS Nombre_producto, 
                        producto.Descripcion_Producto AS Descripcion_Producto, 
                        producto.imagen_producto AS imagen_producto, 
                        categoria.ID_Categoria AS ID_Categoria, 
                        proveedor.ID_Proveedor AS ID_Proveedor 
                 FROM producto
                 JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria
                 JOIN proveedor ON producto.ID_Proveedor = proveedor.ID_Proveedor
                 WHERE producto.ID_Producto = ?`;

    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (results.length > 0) {
            const producto = results[0];
            // Obtener las categorías y proveedores para mostrarlos en el formulario
            const sqlCategorias = `SELECT * FROM categoria`;
            const sqlProveedores = `SELECT * FROM proveedor`;

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

    const sqlProducto = `UPDATE producto 
                         SET Nombre_producto = ?, ID_Categoria = ?, ID_Proveedor = ?, 
                             Descripcion_Producto = ?, imagen_producto = ? 
                         WHERE ID_Producto = ?`;

    db.query(sqlProducto, [nombre, categoria, proveedor, descripcion, imagen, id], (error) => {
        if (error) {
            return res.status(500).send(error);
        }

        const sqlPrecio = `UPDATE producto 
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
    const sqlEliminarCompra = `DELETE FROM lista_de_compra WHERE ID_Producto = ?`;
    
    db.query(sqlEliminarCompra, [id_producto], (error) => {
        if (error) {
            return res.status(500).send(error);
        }

        // Finalmente eliminar de la tabla producto
        const sqlEliminarProducto = `DELETE FROM producto WHERE ID_Producto = ?`;
        
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

    const sqlProducto = `INSERT INTO producto (Nombre_producto, ID_Categoria, ID_Proveedor, 
                                               Descripcion_Producto, imagen_producto, Costo) 
                         VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sqlProducto, [nombre, categoria, proveedor, descripcion, imagen, precio], (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.redirect('/productos');
    });
};

module.exports = {
    buscarProductos,
    editarProducto,
    actualizarProducto,
    eliminarProducto,
    agregarProducto
};
