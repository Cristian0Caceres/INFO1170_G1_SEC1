const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/admin/usuarioController');

// Ruta para listar los usuarios
router.get('/usuarios', usuarioController.mostrarUsuarios);

// Ruta para editar un usuario
router.get('/usuarios/editar/:id', usuarioController.editarUsuario);

// Ruta para actualizar un usuario
router.post('/usuarios/actualizar', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario
router.get('/usuarios/eliminar/:id', usuarioController.eliminarUsuario);

module.exports = router;
