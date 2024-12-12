import express from 'express';  // Usar import en lugar de require
import connection from '../config/db.js';  // Usar import y asegúrate de que 'db.js' usa export default

const router = express.Router();

router.get('/', (req, res) => {
    const query = `
        SELECT p.*
        FROM info1170_producto p
        INNER JOIN (
            SELECT p.ID_Categoria, p.Nombre_producto, MIN(p.Costo) AS minCosto
            FROM info1170_producto p
            WHERE p.Costo >= 1000
            AND p.ID_Proveedor IN (1, 2)  -- Solo para tiendas con ID 1 y 2
            AND p.ID_Categoria IN (1, 2, 3, 4, 5)  -- Solo para categorías con ID 1, 2, 3, 4, 5
            GROUP BY p.ID_Categoria, p.Nombre_producto
        ) AS sub
        ON p.ID_Categoria = sub.ID_Categoria
        AND p.Nombre_producto = sub.Nombre_producto
        AND p.Costo = sub.minCosto
        ORDER BY p.ID_Categoria, p.Costo ASC;  -- Ordenar por categoría y costo ascendente
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }

        // Limitar a 4 productos por categoría
        const categorias = [1, 2, 3, 4, 5];
        const resultadosLimitados = [];

        categorias.forEach(categoria => {
            // Filtrar los productos por categoría
            const productosPorCategoria = results.filter(producto => producto.ID_Categoria === categoria);

            // Limitar a 4 productos por categoría
            const productosLimitados = productosPorCategoria.slice(0, 4);

            // Agregar los productos limitados al resultado final
            resultadosLimitados.push(...productosLimitados);
        });

        res.json(resultadosLimitados);
    });
});

export default router;  // Cambiar module.exports por export default
