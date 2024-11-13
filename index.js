const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Asegurarse de que la carpeta "views" esté configurada correctamente
app.set('view engine', 'ejs');
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
app.use('/public', express.static(path.join(__dirname, 'public')));

// Usar las rutas
app.get('/', (req, res) => {
  res.render('index');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const categoriasRoutes = require('./routes/categorias');
app.use('/categorias', categoriasRoutes);

const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);

const usuariosRoutes = require('./routes/usuarios'); 
app.use('/usuarios', usuariosRoutes); 

const tiendasRouter = require('./routes/tiendas');
app.use('/tiendas', tiendasRouter);

const productos_adminRouter = require('./routes/productos_admin');
app.use('/productos_admin', productos_adminRouter);

const contactoRouter = require('./routes/consultar');  
app.use('/contacto', contactoRouter);  

const helperRoutes = require('./routes/helper');
app.use('/helper-zone', helperRoutes);

const promocionRouter = require('./routes/promocion');
app.use('/enviar-promocion', promocionRouter);  

const jumboRouter = require('./routes/jumbo'); 
app.use('/jumbo', jumboRouter); 

const unimarcRouter = require('./routes/unimarc'); 
app.use('/unimarc', unimarcRouter);

const ofertasRouter = require('./routes/ofertas');
app.use('/ofertas', ofertasRouter);

const isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

app.use(isAuthenticated);

// Configuración del servidor
app.listen(3000, function(){
    console.log("El servidor está escuchando en http://localhost:3000");
});
