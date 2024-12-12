import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { login } from '../controllers/auth/loginController.js';
import { registerUser } from '../controllers/auth/registerController.js';
import { recuperarContrasena } from '../controllers/auth/recoveryController.js';
import { confirmarCodigo } from '../controllers/auth/confirmController.js';
import { cambiocontrasena } from '../controllers/auth/changePassword.js';
import { logout } from '../controllers/auth/logoutController.js';

const router = express.Router();

// Obtener el directorio actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta GET para el login
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html')); // Cambia el path si el archivo HTML tiene una ruta diferente
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

// Ruta para cerrar sesión
router.get('/logout', logout);

// Exportar el router como exportación por defecto
export default router;
