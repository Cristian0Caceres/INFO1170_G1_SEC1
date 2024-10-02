// conexion.js
const mysql = require('mysql2/promise');

// Configurar la conexión a la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd',
};

// Exportar la conexión para que pueda ser reutilizada
async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conectado a la base de datos');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { getConnection };
