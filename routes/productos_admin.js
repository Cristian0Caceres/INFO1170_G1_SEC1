const express = require('express');
const router = express.Router();
const productoController = require('../controllers/admin/productoController');

// Ruta para listar productos
router.get('/', productoController.buscarProductos); // Lista de productos

// Ruta para editar producto
router.get('/editar', productoController.editarProducto); // Mostrar el formulario de edición

// Ruta para actualizar producto
router.post('/editar', productoController.actualizarProducto); // Actualizar producto

// Ruta para eliminar producto
router.get('/eliminar', productoController.eliminarProducto); // Eliminar producto

// Ruta para agregar nuevo producto
router.post('/agregar', productoController.agregarProducto); // Agregar nuevo producto

module.exports = router;