const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth/loginController'); 
const { registerUser } = require('../controllers/auth/registerController');
const { recuperarContrasena } = require('../controllers/auth/recoveryController');
const { confirmarCodigo } = require('../controllers/auth/confirmController');
const { cambiocontrasena } = require('../controllers/auth/changePassword');

// Ruta POST para el login
router.post('/login', login);

// Ruta para manejar el registro de usuarios
router.post('/register', registerUser);

// Ruta para la recuperación de contraseña
router.post('/recuperar', recuperarContrasena);

// Ruta para confirmar el código de recuperación
router.post('/confirmar', confirmarCodigo);

// Ruta para cambiar la contraseña
router.post('/cambio', cambiocontrasena);

module.exports = router; // Asegúrate de que esta línea esté presente
