<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/categorias.css">
    <title>Vista Producto</title>
    <script>
        // Función que realiza la búsqueda
        function realizarBusqueda() {
            let query = document.getElementById("searchInput").value;
            if (query) {
                alert("Buscando: " + query); // Aquí puedes reemplazar el alert por la lógica de búsqueda que prefieras
            }
        }

        // Detectar cuando se presiona Enter en el campo de búsqueda
        document.addEventListener("DOMContentLoaded", function() {
            let searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter") { // Verificar si la tecla presionada es Enter
                    realizarBusqueda(); // Llamar a la función de búsqueda
                }
            });
        });
    </script>
</head>
<body>
    <header>
        <section class="barra-superior">
            <div class="logo">
                <img src="../img/logoECDA.png" alt="Logo">
            </div>
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Buscar...">
                <button onclick="realizarBusqueda()">
                    <img src="../img/buscar.png" alt="Buscar">
                </button>
            </div>
            <div class="icons">
                <a href="../html/categorias.php">
                    <img src="../img/categorias.png" alt="Categorias">
                </a>
                <a href="../html/Carrito.html">
                    <img src="../img/carrito-de-compras.png" alt="Carrito de Compras">
                </a>
                <a href="../html/selec_tienda.php">
                    <img src="../img/tienda.png" alt="Tienda">
                <a href="../html/login.html">
                    <img src="../img/iniciar-sesion.png" alt="Iniciar Sesion">
                </a>    
            </div>
        </section>
    </header>

    <main>
        <!-- Sección flotante para la categoría -->
        <section class="nombre-categoria">
             <?php include '../php/categoria.php'; ?>
        </section>
        <section class="productos">
            <section class="encabezado">
                <div class="titulo">
                    <h1>Productos</h1>
                </div>
            </section>
            <section class="presentacion-producto">
                <section class="producto">
                    <?php include '../php/productos_categoria.php'; ?>
                </section>
                
            </section>
        </section>
    </main>

    <footer>
        <img src="../img/logoECDA.png" alt="Logo de la empresa">
        <p>&copy; Derechos Reservados</p>
        <nav>
            <a href="LINK DEL HOME">Ir al Inicio</a>
        </nav>
    </footer>
</body>
</html>
