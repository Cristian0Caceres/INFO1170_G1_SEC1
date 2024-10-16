const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Conexión a la base de datos

// Ruta para obtener la lista de proveedores
router.get('/tiendas', (req, res) => {
    const sql = 'SELECT ID_Proveedor, Nombre_Proveedor FROM proveedor';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener los proveedores');
        }

        // Renderizar la página EJS y pasar los proveedores como datos
        res.render('tiendas', { proveedores: results });
    });
});

module.exports = router;
