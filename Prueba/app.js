
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: '',  // Cambia por tu usuario
  password: '', // Cambia por tu contraseña
  database: 'db'  // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar el directorio público
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener y mostrar productos
app.get('/', (req, res) => {
  db.query('SELECT * FROM producto', (err, results) => {
    if (err) throw err;
    res.render('index', { productos: results });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
