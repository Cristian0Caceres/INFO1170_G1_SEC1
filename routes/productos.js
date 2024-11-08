const express = require('express');
const router = express.Router();
const productosController = require('../controllers/data/productosController');

// Ruta para buscar productos por nombre
router.get('/buscar', productosController.buscarProductoPorNombre);

// Ruta para obtener detalles del producto por ID
router.get('/detalle/:id_producto', productosController.mostrarDetalleProducto);

// Ruta para obtener productos por ID de categoría
router.get('/:id_categoria', productosController.mostrarProductosPorCategoria);

// Ruta base para /productos
router.get('/', (req, res) => {
    res.status(404).send('Por favor, selecciona una categoría.');
});

module.exports = router;
