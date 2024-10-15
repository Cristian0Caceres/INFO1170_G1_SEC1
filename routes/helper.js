const express = require('express');
const router = express.Router();
const helperController = require('../controllers/helperController');

// Ruta para obtener los datos de la tabla "consulta"
router.get('/helper-zone', helperController.obtenerConsultas);

module.exports = router;
