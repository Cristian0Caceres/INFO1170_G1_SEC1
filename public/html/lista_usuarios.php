<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Usuarios - Cacique del Ahorro</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>

<header>
    <h1>Lista de Usuarios - Cacique del Ahorro</h1>
</header>

<nav>
    <a href="admin_home.html">Inicio</a>
    <a href="lista_productos.php">Productos</a>
    <a href="Test_Simulador.html">Simulador</a>
    <a href="lista_usuarios.php">Usuarios</a>
    <a href="../index.html">Salir</a>
</nav>

<section>
    <h2>Usuarios Registrados</h2>
    <p>A continuación, se muestra la lista de usuarios registrados en el sistema:</p>

    <table class="user-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php 
            error_reporting(E_ALL); // Mostrar todos los errores
            include '../../php/usuarios.php'; 
            ?>
        </tbody>
    </table>
</section>

</body>
</html>
