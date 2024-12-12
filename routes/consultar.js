// ./routes/consulta.js
import express from 'express';  // Usa `import` en lugar de `require`
import { enviarFormularioContacto } from '../controllers/contactoController.js';  // Usa `import` también

const router = express.Router();

// Ruta para mostrar el formulario de contacto
router.get('/contacto', (req, res) => {
    res.render('contacto');
});

// Ruta para manejar el envío del formulario
router.post('/enviar-contacto', enviarFormularioContacto);

export default router;  // Usa `export default` en lugar de `module.exports`
