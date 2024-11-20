const express = require('express');
const router = express.Router();
const connection = require('../conex'); // Asegúrate de que la ruta a tu conexión sea correcta

router.get('/santaisabel', (req, res) => {
    const query = `
        SELECT p.*
        FROM producto p
        JOIN proveedor pr ON p.ID_Proveedor = pr.ID_Proveedor
        WHERE pr.Nombre_Proveedor = 'Santa Isabel'
        LIMIT 20;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

module.exports = router;
