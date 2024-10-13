const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Asegurarse de que la carpeta "views" esté configurada correctamente
app.set('views', path.join(__dirname, 'views'));

// Configuración de la sesión
app.use(session({
    secret: 'dsbk.1294#825',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const categoriasRoutes = require('./routes/categorias');
app.use('/', categoriasRoutes);

const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);

const usuariosRoutes = require('./routes/usuarios'); 
app.use('/', usuariosRoutes); 

const tiendasRouter = require('./routes/tiendas');
app.use('/', tiendasRouter);

const productos_adminRouter = require('./routes/productos_admin');
app.use('/productos_admin', productos_adminRouter);

// Configuración del servidor
app.listen(3000, function(){
    console.log("El servidor está escuchando en http://localhost:3000");
});
