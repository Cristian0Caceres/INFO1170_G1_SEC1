const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Servidor Express.js está funcionando!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Ajusta según tu configuración
  password: '',  // Ajusta según tu configuración
  database: 'bd'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL en XAMPP');
});