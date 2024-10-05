// importar express
const express = require("express");

// llamar los métodos de express
const app = express();

// ruta de archivos estáticos
app.use(express.static('public'));

// configurar el puerto usando el servidor local
app.listen(3000, function(){
    console.log("El servidor está escuchando en http://localhost:3000");
});
