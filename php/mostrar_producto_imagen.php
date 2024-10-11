<?php
// Datos de conexión a la base de datos
$host = 'localhost'; // Servidor de la base de datos
$db = 'bd'; // Nombre de la base de datos
$user = 'root'; // Usuario de la base de datos (cambia si es necesario)
$pass = ''; // Contraseña (cambia si es necesario)

// Conectar a la base de datos
$conn = new mysqli($host, $user, $pass, $db);

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener la imagen del producto con ID = 1
$sql = "SELECT imagen_producto FROM producto WHERE ID_Producto = 1";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    // Obtener la imagen del producto
    while($row = $result->fetch_assoc()) {
        echo "<img src='" . $row["imagen_producto"] . "' alt='Imagen del producto' style='width:50%; height:auto;'>";

    }
} else {
    echo "<img src='images/default.png' alt='Producto no encontrado' style='width:200px; height:auto;'>";
}

// Cerrar la conexión
$conn->close();
?>
