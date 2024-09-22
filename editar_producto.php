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
    $id = $_POST['id']; // ID del producto
    $id_precio = $_POST['id_precio']; // ID del precio
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $precio = $_POST['precio'];

    // Actualización de la tabla producto y precios, usando también el ID_Precios
    $sql = "UPDATE producto 
            JOIN precios ON producto.ID_Producto = precios.ID_Productos
            SET producto.Nombre_producto = ?, producto.ID_Categoria = ?, precios.coste = ?
            WHERE producto.ID_Producto = ? AND precios.ID_Precios = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('siiii', $nombre, $categoria, $precio, $id, $id_precio); // s: string, i: integer
    if ($stmt->execute()) {
        header('Location: lista_productos.php'); 
        exit();
    } else {
        echo "Error al actualizar: " . $conn->error;
    }
} else {
    // Obtener datos del producto para mostrar en el formulario
    $id = $_GET['id'];
    $id_precio = $_GET['id_precio'];

    $sql = "SELECT producto.Nombre_producto, producto.ID_Categoria, precios.coste, precios.ID_Precios
            FROM producto
            JOIN precios ON producto.ID_Producto = precios.ID_Productos
            WHERE producto.ID_Producto = ? AND precios.ID_Precios = ? LIMIT 1"; // Selecciona solo un precio relacionado con el producto

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $id, $id_precio); // i: integer
    $stmt->execute();
    $result = $stmt->get_result();
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
        <input type="hidden" name="id" value="<?php echo $id; ?>">
        <input type="hidden" name="id_precio" value="<?php echo $producto['ID_Precios']; ?>"> <!-- ID del precio -->
        
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
