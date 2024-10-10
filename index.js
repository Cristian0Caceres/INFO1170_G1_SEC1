const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth'); // Importar las rutas de autenticación

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Modificado

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Configuración del servidor
app.listen(3000, function(){
    console.log("El servidor está escuchando en http://localhost:3000");
});
