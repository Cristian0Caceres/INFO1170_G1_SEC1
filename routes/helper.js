const express = require('express');
const router = express.Router();
const helperController = require('../controllers/helperController');

// Ruta para obtener los datos de la tabla "consulta"
router.get('/helper-zone', helperController.obtenerConsultas);

// Ruta para enviar la respuesta de una consulta
router.post('/responder-consulta/:idConsulta', helperController.responderConsulta);

// Nueva ruta para eliminar una consulta
router.post('/eliminar-consulta/:idConsulta', helperController.eliminarConsulta);

module.exports = router;
