const db = require('../config/db');

// Obtener todos los datos de la tabla "consulta"
exports.obtenerConsultas = (req, res) => {
    const query = 'SELECT * FROM consulta';
    
    db.query(query, (error, resultados) => {
        if (error) {
            console.error('Error al obtener los datos:', error);
            return res.status(500).send('Error al obtener los datos.');
        }
        
        // Renderizar la página con las consultas obtenidas
        res.render('helper_zone', { consultas: resultados });
    });
};

// Insertar respuesta en la columna "Respuesta_Cacique"
exports.responderConsulta = (req, res) => {
    const { respuesta } = req.body;
    const consultaId = req.params.idConsulta;

    if (!respuesta || !consultaId) {
        return res.status(400).send('Faltan datos necesarios.');
    }

    const query = 'UPDATE consulta SET Respuesta_Cacique = ? WHERE ID_Consulta = ?';
    
    db.query(query, [respuesta, consultaId], (error, resultado) => {
        if (error) {
            console.error('Error al actualizar la respuesta:', error);
            return res.status(500).send('Error al actualizar la respuesta.');
        }
        res.redirect('/helper-zone');
    });
};
