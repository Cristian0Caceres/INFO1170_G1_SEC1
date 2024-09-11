<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";  // Cambia esto si tienes otro usuario
$password = "";  // Cambia esto si tienes otra contraseña
$dbname = "base_de_datos_cacique_del_ahorro";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para obtener los productos con sus precios
$sql = "SELECT producto.Nombre_producto AS name, precios.coste AS price, categoria.Nombre_Categoria AS category
        FROM producto
        JOIN precios ON producto.ID_Producto = precios.ID_Productos
        JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria";

$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;  // Guardamos cada fila en el array de productos
    }
}

// Devolver los productos en formato JSON
header('Content-Type: application/json');
echo json_encode($products);

// Cerrar la conexión
$conn->close();
?>
