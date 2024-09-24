<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
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
                <img src="images/logoECDA.png" alt="Logo">
            </div>
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Buscar...">
                <button onclick="realizarBusqueda()">
                    <img src="images/buscar.png" alt="Buscar">
                </button>
            </div>
            <div class="icons">
                <a href="LINK">
                    <img src="images/ahorro.png" alt="Ahorro">
                </a>
                <a href="LINK">
                    <img src="images/categorias.png" alt="Categorias">
                </a>
                <a href="LINK">
                    <img src="images/carrito-de-compras.png" alt="Carrito de Compras">
                </a>
                <a href="LINK">
                    <img src="images/tienda.png" alt="Tienda">
                </a>
                <a href="LINK">
                    <img src="images/iniciar-sesion.png" alt="Iniciar Sesion">
                </a>
            </div>
        </section>
    </header>

    <main>
        <section class="principal">
            <div class="column producto">
                <div class="column imagen">
                    <!-- Aquí se mostrará la imagen del producto -->
                    <?php include 'mostrar_producto_imagen.php'; ?>
                </div>           
                <div class="column informacion">
                    <!-- Aquí se mostrará el nombre del producto -->
                    <?php include 'mostrar_producto_nombre.php'; ?>
                </div>
            </div>

            <!-- Mantener la estructura de productos y precios -->
            <div class="column segundo-apartado">
                <div class="precios">
                    <div class="column titulo">
                        <h2>Precios</h2>
                    </div>
                    <div class="column productos">
                        <!-- Aquí puedes incluir los precios de productos o cualquier información adicional -->
                        <div>
                            <h3>Nombre del producto</h3>
                            <p>Precio del producto</p>
                        </div>
                        <div>
                            <h3>Nombre del producto</h3>
                            <p>Precio del producto</p>
                        </div>
                        <div>
                            <h3>Nombre del producto</h3>
                            <p>Precio del producto</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <img src="images/logoECDA.png" alt="Logo de la empresa">
        <p>&copy; Derechos Reservados</p>
        <nav>
            <a href="LINK DEL HOME">Ir al Inicio</a>
        </nav>
    </footer>
</body>
</html>
