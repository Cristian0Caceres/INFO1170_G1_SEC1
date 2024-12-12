// ./routes/helper.js
import express from 'express';  // Usa import en lugar de require
import { obtenerConsultas, responderConsulta, eliminarConsulta } from '../controllers/helperController.js';  // Usa import para las funciones

const router = express.Router();

// Ruta para obtener los datos de la tabla "consulta"
router.get('/helper-zone', obtenerConsultas);

// Ruta para enviar la respuesta de una consulta
router.post('/responder-consulta/:idConsulta', responderConsulta);

// Ruta para eliminar una consulta (usando DELETE)
router.delete('/eliminar-consulta/:idConsulta', eliminarConsulta);

export default router;  // Usa export default para exportar el router
