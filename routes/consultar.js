const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

// Ruta para mostrar el formulario de contacto
router.get('/', (req, res) => {
    res.render('contacto');
});

// Ruta para manejar el envío del formulario
router.post('/enviar-contacto', contactoController.enviarFormularioContacto);

module.exports = router;
