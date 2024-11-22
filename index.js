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

// Middleware de autenticación
const isAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.locals.isLoggedIn = true;
    } else {
        res.locals.isLoggedIn = false;
    }
    next();
};

app.use(isAuthenticated);

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas existentes
app.get('/', isAuthenticated, (req, res) => {
    res.render('index');
});

// Ruta para la vista de admin
app.get('/admin', (req, res) => {
    if (res.locals.isLoggedIn) {
      // El usuario está autenticado, mostrar la página de admin
      res.render('admin_home');
    } else {
      // El usuario no está autenticado, mostrar un mensaje de error
      res.render('index');
    }
  });

app.get('/carrito', isAuthenticated, (req, res) => {
    res.render('carrito');
});

app.get('/login', isAuthenticated, (req, res) => {
    if (res.locals.isLoggedIn) {
        res.render('index');
    } else {
        res.render('login');
    }
});

app.get('/register', isAuthenticated, (req, res) => {
    if (res.locals.isLoggedIn) {
      // El usuario está autenticado, no mostrar la página 
      res.render('index');
    } else {
      // El usuario no está autenticado, dejar acceder a inciar sesion
      res.render('register');
    }
});
  
app.get('/recuperar', isAuthenticated, (req, res) => {
    if (res.locals.isLoggedIn) {
      // El usuario está autenticado, no mostrar la página 
      res.render('index');
    } else {
      // El usuario no está autenticado, dejar acceder a inciar sesion
      res.render('recuperar');
    }
});
  
app.get('/confirmacion', isAuthenticated, (req, res) => {
    if (res.locals.isLoggedIn) {
      // El usuario está autenticado, no mostrar la página 
      res.render('index');
    } else {
      // El usuario no está autenticado, dejar acceder a inciar sesion
      res.render('confirmacion');
    }
});
  
app.get('/cambio', isAuthenticated, (req, res) => {
    if (res.locals.isLoggedIn) {
      // El usuario está autenticado, no mostrar la página 
      res.render('index');
    } else {
      // El usuario no está autenticado, dejar acceder a inciar sesion
      res.render('cambio');
    }
});

app.get('/legal', isAuthenticated, (req, res) => {
    res.render('legal');
  });
  
app.get('/helper', isAuthenticated, (req, res) => {
    res.render('helper_home');
});
  
app.get('/simulador', isAuthenticated, (req, res) => {
    res.render('Test_simulador');
});

// Importar rutas
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
app.use('/', contactoRouter);  

const helperRoutes = require('./routes/helper');
app.use('/', helperRoutes);

const promocionRouter = require('./routes/promocion');
app.use('/', promocionRouter);  

const jumboRouter = require('./routes/jumbo'); 
app.use('/jumbo', jumboRouter); 

const unimarcRouter = require('./routes/unimarc'); 
app.use('/unimarc', unimarcRouter);

const ofertasRouter = require('./routes/ofertas');
app.use('/ofertas', ofertasRouter);

// Configuración del servidor
app.listen(3000, function() {
    console.log("El servidor está escuchando en http://localhost:3000");
});
