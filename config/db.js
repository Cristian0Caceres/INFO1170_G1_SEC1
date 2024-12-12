import mysql from 'mysql2';

// Crear la conexión sin promesas
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'a2024_vmatus'
});

console.log("Conexión exitosa a la base de datos");

export default connection;
