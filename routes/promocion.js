const express = require('express');
const router = express.Router();
const enviarPromocionController = require('../controllers/enviarPromocionController');

// Ruta GET para renderizar la vista enviarPromocion.ejs
router.get('/', (req, res) => {
    res.render('enviarPromocion');  // Renderiza la vista enviarPromocion.ejs
});

// Ruta POST para enviar la promoción
router.post('/', enviarPromocionController.enviarPromocion);

module.exports = router;
