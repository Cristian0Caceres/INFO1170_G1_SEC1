const express = require('express');
const router = express.Router();
const helperController = require('../controllers/helperController');

// Ruta para obtener los datos de la tabla "consulta"
router.get('/helper-zone', helperController.obtenerConsultas);

// Ruta para enviar la respuesta de una consulta
router.post('/responder-consulta/:idConsulta', helperController.responderConsulta);

// Ruta para eliminar una consulta (usando DELETE)
router.delete('/eliminar-consulta/:idConsulta', helperController.eliminarConsulta);

module.exports = router;
