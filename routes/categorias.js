// ./routes/categorias.js
import express from 'express';  // Usamos `import`
const router = express.Router();
import { obtenerCategorias } from '../controllers/data/categoriaController.js';  // También usamos `import`

// Ruta para obtener categorías
router.get('/', obtenerCategorias);

export default router;  // Exportación predeterminada
