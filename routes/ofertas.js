const express = require('express');
const router = express.Router();
const connection = require('../conex'); // Asegúrate de que la ruta a tu conexión sea correcta

router.get('/ofertas', (req, res) => {
    const query = `
        SELECT p.*
        FROM producto p
        INNER JOIN (
            SELECT p.ID_Categoria, p.Nombre_producto, MIN(p.Costo) AS minCosto
            FROM producto p
            WHERE p.Costo < 5000
            AND p.ID_Proveedor IN (1, 2)  -- Solo para tiendas con ID 1 y 2
            AND p.ID_Categoria IN (1, 2, 3, 4, 5)  -- Solo para categorías con ID 1, 2, 3, 4, 5
            GROUP BY p.ID_Categoria, p.Nombre_producto
        ) AS sub
        ON p.ID_Categoria = sub.ID_Categoria
        AND p.Nombre_producto = sub.Nombre_producto
        AND p.Costo = sub.minCosto
        AND p.Costo < 5000
        ORDER BY p.ID_Categoria, p.Costo ASC  -- Ordenar por categoría y costo para obtener los más baratos
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        
        // Limitar a 4 productos por cada categoría
        const categorias = [1, 2, 3, 4, 5];
        const resultadosLimitados = [];
        
        categorias.forEach(categoria => {
            // Filtrar los productos por categoría
            const productosPorCategoria = results.filter(producto => producto.ID_Categoria === categoria);
            
            // Agrupar productos por nombre
            const productosPorNombre = {};
            
            productosPorCategoria.forEach(producto => {
                if (!productosPorNombre[producto.Nombre_producto] || producto.Costo < productosPorNombre[producto.Nombre_producto].Costo) {
                    productosPorNombre[producto.Nombre_producto] = producto;  // Mantener solo el más barato
                }
            });
            
            // Obtener los productos más baratos por nombre
            const productosMasBaratos = Object.values(productosPorNombre);

            // Limitar a 4 productos por categoría
            resultadosLimitados.push(...productosMasBaratos.slice(0, 4));
        });

        res.json(resultadosLimitados);
    });
});

module.exports = router;
