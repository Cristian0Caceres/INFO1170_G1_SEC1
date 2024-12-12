import express from 'express';
import usuarioController from '../controllers/admin/usuarioController.js';

const router = express.Router();

// Ruta para listar los usuarios
router.get('/', usuarioController.mostrarUsuarios);

// Ruta para editar un usuario
router.get('/editar/:id', usuarioController.editarUsuario);

// Ruta para actualizar un usuario
router.post('/actualizar', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario
router.get('/eliminar/:id', usuarioController.eliminarUsuario);

export default router;
