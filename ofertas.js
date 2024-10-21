const express = require('express');
const router = express.Router();
const connection = require('../conex'); // Asegúrate de que la ruta a tu conexión sea correcta

router.get('/ofertas', (req, res) => {
    const query = `
        SELECT p.*
        FROM producto p
        INNER JOIN (
            SELECT Nombre_producto, MIN(Costo) AS minCosto
            FROM producto
            WHERE Costo < 5000
            GROUP BY Nombre_producto
        ) AS sub
        ON p.Nombre_producto = sub.Nombre_producto AND p.Costo = sub.minCosto
        LIMIT 8;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

module.exports = router;
