const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3000; // Cambia al puerto que prefieras.
const path = require('path');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para ejecutar el script maestro
app.post('/admin/run-scraping', (req, res) => {
    exec('node WebscrapingMaster.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el script: ${error.message}`);
            return res.status(500).json({ message: 'Error ejecutando el script.' });
        }
        if (stderr) {
            console.error(`Error en el script: ${stderr}`);
            return res.status(500).json({ message: 'Error en el script.' });
        }
        console.log(`Salida del script:\n${stdout}`);
        res.json({ message: 'Web scraping ejecutado exitosamente.', output: stdout });
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
