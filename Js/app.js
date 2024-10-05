// Importa las dependencias necesarias
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',   // Dirección de tu base de datos
    user: 'root',        // Usuario de tu base de datos
    password: '',        // Contraseña de tu base de datos
    database: 'base_de_datos_cacique_del_ahorro'  // Nombre de tu base de datos
});

// Verifica si la conexión a la base de datos es correcta
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Configura el servidor para servir archivos estáticos (HTML, CSS, imágenes, etc.)
app.use(express.static('public'));

// Rutas para la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/inicio.html');  // Aquí pones tu página HTML
});

// Ruta para obtener los productos de la base de datos
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM producto';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los productos: ' + err.stack);
            res.status(500).send('Error en el servidor.');
            return;
        }
        res.json(results);  // Envía los resultados como un JSON
    });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
