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
                    <img src="images/categorias.png" alt="Categorias">
                </a>
                <a href="LINK">
                    <img src="images/carrito-de-compras.png" alt="Carrito de Compras">
                </a>
                <a href="LINK">
                    <img src="images/tienda.png" alt="Tienda">
                <a href="LINK">
                    <img src="images/iniciar-sesion.png" alt="Iniciar Sesion">
                </a>    
            </div>
        </section>
    </header>

    <main>
        <section class="principal">
            <section class="titulo">
                <div class="nombre-titulo">
                    <h1>Categorias</h1>
                </div>
            </section>
            <section class="segundo-apartado">
                <?php include '../../php/obtener_categorias.php'; ?>                    
            </section>
        </section>

    </main>

    <footer>
        <img src="images/logoECDA.png" alt="Logo de la empresa" >
        <p>&copy; Derechos Reservados</p>
        <nav>
            <a href="LINK DEL HOME">Ir al Inicio</a>
        </nav>
    </footer>
</body>
</html>
