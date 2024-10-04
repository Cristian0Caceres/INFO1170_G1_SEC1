<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bd_prueba";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL que selecciona los nombres y descripciones de las categorías
$sql = "
    SELECT Nombre_Categoria, Descripcion_Categoria
    FROM categoria
";

// Ejecutar la consulta
$result = $conn->query($sql);

// Comprobar si hay resultados
if ($result->num_rows > 0) {
    // Recorrer los resultados y mostrarlos
    while ($row = $result->fetch_assoc()) {
        echo "
        <section class='categorias'>
            <a class='img-categoria' href='#'>
                <div>
                    <img src='' alt='Imagen de " . $row["Descripcion_Categoria"] . "'>
                </div>
            </a>
            <a class='nombre-categoria' href='#'>
                <div>
                    <h2>" . $row["Nombre_Categoria"] . "</h2>
                </div>
            </a>
        </section>
        ";
    }
} else {
    echo "<p>No se encontraron categorías.</p>";
}

// Cerrar la conexión
$conn->close();
?>
