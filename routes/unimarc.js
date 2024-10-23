const express = require('express');
const router = express.Router();
const connection = require('../conex'); // Asegúrate de que la ruta a tu conexión sea correcta

router.get('/unimarc', (req, res) => {
    const query = `
        SELECT p.*
        FROM producto p
        JOIN proveedor pr ON p.ID_Proveedor = pr.ID_Proveedor
        WHERE pr.Nombre_Proveedor = 'Unimarc';
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error); // Imprimir error
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        console.log('Resultados de la consulta:', results); // Imprimir resultados
        res.json(results);
    });
});

module.exports = router;
