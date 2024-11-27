const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Asegúrate de que la ruta a tu conexión sea correcta

router.get('/santaisabel', (req, res) => {
    const query = `
        SELECT *
       FROM (
        SELECT p.*, 
           ROW_NUMBER() OVER (PARTITION BY p.ID_Categoria ORDER BY p.ID_Producto ASC) AS row_num
        FROM producto p
        JOIN proveedor pr ON p.ID_Proveedor = pr.ID_Proveedor
        WHERE pr.Nombre_Proveedor = 'santa isabel'
        ) subquery
        WHERE subquery.row_num <= 10;

    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

module.exports = router;