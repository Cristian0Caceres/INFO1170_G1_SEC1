const express = require('express');
const router = express.Router();
const { obtenerCategorias } = require('../controllers/data/categoriaController');

// Ruta para obtener categorías
router.get('/', obtenerCategorias);

module.exports = router;
