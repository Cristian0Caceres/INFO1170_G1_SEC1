const express = require('express');
const router = express.Router();
const enviarPromocionController = require('../controllers/enviarPromocionController');
const db = require('../config/db'); // Conexión a la base de datos

// Ruta GET para renderizar la vista enviarPromocion.ejs
router.get('/', (req, res) => {
    const queryProductos = 'SELECT ID_Producto, Nombre_producto, Costo, imagen_producto, ID_Categoria FROM producto';
    const queryCategorias = 'SELECT ID_Categoria, Nombre_Categoria FROM categoria';

    db.query(queryCategorias, (errorCategorias, categorias) => {
        if (errorCategorias) {
            console.error('Error al obtener categorías:', errorCategorias);
            return res.status(500).send('Error al obtener categorías.');
        }

        db.query(queryProductos, (errorProductos, productos) => {
            if (errorProductos) {
                console.error('Error al obtener productos:', errorProductos);
                return res.status(500).send('Error al obtener productos.');
            }

            res.render('enviarpromocion', { productos, categorias });
        });
    });
});

// Ruta POST para enviar la promoción con datos personalizados
router.post('/', enviarPromocionController.enviarPromocion);

module.exports = router;
