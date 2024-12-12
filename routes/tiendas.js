import express from 'express';
import db from '../config/db.js'; // Asegúrate de que la ruta sea correcta para la conexión

const router = express.Router();

// Ruta para obtener la lista de proveedores
router.get('/', (req, res) => {
    const sql = 'SELECT ID_Proveedor, Nombre_Proveedor FROM info1170_proveedor';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener los proveedores');
        }

        // Renderizar la página EJS y pasar los proveedores como datos
        res.render('tiendas', { proveedores: results, isLoggedIn: req.session.isLoggedIn });
    });
});

// Ruta para cerrar sesión
router.get('/auth/logout', (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/');
});

export default router;
