import express from 'express';  // Usar import en lugar de require
import connection from '../config/db.js';  // Usar import y asegúrate de que 'db.js' usa export default

const router = express.Router();

router.get('/jumbo', (req, res) => {
    const query = `
       SELECT *
       FROM (
        SELECT p.*, 
           ROW_NUMBER() OVER (PARTITION BY p.ID_Categoria ORDER BY p.ID_Producto ASC) AS row_num
        FROM info1170_producto p
        JOIN info1170_proveedor pr ON p.ID_Proveedor = pr.ID_Proveedor
        WHERE pr.Nombre_Proveedor = 'Jumbo'
        ) subquery
        WHERE subquery.row_num <= 10;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error); // Imprimir error
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        console.log('Resultados de la consulta:', results); // Imprimir resultados
        res.json(results);
    });
});

export default router;  // Cambiar module.exports por export default
