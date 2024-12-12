import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import { exec } from 'child_process';

const app = express();

// ---------------------------------------------------------------------------------------
app.post('/admin/run-scraping', (req, res) => {
    exec('node WebscrapingMaster.js', (error, stdout, stderr) => {
        if (error) {
            console.error('Error ejecutando scraping:', error);
            res.status(500).send({ message: 'Error ejecutando scraping.' });
            return;
        }
        if (stderr) {
            console.error('Scraping stderr:', stderr);
        }
        console.log('Scraping stdout:', stdout);
        res.send({ message: 'Scraping completado.' });
    });
});

// ---------------------------------------------------------------------------------------

// Configuración del motor de plantillas EJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    res.locals.isLoggedIn = !!req.session.isLoggedIn;
    next();
};

app.use(isAuthenticated);

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas existentes
app.get('/', (req, res) => res.render('index'));

app.get('/admin', (req, res) => {
    if (res.locals.isLoggedIn) {
        res.render('admin_home');
    } else {
        res.render('index');
    }
});

app.get('/carrito', (req, res) => res.render('carrito'));
app.get('/login', (req, res) => res.render(res.locals.isLoggedIn ? 'index' : 'login'));
app.get('/register', (req, res) => res.render(res.locals.isLoggedIn ? 'index' : 'register'));
app.get('/recuperar', (req, res) => res.render(res.locals.isLoggedIn ? 'index' : 'recuperar'));
app.get('/confirmacion', (req, res) => res.render(res.locals.isLoggedIn ? 'index' : 'confirmacion'));
app.get('/cambio', (req, res) => res.render(res.locals.isLoggedIn ? 'index' : 'cambio'));
app.get('/legal', (req, res) => res.render('legal'));
app.get('/helper', (req, res) => res.render('helper_home'));
app.get('/simulador', (req, res) => res.render('Test_simulador'));

// Importar rutas
import authRoutes from './routes/auth.js';
import categoriasRoutes from './routes/categorias.js';
import productosRouter from './routes/productos.js';
import usuariosRoutes from './routes/usuarios.js';
import tiendasRouter from './routes/tiendas.js';
import productosAdminRouter from './routes/productos_admin.js';
import contactoRouter from './routes/consultar.js';
import helperRoutes from './routes/helper.js';
import promocionRouter from './routes/promocion.js';
import jumboRouter from './routes/jumbo.js';
import santaisabelRouter from './routes/santaisabel.js';
import ofertasRouter from './routes/ofertas.js';

app.use('/auth', authRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRoutes);
app.use('/tiendas', tiendasRouter);
app.use('/productos_admin', productosAdminRouter);
app.use('/', contactoRouter);
app.use('/', helperRoutes);
app.use('/', promocionRouter);
app.use('/', jumboRouter);
app.use('/', santaisabelRouter);
app.use('/ofertas', ofertasRouter);

// Configuración del servidor
app.listen(3000, () => {
    console.log("El servidor está escuchando en http://localhost:3000");
});
