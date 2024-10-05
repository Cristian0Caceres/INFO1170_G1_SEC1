<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Productos - Cacique del Ahorro</title>
    <link rel="stylesheet" href="../css/styles1.css">
</head>
<body>

<header>
    <h1>Lista de Productos - Cacique del Ahorro</h1>
</header>

<nav>
    <a href="admin_home.html">Inicio</a>
    <a href="lista_productos.php">Productos</a>
    <a href="Test_Simulador.html">Simulador</a>
    <a href="lista_usuarios.php">Usuarios</a>
    <a href="../../index.html">Salir</a>
</nav>

<section>
    <h2>Productos Registrados</h2>
    <p>A continuación, se muestra la lista de productos registrados en el sistema:</p>

    <!-- Botón para añadir un nuevo producto -->
    <!-- href="../php/añadir_producto.php" class="button">Añadir Producto -->

    <!-- Formulario de búsqueda con estilo -->
    <div class="search-container">
        <form method="GET" action="lista_productos.php">
            <input type="text" name="search" class="search-input" placeholder="Buscar producto por nombre...">
            <button type="submit" class="search-button">Buscar</button>
        </form>
    </div>

    <table class="user-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Proveedor</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php 
            error_reporting(E_ALL); // Mostrar todos los errores
            include '../php/productos.php'; 
            ?>
        </tbody>
    </table>
</section>

</body>
</html>
