const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para el panel de administración
router.get('/', adminController.getAdminHome);

module.exports = router;
