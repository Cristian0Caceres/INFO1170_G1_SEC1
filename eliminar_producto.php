<?php
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "BD"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_GET['id']) && isset($_GET['id_precio'])) {
    $id_producto = $_GET['id'];
    $id_precio = $_GET['id_precio'];

    // Eliminar primero el precio asociado
    $sql_delete_precio = "DELETE FROM precios WHERE ID_Precios = ?";
    $stmt_precio = $conn->prepare($sql_delete_precio);
    $stmt_precio->bind_param('i', $id_precio);
    $stmt_precio->execute();

    // Luego, eliminar el producto
    $sql_delete_producto = "DELETE FROM producto WHERE ID_Producto = ?";
    $stmt_producto = $conn->prepare($sql_delete_producto);
    $stmt_producto->bind_param('i', $id_producto);
    
    if ($stmt_producto->execute()) {
        header('Location: lista_productos.php'); 
        exit();
    } else {
        echo "Error al eliminar el producto: " . $conn->error;
    }

    // Cerrar las sentencias
    $stmt_precio->close();
    $stmt_producto->close();
} else {
    echo "ID de producto o precio no proporcionados.";
}

$conn->close();
?>
