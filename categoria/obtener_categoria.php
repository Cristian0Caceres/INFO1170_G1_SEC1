<?php
// categoria.php

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

// Definir el ID de la categoría (Carnes en este caso)
$category_id = 4; // Cambia esto según la categoría que desees

// Consulta para obtener el nombre de la categoría
$sql_categoria = "SELECT Nombre_Categoria FROM categoria WHERE ID_Categoria = $category_id";
$result_categoria = $conn->query($sql_categoria);

// Comprobar si se encontró la categoría
if ($result_categoria->num_rows > 0) {
    $categoria = $result_categoria->fetch_assoc();
    $nombre_categoria = $categoria['Nombre_Categoria'];
} else {
    $nombre_categoria = "Categoría no encontrada";
}

// Mostrar el nombre de la categoría
echo "<h>" . $nombre_categoria . "</h>";

// Cerrar la conexión
$conn->close();
?>
