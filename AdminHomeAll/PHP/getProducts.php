<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "BD";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para obtener los productos con sus precios
$sql = "SELECT producto.ID_Producto AS id, producto.Nombre_producto AS name, precios.coste AS price, categoria.Nombre_Categoria AS category
        FROM producto
        JOIN precios ON producto.ID_Producto = precios.ID_Productos
        JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria
        ORDER BY producto.Nombre_producto, precios.coste DESC";  // Ordenar por nombre de producto y precio descendente

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
