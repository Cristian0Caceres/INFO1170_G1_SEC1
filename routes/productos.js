import express from 'express';
import { buscarProductoPorNombre, mostrarDetalleProducto, mostrarProductosPorCategoria } from '../controllers/data/productosController.js';

const router = express.Router();

router.get('/buscar', buscarProductoPorNombre);

// Ruta para obtener detalles del producto por ID
router.get('/detalle/:id_producto', mostrarDetalleProducto);

// Ruta para obtener productos por ID de categoría
router.get('/:id_categoria', mostrarProductosPorCategoria);

// Ruta base para /productos
router.get('/', (req, res) => {
    res.status(404).send('Por favor, selecciona una categoría.'); // Mensaje informativo
});

export default router;
