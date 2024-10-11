<?php
// Datos de conexión a la base de datos
$host = 'localhost';
$db = 'bd';
$user = 'root';
$pass = '';

// Conectar a la base de datos
$conn = new mysqli($host, $user, $pass, $db);

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el ID del producto desde la URL (ejemplo: mostrar_producto_nombre.php?id=1)
$id_producto = isset($_GET['id']) ? (int)$_GET['id'] : 1;

// Consulta SQL para obtener el nombre del producto con el ID recibido
$sql = "SELECT Nombre_producto, Descripcion_Producto FROM producto WHERE ID_Producto = $id_producto";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    // Obtener el nombre del producto
    while($row = $result->fetch_assoc()) {
        echo "<h1>" . $row["Nombre_producto"] . "</h1>";
        echo "<p>" . $row["Descripcion_Producto"] . "<p>";
    }
} else {
    echo "<h1>Producto no encontrado</h1>";
}

// Cerrar la conexión
$conn->close();
?>
