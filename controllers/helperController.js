const db = require('../config/db');

// Obtener todos los datos de la tabla "consulta"
exports.obtenerConsultas = (req, res) => {
    const query = 'SELECT * FROM consulta';
    
    db.query(query, (error, resultados) => {
        if (error) {
            console.error('Error al obtener los datos:', error);
            return res.status(500).send('Error al obtener los datos.');
        }
        
        // Renderizar la página con los resultados obtenidos
        res.render('helper_zone', { consultas: resultados });
    });
};
