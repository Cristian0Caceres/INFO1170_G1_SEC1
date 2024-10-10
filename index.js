const express = require('express');
const path = require('path');
const session = require('express-session'); // Importar express-session
const app = express();
const authRoutes = require('./routes/auth'); // Importar las rutas de autenticación

// Configuración de la sesión
app.use(session({
    secret: 'dsbk.1294#825',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Ruta de los archivos estáticos (HTML, CSS, JS, imágenes, etc.)

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Configuración del servidor
app.listen(3000, function(){
    console.log("El servidor está escuchando en http://localhost:3000");
});
