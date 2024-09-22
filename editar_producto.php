<?php
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "bd"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Actualizar producto
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $precio = $_POST['precio'];

    $sql = "UPDATE producto 
            JOIN precios ON producto.ID_Producto = precios.ID_Productos
            SET producto.Nombre_producto='$nombre', producto.ID_Categoria='$categoria', precios.coste='$precio' 
            WHERE producto.ID_Producto=$id";

    if ($conn->query($sql) === TRUE) {
        header('Location: lista_productos.php'); 
        exit();
    } else {
        echo "Error al actualizar: " . $conn->error;
    }
} else {
    // Obtener datos del producto
    $id = $_GET['id'];
    $sql = "SELECT producto.Nombre_producto, categoria.ID_Categoria, precios.coste
            FROM producto
            JOIN precios ON producto.ID_Producto = precios.ID_Productos
            JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria
            WHERE producto.ID_Producto=$id";
    $result = $conn->query($sql);
    $producto = $result->fetch_assoc();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Producto</title>
</head>
<body>
    <h2>Editar Producto</h2>
    <form method="post">
        <input type="hidden" name="id" value="<?php echo $producto['ID_Producto']; ?>">
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $producto['Nombre_producto']; ?>" required>
        <label for="categoria">Categoría:</label>
        <input type="number" name="categoria" value="<?php echo $producto['ID_Categoria']; ?>" required>
        <label for="precio">Precio:</label>
        <input type="number" name="precio" value="<?php echo $producto['coste']; ?>" required>
        <button type="submit">Actualizar</button>
    </form>
</body>
</html>
