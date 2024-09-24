<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Productos - Cacique del Ahorro</title>
    <link rel="stylesheet" href="/AdminHomeAll/CSS/styles1.css">
</head>
<body>

<header>
    <h1>Lista de Productos - Cacique del Ahorro</h1>
</header>

<nav>
    <a href="/AdminHomeAll/HTML/admin_home.html">Inicio</a>
    <a href="/AdminHomeAll/PHP/lista_productos.php">Productos</a>
    <a href="/AdminHomeAll/HTML/Test_Simulador.html">Simulador</a>
    <a href="/AdminHomeAll/PHP/lista_usuarios.php">Usuarios</a>
    <a href="#">Salir</a>
</nav>

<section>
    <h2>Productos Registrados</h2>
    <p>A continuación, se muestra la lista de productos registrados en el sistema:</p>

    <!-- Botón para añadir un nuevo producto -->
    <a href="/AdminHomeAll/PHP/añadir_producto.php" class="button">Añadir Producto</a>

    <table class="user-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Proveedor</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php 
            error_reporting(E_ALL); // Mostrar todos los errores
            include 'productos.php'; 
            ?>
        </tbody>
    
    </table>
</section>

</body>
</html>
