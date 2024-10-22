const express = require('express');
const router = express.Router();
const enviarPromocionController = require('../controllers/enviarPromocionController');

// Ruta GET para renderizar la vista enviarPromocion.ejs
router.get('/enviar-promocion', (req, res) => {
    res.render('enviarPromocion');  // Renderiza la vista enviarPromocion.ejs
});

// Ruta POST para enviar la promoción
router.post('/enviar-promocion', enviarPromocionController.enviarPromocion);

module.exports = router;
