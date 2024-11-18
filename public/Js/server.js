const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configurar la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto si usas otro usuario
  password: '', // Añade tu contraseña aquí
  database: 'base_de_datos_cacique_del_ahorro'
});

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Ruta para obtener categorías
app.get('/categorias', (req, res) => {
  connection.query('SELECT * FROM categoria', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM producto', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
