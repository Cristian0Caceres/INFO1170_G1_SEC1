import express from 'express';  // Cambiar a import
import productoController from '../controllers/admin/productoController.js';  // Cambiar a import con extensión .js

const router = express.Router();

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

export default router;  // Cambiar module.exports por export default
