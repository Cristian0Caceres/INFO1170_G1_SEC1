const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth/loginController'); // Importa el controlador
const { registerUser } = require('../controllers/auth/registerController');

// Ruta POST para el login
router.post('/login', login);

// Ruta para manejar el registro de usuarios
router.post('/register', registerUser);

module.exports = router;
