const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const { getConnection } = require('./conexion'); // Importar la conexión desde conexion.js

const app = express();

// Configurar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar el middleware de sesión
app.use(session({
  secret: 'secreto_super_seguro',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Ruta para manejar el POST del formulario de login
app.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Obtener la conexión a la base de datos desde conexion.js
    const connection = await getConnection();

    // Consulta SQL para verificar las credenciales
    const [results] = await connection.execute(
      'SELECT * FROM Usuario WHERE correo_Usuario = ? AND Contrasena_Usuario = ?',
      [correo, password]
    );

    // Verificar si el usuario existe
    if (results.length > 0) {
      const usuario = results[0];

      // Iniciar la sesión del usuario
      req.session.userId = usuario.id;
      req.session.correo = usuario.correo_Usuario;

      // Verificar si el usuario es uno de los administradores
      if (usuario.correo_Usuario === 'caciquedelahorro@gmail.com') {
        req.session.isAdmin = true;
        res.redirect('/admin_home');
      } else {
        req.session.isAdmin = false;
        res.redirect('../../confirmacion.html');
      }
    } else {
      // Si las credenciales no son correctas, redirigir con error
      res.redirect('/login?error=credenciales_invalidas');
    }

    // Cerrar la conexión
    await connection.end();
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta de inicio (GET) para el login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Ruta para la página de administrador, solo accesible si es administrador
app.get('/admin_home', (req, res) => {
  if (req.session.isAdmin) {
    res.send('Bienvenido al panel de administrador');
  } else {
    res.redirect('/login');
  }
});

// Ruta para la página del usuario general, solo accesible si el usuario ha iniciado sesión
app.get('/user_home', (req, res) => {
  if (req.session.userId) {
    res.send(`Bienvenido, ${req.session.correo}`);
  } else {
    res.redirect('/login');
  }
});

// Ruta para cerrar la sesión
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/user_home');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
