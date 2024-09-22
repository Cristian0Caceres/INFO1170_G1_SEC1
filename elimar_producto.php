<?php
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "bd"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "DELETE FROM producto WHERE ID_Producto=$id";

    if ($conn->query($sql) === TRUE) {
        header('Location: lista_productos.php'); 
        exit();
    } else {
        echo "Error al eliminar: " . $conn->error;
    }
} else {
    echo "ID de producto no proporcionado.";
}

$conn->close();
?>
