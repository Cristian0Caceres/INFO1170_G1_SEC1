import express from 'express';
import { exec } from 'child_process';  // Para ejecutar scripts en el servidor
const router = express.Router();

// Ruta para ejecutar el web scraping
router.post('/run-scraping', (req, res) => {
    // Ejecutar el archivo WebscrapingMaster.js
    exec('node ./path/to/WebscrapingMaster.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el scraping: ${error.message}`);
            return res.status(500).json({ message: 'Hubo un error al ejecutar el scraping.' });
        }
        if (stderr) {
            console.error(`Error en el script: ${stderr}`);
            return res.status(500).json({ message: 'Hubo un error en el scraping.' });
        }
        console.log(`Resultado del scraping: ${stdout}`);
        res.status(200).json({ message: 'Web scraping completado exitosamente.' });
    });
});

export default router;
