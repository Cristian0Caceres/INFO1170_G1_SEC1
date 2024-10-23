const express = require('express');
const router = express.Router();
const path = require('path');
const { login } = require('../controllers/auth/loginController'); 
const { registerUser } = require('../controllers/auth/registerController');
const { recuperarContrasena } = require('../controllers/auth/recoveryController');
const { confirmarCodigo } = require('../controllers/auth/confirmController');
const { cambiocontrasena } = require('../controllers/auth/changePassword');
const { logout } = require('../controllers/auth/logoutController');

// Ruta GET para el login
const appDir = path.dirname(require.main.filename);
router.get('/login', (req, res) => {
  res.sendFile(path.join(appDir, 'public/index.html'));
});

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

router.get('/logout', logout);

module.exports = router; // Asegúrate de que esta línea esté presente
