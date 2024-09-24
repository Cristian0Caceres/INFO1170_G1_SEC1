    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <title>Selección de Tiendas</title>
        <script src="scripts.js"></script> <!-- Llamada al archivo de scripts externo -->
    </head>
    <body>
        <header>
            <section class="barra-superior">
                <div class="logo">
                    <img src="images/logoECDA.png" alt="Logo">
                </div>
                <div class="search-bar">
                    <input type="text" id="searchInput" placeholder="Buscar...">
                    <button onclick="realizarBusquedaHeader()">
                        <img src="images/buscar.png" alt="Buscar">
                    </button>
                </div>
                <div class="icons">
                    <a href="LINK">
                        <img src="images/ahorro.png" alt="Ahorro">
                    </a>
                    <a href="LINK">
                        <img src="images/categorias.png" alt="Categorías">
                    </a>
                    <a href="LINK">
                        <img src="images/carrito-de-compras.png" alt="Carrito de Compras">
                    </a>
                    <a href="LINK">
                        <img src="images/tienda.png" alt="Tienda">
                    </a>
                    <a href="LINK">
                        <img src="images/iniciar-sesion.png" alt="Iniciar Sesión">
                    </a>
                </div>
            </section>
        </header>

        <main>
            <section class="principal">
                <section class="encabezado">
                    <div class="boton-enviar">
                        <button onclick="obtenerTiendasSeleccionadas()">Guardar Selección
                            <img src="images/save-info.png" alt="Guardar">
                        </button>
                    </div>
                    <div class="titulo">
                        <h1>Tiendas</h1>
                    </div>
                    <div class="busqueda">
                        <input type="text" id="searchTiendaInput" placeholder="Buscar Tienda...">
                        <button onclick="realizarBusquedaMain()">
                        </button>
                    </div>
                </section>
                
                <section class="segunda_seccion">
                    <section class="tiendas">
                        <!-- Aquí se incluirá el archivo listar_proveedores.php -->
                        <?php include 'listar_proveedores.php'; ?>
                    </section>
                </section>
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




   