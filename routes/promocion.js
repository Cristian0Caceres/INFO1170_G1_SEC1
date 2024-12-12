import express from 'express';
import enviarPromocionController from '../controllers/enviarPromocionController.js';
import db from '../config/db.js'; // Conexión a la base de datos

const router = express.Router();

// Ruta GET para renderizar la vista enviarPromocion.ejs
router.get('/enviar-promocion', (req, res) => {
    const queryProductos = 'SELECT ID_Producto, Nombre_producto, Costo, imagen_producto, ID_Categoria FROM info1170_producto';
    const queryCategorias = 'SELECT ID_Categoria, Nombre_Categoria FROM info1170_categoria';

    db.query(queryCategorias, (errorCategorias, categorias) => {
        if (errorCategorias) {
            console.error('Error al obtener categorías:', errorCategorias);
            return res.status(500).send('Error al obtener categorías.');
        }

        db.query(queryProductos, (errorProductos, productos) => {
            if (errorProductos) {
                console.error('Error al obtener productos:', errorProductos);
                return res.status(500).send('Error al obtener productos.');
            }

            res.render('enviarpromocion', { productos, categorias });
        });
    });
});

// Ruta POST para enviar la promoción con datos personalizados
router.post('/enviar-promocion', enviarPromocionController.enviarPromocion);

export default router;
