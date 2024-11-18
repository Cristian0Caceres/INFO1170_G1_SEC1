const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Cambia si tu usuario es diferente
    password: '',        // Cambia si tienes una contraseña
    database: 'bd_pruebaws'      // Cambia al nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + db.threadId);
});

module.exports = db;
